import type { Network, RewardType } from '../../types/api';

interface FilterChipsProps {
  activeNetwork: Network | null;
  activeRewardType: RewardType | null;
  onNetworkChange: (network: Network | null) => void;
  onRewardTypeChange: (rewardType: RewardType | null) => void;
}

const NETWORKS: Network[] = ['VISA', 'MASTERCARD', 'RUPAY', 'AMEX'];
const REWARD_TYPES: RewardType[] = ['CASHBACK', 'REWARD_POINTS', 'AIR_MILES', 'HOTEL_POINTS'];

function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all duration-150',
        active
          ? 'border-primary bg-primary-tint text-primary-darker'
          : 'border-border-subtle bg-white text-text-secondary hover:border-border-hover hover:text-ink',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

/** Network + RewardType chip groups — exact §5.3 enum values, single-select each (§11 item 6). */
export function FilterChips({
  activeNetwork,
  activeRewardType,
  onNetworkChange,
  onRewardTypeChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-bold uppercase tracking-[0.1em] text-text-muted">Network</span>
        {NETWORKS.map((network) => (
          <Chip
            key={network}
            label={titleCase(network)}
            active={activeNetwork === network}
            onClick={() => onNetworkChange(activeNetwork === network ? null : network)}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-bold uppercase tracking-[0.1em] text-text-muted">Rewards</span>
        {REWARD_TYPES.map((rewardType) => (
          <Chip
            key={rewardType}
            label={titleCase(rewardType)}
            active={activeRewardType === rewardType}
            onClick={() => onRewardTypeChange(activeRewardType === rewardType ? null : rewardType)}
          />
        ))}
      </div>
    </div>
  );
}
