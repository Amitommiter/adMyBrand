// lib/config.ts
// Central configuration for all dynamic data in the application

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: string
  plan: string
  status: 'active' | 'inactive'
}

export interface KpiData {
  title: string
  value: string
  trend: string
  icon: string
  color: string
}

export interface ChartData {
  name: string
  value?: number
  sales?: number
}

export interface CampaignData {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  startDate: string
  endDate: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roi: number
  channel: string
}

export interface RevenueData {
  date: string
  revenue: number
  target: number
  growth: number
}

export interface ChannelData {
  channel: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  conversionRate: number
  cost: number
  roi: number
}

export interface ConversionFunnelData {
  stage: string
  visitors: number
  conversions: number
  conversionRate: number
  dropOffRate: number
}

export interface AnalyticsData {
  campaigns: CampaignData[]
  revenueData: RevenueData[]
  channelData: ChannelData[]
  conversionFunnel: ConversionFunnelData[]
}

export interface NotificationPreference {
  id: string
  title: string
  description: string
  enabled: boolean
  category: 'email' | 'system' | 'marketing'
}

export interface BillingInfo {
  plan: string
  amount: number
  currency: string
  nextBilling: string
  status: 'active' | 'cancelled' | 'pending'
  paymentMethod: {
    type: string
    brand: string
    last4: string
    expiry: string
  }
  billingHistory: Array<{
    id: string
    date: string
    amount: number
    status: string
  }>
}

export interface AppConfig {
  company: {
    name: string
    logo: string
    domain: string
  }
  user: User
  kpis: KpiData[]
  charts: {
    lineChart: ChartData[]
    barChart: ChartData[]
    pieChart: ChartData[]
  }
  notifications: NotificationPreference[]
  billing: BillingInfo
  settings: {
    languages: Array<{ code: string; name: string }>
    timezones: Array<{ code: string; name: string }>
    themes: Array<{ id: string; name: string }>
  }
  analytics: AnalyticsData
}

// Default configuration - this would typically come from your backend
export const defaultConfig: AppConfig = {
  company: {
    name: "ADmyBRAND",
    logo: "/logo.png",
    domain: "admybrand.com"
  },
  user: {
    id: 1,
    name: "John Doe",
    email: "john@admybrand.com",
    avatar: "https://i.pravatar.cc/150?img=32",
    role: "Administrator",
    plan: "Premium Plan",
    status: "active"
  },
  kpis: [
    {
      title: "Revenue",
      value: "$24,500",
      trend: "+12.3%",
      icon: "DollarSign",
      color: "green"
    },
    {
      title: "Users",
      value: "3,200",
      trend: "+3.1%",
      icon: "Users",
      color: "blue"
    },
    {
      title: "Conversions",
      value: "875",
      trend: "+7.5%",
      icon: "CheckCircle",
      color: "purple"
    },
    {
      title: "Growth",
      value: "18%",
      trend: "+5.4%",
      icon: "TrendingUp",
      color: "orange"
    }
  ],
  charts: {
    lineChart: [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 500 },
      { name: 'Apr', value: 700 },
      { name: 'May', value: 600 },
      { name: 'Jun', value: 800 },
    ],
    barChart: [
      { name: "Product A", sales: 1200, value: 1200 },
      { name: "Product B", sales: 980, value: 980 },
      { name: "Product C", sales: 650, value: 650 },
      { name: "Product D", sales: 1430, value: 1430 },
      { name: "Product E", sales: 890, value: 890 },
    ],
    pieChart: [
      { name: "Free Users", value: 400 },
      { name: "Premium Users", value: 300 },
      { name: "Enterprise", value: 100 },
    ]
  },
  notifications: [
    {
      id: "email-notifications",
      title: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
      category: "email"
    },
    {
      id: "push-notifications",
      title: "Push Notifications",
      description: "Receive push notifications on your device",
      enabled: true,
      category: "system"
    },
    {
      id: "browser-notifications",
      title: "Browser Notifications",
      description: "Show notifications in your browser",
      enabled: true,
      category: "system"
    },
    {
      id: "marketing-emails",
      title: "Marketing Emails",
      description: "Receive promotional and marketing content",
      enabled: false,
      category: "marketing"
    },
    {
      id: "weekly-reports",
      title: "Weekly Reports",
      description: "Get weekly summary reports",
      enabled: true,
      category: "email"
    },
    {
      id: "monthly-reports",
      title: "Monthly Reports",
      description: "Get monthly detailed reports",
      enabled: true,
      category: "email"
    },
    {
      id: "system-alerts",
      title: "System Alerts",
      description: "Important system updates and alerts",
      enabled: true,
      category: "system"
    },
    {
      id: "security-alerts",
      title: "Security Alerts",
      description: "Security-related notifications",
      enabled: true,
      category: "system"
    }
  ],
  billing: {
    plan: "Premium Plan",
    amount: 29.99,
    currency: "USD",
    nextBilling: "2024-02-15",
    status: "active",
    paymentMethod: {
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25"
    },
    billingHistory: [
      { id: "inv-001", date: "2024-01-15", amount: 29.99, status: "paid" },
      { id: "inv-002", date: "2023-12-15", amount: 29.99, status: "paid" },
      { id: "inv-003", date: "2023-11-15", amount: 29.99, status: "paid" }
    ]
  },
  settings: {
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Spanish" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" }
    ],
    timezones: [
      { code: "utc", name: "UTC" },
      { code: "est", name: "Eastern Time" },
      { code: "pst", name: "Pacific Time" },
      { code: "gmt", name: "GMT" }
    ],
    themes: [
      { id: "light", name: "Light" },
      { id: "dark", name: "Dark" },
      { id: "auto", name: "Auto" }
    ]
  },
  analytics: {
    campaigns: [
      {
        id: "camp-001",
        name: "Summer Sale Campaign",
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-02-28",
        budget: 50000,
        spent: 35000,
        impressions: 1250000,
        clicks: 25000,
        conversions: 1250,
        ctr: 2.0,
        cpc: 1.4,
        roi: 285,
        channel: "Google Ads"
      },
      {
        id: "camp-002",
        name: "Brand Awareness Drive",
        status: "completed",
        startDate: "2023-12-01",
        endDate: "2023-12-31",
        budget: 30000,
        spent: 28500,
        impressions: 980000,
        clicks: 19600,
        conversions: 980,
        ctr: 2.0,
        cpc: 1.45,
        roi: 245,
        channel: "Facebook Ads"
      },
      {
        id: "camp-003",
        name: "Product Launch Campaign",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        budget: 75000,
        spent: 42000,
        impressions: 1800000,
        clicks: 36000,
        conversions: 1800,
        ctr: 2.0,
        cpc: 1.17,
        roi: 320,
        channel: "LinkedIn Ads"
      },
      {
        id: "camp-004",
        name: "Retargeting Campaign",
        status: "paused",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        budget: 15000,
        spent: 12000,
        impressions: 450000,
        clicks: 13500,
        conversions: 675,
        ctr: 3.0,
        cpc: 0.89,
        roi: 180,
        channel: "Google Ads"
      },
      {
        id: "camp-005",
        name: "Holiday Special",
        status: "completed",
        startDate: "2023-11-15",
        endDate: "2023-12-25",
        budget: 60000,
        spent: 58000,
        impressions: 2100000,
        clicks: 42000,
        conversions: 2100,
        ctr: 2.0,
        cpc: 1.38,
        roi: 295,
        channel: "Instagram Ads"
      }
    ],
    revenueData: [
      { date: "2024-01-01", revenue: 125000, target: 120000, growth: 4.2 },
      { date: "2024-01-02", revenue: 132000, target: 120000, growth: 10.0 },
      { date: "2024-01-03", revenue: 118000, target: 120000, growth: -1.7 },
      { date: "2024-01-04", revenue: 145000, target: 120000, growth: 20.8 },
      { date: "2024-01-05", revenue: 138000, target: 120000, growth: 15.0 },
      { date: "2024-01-06", revenue: 155000, target: 120000, growth: 29.2 },
      { date: "2024-01-07", revenue: 142000, target: 120000, growth: 18.3 },
      { date: "2024-01-08", revenue: 148000, target: 120000, growth: 23.3 },
      { date: "2024-01-09", revenue: 135000, target: 120000, growth: 12.5 },
      { date: "2024-01-10", revenue: 162000, target: 120000, growth: 35.0 }
    ],
    channelData: [
      {
        channel: "Google Ads",
        impressions: 1700000,
        clicks: 38500,
        conversions: 1925,
        revenue: 385000,
        ctr: 2.26,
        conversionRate: 5.0,
        cost: 47000,
        roi: 719
      },
      {
        channel: "Facebook Ads",
        impressions: 980000,
        clicks: 19600,
        conversions: 980,
        revenue: 196000,
        ctr: 2.0,
        conversionRate: 5.0,
        cost: 28500,
        roi: 588
      },
      {
        channel: "LinkedIn Ads",
        impressions: 1800000,
        clicks: 36000,
        conversions: 1800,
        revenue: 360000,
        ctr: 2.0,
        conversionRate: 5.0,
        cost: 42000,
        roi: 757
      },
      {
        channel: "Instagram Ads",
        impressions: 2100000,
        clicks: 42000,
        conversions: 2100,
        revenue: 420000,
        ctr: 2.0,
        conversionRate: 5.0,
        cost: 58000,
        roi: 624
      },
      {
        channel: "Email Marketing",
        impressions: 500000,
        clicks: 25000,
        conversions: 1250,
        revenue: 125000,
        ctr: 5.0,
        conversionRate: 5.0,
        cost: 8000,
        roi: 1463
      }
    ],
    conversionFunnel: [
      {
        stage: "Website Visitors",
        visitors: 125000,
        conversions: 125000,
        conversionRate: 100.0,
        dropOffRate: 0.0
      },
      {
        stage: "Product Page Views",
        visitors: 87500,
        conversions: 87500,
        conversionRate: 70.0,
        dropOffRate: 30.0
      },
      {
        stage: "Add to Cart",
        visitors: 25000,
        conversions: 25000,
        conversionRate: 28.6,
        dropOffRate: 71.4
      },
      {
        stage: "Checkout Started",
        visitors: 15000,
        conversions: 15000,
        conversionRate: 60.0,
        dropOffRate: 40.0
      },
      {
        stage: "Payment Completed",
        visitors: 8055,
        conversions: 8055,
        conversionRate: 53.7,
        dropOffRate: 46.3
      }
    ]
  }
}

// Configuration service for managing dynamic data
export class ConfigService {
  private static instance: ConfigService
  private config: AppConfig = defaultConfig

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService()
    }
    return ConfigService.instance
  }

  async loadConfig(): Promise<AppConfig> {
    try {
      // In a real app, this would fetch from your backend
      const response = await fetch('/api/config')
      if (response.ok) {
        this.config = await response.json()
      }
    } catch (error) {
      console.warn('Failed to load config from backend, using defaults:', error)
    }
    return this.config
  }

  getConfig(): AppConfig {
    return this.config
  }

  updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates }
  }

  getUser(): User {
    return this.config.user
  }

  getKpis(): KpiData[] {
    return this.config.kpis
  }

  getChartData(type: 'lineChart' | 'barChart' | 'pieChart'): ChartData[] {
    return this.config.charts[type]
  }

  getNotifications(): NotificationPreference[] {
    return this.config.notifications
  }

  getBilling(): BillingInfo {
    return this.config.billing
  }

  getSettings() {
    return this.config.settings
  }

  getAnalytics(): AnalyticsData {
    return this.config.analytics
  }

  getCampaigns(): CampaignData[] {
    return this.config.analytics.campaigns
  }

  getRevenueData(): RevenueData[] {
    return this.config.analytics.revenueData
  }

  getChannelData(): ChannelData[] {
    return this.config.analytics.channelData
  }

  getConversionFunnel(): ConversionFunnelData[] {
    return this.config.analytics.conversionFunnel
  }
}

export const configService = ConfigService.getInstance()