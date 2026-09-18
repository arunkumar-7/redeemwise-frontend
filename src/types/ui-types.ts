import type { ReactNode } from 'react';

/* ── Landing content model ─────────────────────────────────────────────── */

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StepItem {
  stepNumber: string;
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

export interface DashboardRow {
  category: string;
  rate: string;
  totalRupees: string;
  isBestValue: boolean;
}

export interface TestimonialItem {
  rating: number;
  quote: string;
  authorName: string;
  authorLocation: string;
  avatarUrl: string;
  avatarBgColor: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TrustIndicatorItem {
  icon: ReactNode;
  label: string;
}

export interface FloatingBadge {
  text: string;
  type: 'value' | 'multiplier';
}
