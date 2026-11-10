export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES' | 'TZS' | 'RWF' | 'NGN' | 'GHS' | 'ZAR';

export interface CountryConfig {
  code: string;
  name: string;
  currency: CurrencyCode;
  symbol: string;
  presets: number[];
  network: string;
  rateToUSD: number; // 1 USD in local currency
}

export interface CampaignMilestone {
  amount: number;
  title: string;
  description: string;
  phase: string;
  impactTag: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  unitTenDollarImpact: string;
}

export interface InfrastructureTier {
  id: string;
  name: string;
  amountUSD: number;
  badge?: string;
  capacity: string;
  summary: string;
  features: string[];
}

export interface InfrastructureCategory {
  id: string;
  type: 'school' | 'hospital';
  title: string;
  arabicTitle: string;
  minUSD: number;
  maxUSD: number;
  tagline: string;
  description: string;
  iconName: string;
  stats: { label: string; value: string }[];
  tiers: InfrastructureTier[];
}

export interface FixedProject {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  options: {
    label?: string;
    usd: number;
    eur: number;
    gbp: number;
  }[];
}

export interface AidRequest {
  id: string;
  name: string;
  type: 'Individual' | 'Organization';
  mobile: string;
  address: string;
  district: string;
  category: 'Product' | 'Cash Aid' | 'Medical' | 'Shelter';
  beneficiariesCount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Reviewing';
  createdAt: string;
}

export interface RecentDonation {
  id: string;
  donorName: string;
  shares: number;
  amountUSD: number;
  cause: string;
  country: string;
  duaOrMessage?: string;
  timestamp: string;
}

export interface ConstitutionArticle {
  number: number;
  title: string;
  paragraphs: (string | string[])[];
}

export interface SiteSettings {
  raised: number;
  goal: number;
  beneficiariesCount: string;
  wellsCount: string;
  foodPacksCount: string;
  padsSurgeriesCount: string;
  volunteersPartnersCount: string;
  onlineDonorsCount: string;
  primaryPhone: string;
  ceoPhone: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
  bankLocation: string;
}
