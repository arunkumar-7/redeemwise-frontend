import {
  CreditCard,
  IndianRupee,
  Layers,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type {
  BenefitItem,
  DashboardRow,
  FaqItem,
  NavLinkItem,
  StatItem,
  StepItem,
  TestimonialItem,
} from '../types/ui-types';

/* ── Navigation ────────────────────────────────────────────────────────── */

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
];

export const CTA_LABEL = 'Find Best Redemption';

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const HERO = {
  badge: 'REWARDS, MADE WORTHWHILE',
  headline: 'Stop Wasting Your Reward Points',
  subhead:
    'Your credit card points are worth real money. RedeemWise compares every redemption option across banks and shows you the one that pays the most — in under 60 seconds.',
  secondaryCta: 'See How It Works',
};

/* ── Statistics Bar (§7.7) ─────────────────────────────────────────────── */

export const STATS: StatItem[] = [
  { value: '50+', label: 'Supported Credit Cards' },
  { value: '100+', label: 'Redemption Options' },
  { value: '10+', label: 'Major Banks' },
  { value: 'Instant', label: 'Recommendations' },
];

/* ── How It Works (§7.8) ───────────────────────────────────────────────── */

export const HOW_IT_WORKS = {
  badge: 'SIMPLE BY DESIGN',
  title: 'Your smartest redemption is three steps away',
  subtitle: 'No sign-up, no bank credentials, no spreadsheets. Just a clear answer in seconds.',
};

export const STEPS: StepItem[] = [
  {
    stepNumber: 'STEP 01',
    icon: <CreditCard size={24} strokeWidth={2} />,
    iconBgColor: 'bg-primary-tint text-primary',
    title: 'Select Your Credit Card',
    description:
      'Search our catalog of 50+ cards from major Indian banks — HDFC, ICICI, Axis, SBI, Amex and more — and pick the one in your wallet.',
  },
  {
    stepNumber: 'STEP 02',
    icon: <SlidersHorizontal size={24} strokeWidth={2} />,
    iconBgColor: 'bg-sky-tint text-sky-700',
    title: 'Enter Your Points',
    description:
      'Type in your current reward point balance. No account, no statements, no sensitive banking details — just a number.',
  },
  {
    stepNumber: 'STEP 03',
    icon: <TrendingUp size={24} strokeWidth={2} />,
    iconBgColor: 'bg-amber-tint text-amber-700',
    title: 'Get the Best Redemption',
    description:
      'We calculate the rupee value of every redemption option and rank them, so your points convert to maximum value.',
  },
];

/* ── Benefits (§7.9) ───────────────────────────────────────────────────── */

export const BENEFITS = {
  badge: 'WHY REDEEMWISE',
  title: 'A Better Way to Think About Card Rewards',
  subtitle:
    'Most cardholders redeem points for a fraction of their true value. We make the real numbers impossible to ignore.',
};

export const BENEFIT_ITEMS: BenefitItem[] = [
  {
    icon: <IndianRupee size={24} strokeWidth={2} />,
    iconBgColor: 'bg-primary-tint text-primary',
    title: 'Maximize Reward Value',
    description:
      'Know the real rupee value behind your points. We show exactly what each point is worth across every redemption category.',
  },
  {
    icon: <Layers size={24} strokeWidth={2} />,
    iconBgColor: 'bg-sky-tint text-sky-700',
    title: 'Side-by-Side Comparison',
    description:
      'Flights, hotels, vouchers, statement credit — see every option ranked on one screen instead of digging through bank portals.',
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={2} />,
    iconBgColor: 'bg-amber-tint text-amber-700',
    title: 'Private & Instant',
    description:
      'No login, no card numbers, no data capture. Your answers appear instantly and your details never leave your device.',
  },
];

/* ── Action Preview (§7.10) ────────────────────────────────────────────── */

export const ACTION_PREVIEW = {
  badge: 'SEE IT IN ACTION',
  title: 'Real recommendations, not vague guesses',
  subtitle:
    'Every option is scored on Value Per Point — the actual rupees each point converts to — and ranked so the best choice is obvious.',
  checkmarks: [
    'Rupee-accurate value for every redemption option',
    'Best option highlighted with Value Per Point up front',
    'Ineligible options explained — never silently hidden',
    'Updated rates across banks, cards and categories',
  ],
};

export const DASHBOARD_MOCKUP = {
  cardName: 'HDFC Regalia',
  availablePoints: '50,000',
  subtitle: 'Your best ways to redeem today',
  rows: [
    { category: 'Flights', rate: '₹0.25 per point', totalRupees: '₹12,500', isBestValue: true },
    { category: 'Hotels', rate: '', totalRupees: '₹10,200', isBestValue: false },
    { category: 'Shopping', rate: '', totalRupees: '₹8,000', isBestValue: false },
  ] satisfies DashboardRow[],
};

/* ── Testimonials (§7.11) ──────────────────────────────────────────────── */

export const TESTIMONIALS = {
  badge: 'TRUSTED BY REWARD OPTIMIZERS',
  title: 'People Who Stop Leaving Money on the Table',
  subtitle: 'From frequent flyers to everyday spenders — here is what they discovered.',
};

export const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    rating: 5,
    quote:
      'I had 80,000 points sitting idle for two years. RedeemWise showed me a flight redemption worth three times what the catalog was offering. The math was all there — I just had never seen it.',
    authorName: 'Arjun Mehta',
    authorLocation: 'Software Engineer · Bengaluru',
    avatarUrl: '',
    avatarBgColor: 'bg-primary-tint text-primary',
  },
  {
    rating: 5,
    quote:
      'Every portal buries the good redemptions behind jargon. This is the first tool that just tells me the rupee value per point and ranks my options. It took less than a minute.',
    authorName: 'Naina Shah',
    authorLocation: 'Marketing Manager · Mumbai',
    avatarUrl: '',
    avatarBgColor: 'bg-sky-tint text-sky-700',
  },
  {
    rating: 5,
    quote:
      'No signup, no card details, no nonsense. I checked four cards in five minutes and moved everything to statement credit at nearly double the value I was getting before.',
    authorName: 'Rohan Kapoor',
    authorLocation: 'Business Owner · Delhi NCR',
    avatarUrl: '',
    avatarBgColor: 'bg-amber-tint text-amber-700',
  },
];

/* ── FAQ (§7.12) ───────────────────────────────────────────────────────── */

export const FAQ = {
  badge: 'STILL CURIOUS',
  title: 'Questions, Answered',
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do I need to create an account or share my card details?',
    answer:
      'No. RedeemWise requires no signup, no login and never asks for your card number, CVV or bank credentials. You simply pick your card from the catalog and enter your point balance.',
  },
  {
    question: 'How is the value of my points calculated?',
    answer:
      'We use Value Per Point (VPP): the rupee value a redemption returns divided by the points it costs. For example, a ₹250 voucher for 1,000 points is worth ₹0.25 per point — far better than a ₹500 catalog item for 5,000 points (₹0.10 per point).',
  },
  {
    question: 'Which banks and cards are supported?',
    answer:
      'The catalog covers 50+ cards from 10+ major Indian issuers including HDFC Bank, ICICI Bank, Axis Bank, SBI Card and American Express, spanning Visa, Mastercard, RuPay and Amex networks. Coverage keeps growing.',
  },
  {
    question: 'What happens if my points are below a redemption minimum?',
    answer:
      'Options with a minimum redemption threshold above your balance are shown as ineligible with a clear reason — including how many more points you need — so you can plan your next redemption.',
  },
  {
    question: 'Is RedeemWise free to use?',
    answer:
      'Yes. The recommendation tool is completely free with no usage limits. There is nothing to install and no commitment — you get your ranked results in under a minute.',
  },
];

/* ── Final CTA (§7.13) ─────────────────────────────────────────────────── */

export const FINAL_CTA = {
  badge: 'MAKE EVERY POINT COUNT',
  title: 'Ready To Unlock More Value From Your Reward Points?',
  subtitle:
    'Join thousands of cardholders who stopped settling for catalog junk and started redeeming like insiders.',
  buttonText: 'Find Best Redemption',
};

/* ── Footer (§7.14) ────────────────────────────────────────────────────── */

export const FOOTER_LINKS: NavLinkItem[] = [
  { label: 'Terms & Support', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

export const FOOTER_ATTRIBUTION = 'Designed with Canva';

/* ── Misc icons ────────────────────────────────────────────────────────── */

export { Zap as TrustZapIcon };
