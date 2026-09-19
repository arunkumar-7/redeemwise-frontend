import type { ApiError } from '../types/api';

/* ── Configuration ─────────────────────────────────────────────────────── */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const API_TIMEOUT_MS = 10_000; // §11 item 2: 10s timeout

/* ── Normalized error ──────────────────────────────────────────────────── */

export type ApiErrorKind =
  | 'validation' // 400 — has field details
  | 'unauthorized' // 401
  | 'not_found' // 404
  | 'conflict' // 409
  | 'server' // 500
  | 'service_unavailable' // 502 — downstream Feign failure
  | 'network' // fetch threw / CORS / gateway down
  | 'timeout'
  | 'unknown';

/** Frontend-normalized error, independent of the raw failure shape (§9.3). */
export class ApiRequestError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  /** field → message map; only present on backend 400 validation errors. */
  readonly fieldErrors?: Record<string, string>;
  /** Backend's `error` discriminator ("Validation Error", "Not Found", ...). */
  readonly backendError?: string;

  constructor(params: {
    kind: ApiErrorKind;
    message: string;
    status?: number;
    fieldErrors?: Record<string, string>;
    backendError?: string;
  }) {
    super(params.message);
    this.name = 'ApiRequestError';
    this.kind = params.kind;
    this.status = params.status;
    this.fieldErrors = params.fieldErrors;
    this.backendError = params.backendError;
  }
}

function kindFromStatus(status: number): ApiErrorKind {
  switch (status) {
    case 400:
      return 'validation';
    case 401:
      return 'unauthorized';
    case 404:
      return 'not_found';
    case 409:
      return 'conflict';
    case 502:
      return 'service_unavailable';
    default:
      return status >= 500 ? 'server' : 'unknown';
  }
}

/* ── Core request helper ───────────────────────────────────────────────── */

async function parseErrorBody(response: Response): Promise<Partial<ApiError> | null> {
  try {
    const text = await response.text();
    if (text === '') return null;
    const parsed: unknown = JSON.parse(text);
    if (parsed !== null && typeof parsed === 'object' && 'status' in parsed) {
      return parsed as Partial<ApiError>;
    }
    return null;
  } catch {
    return null;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  signal?: AbortSignal;
}

/**
 * Single fetch wrapper for every gateway call. Unwraps nothing — returns the
 * parsed envelope and lets callers extract `data`, while normalizing ALL
 * failure shapes (backend envelope, non-JSON, timeout, network) into
 * ApiRequestError per §9.
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  // Chain the caller's signal (if any) into our timeout controller.
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: { Accept: 'application/json', ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await parseErrorBody(response);
      throw new ApiRequestError({
        kind: kindFromStatus(response.status),
        status: response.status,
        message:
          errorBody?.message ??
          `Request failed with status ${response.status}`,
        fieldErrors: errorBody?.details,
        backendError: errorBody?.error,
      });
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiRequestError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      if (signal?.aborted) throw error; // caller cancelled — propagate as-is
      throw new ApiRequestError({
        kind: 'timeout',
        message: 'The request timed out. Please try again.',
      });
    }
    throw new ApiRequestError({
      kind: 'network',
      message: 'Network error. Please check your connection and that the API gateway is running.',
    });
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', onAbort);
  }
}

/* ── Envelope unwrappers (§9.4) ────────────────────────────────────────── */

/** `{ message, data }` envelope used by single-resource responses. */
export async function requestSingle<T>(path: string, options?: RequestOptions): Promise<T> {
  const envelope = await request<{ message: string; data: T }>(path, options);
  return envelope.data;
}

/** `{ message, data, totalElements }` envelope used by list responses. */
export async function requestList<T>(path: string, options?: RequestOptions): Promise<T[]> {
  const envelope = await request<{ message: string; data: T[]; totalElements: number }>(path, options);
  return envelope.data;
}

export const apiConfig = { baseUrl: API_BASE_URL, timeoutMs: API_TIMEOUT_MS };
