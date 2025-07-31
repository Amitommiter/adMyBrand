'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Eye,
  MousePointer,
  DollarSign,
  TrendingUp,
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import CampaignTable from "@/components/reports/CampaignTable"
import RevenueChart from "@/components/reports/RevenueChart"
import ChannelChart from "@/components/reports/ChannelChart"
import ConversionFunnelTable from "@/components/reports/ConversionFunnelTable"
import { AnalyticsData } from '@/lib/config'

type ReportSummary = {
  totalCampaigns: number
  impressions: string
  clicks: string
  revenue: string
}

type AnalyticsResponse = {
  success: boolean
  data: AnalyticsData | null
  message?: string
}

// Dynamic Section Configuration System
interface SectionConfig {
  id: string
  title: string
  description?: string
  searchKeywords: string[]
  component: 'kpis' | 'revenue-chart' | 'channel-chart' | 'campaign-table' | 'funnel-table'
  dependencies: string[] // Data dependencies
  gridClass?: string
  priority: number // For ordering
  dataFilter?: (data: any, searchQuery: string) => any // Optional data filtering function
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: 'kpis',
    title: 'Key Metrics',
    searchKeywords: ['kpi', 'metric', 'key', 'performance', 'indicator', 'stats', 'summary', 'campaign', 'impression', 'click', 'revenue'],
    component: 'kpis',
    dependencies: ['data'],
    priority: 1
  },
  {
    id: 'revenue-chart',
    title: 'Revenue Trends',
    description: 'Monthly revenue vs targets',
    searchKeywords: ['revenue', 'trend', 'chart', 'monthly', 'target', 'growth', 'income', 'earnings', 'analytics'],
    component: 'revenue-chart',
    dependencies: ['analyticsData'],
    gridClass: 'xl:col-span-1',
    priority: 2
  },
  {
    id: 'channel-chart',
    title: 'Channel Performance',
    description: 'Marketing channel comparison',
    searchKeywords: ['channel', 'marketing', 'traffic', 'source', 'acquisition', 'performance', 'chart', 'analytics'],
    component: 'channel-chart',
    dependencies: ['analyticsData'],
    gridClass: 'xl:col-span-1',
    priority: 3,
    dataFilter: (analyticsData: AnalyticsData, searchQuery: string) =>
      analyticsData?.channelData.filter(channel =>
        searchQuery === "" || channel.channel.toLowerCase().includes(searchQuery)
      ) || []
  },
  {
    id: 'campaign-table',
    title: 'Campaign Performance',
    description: 'Detailed campaign analytics',
    searchKeywords: ['campaign', 'table', 'performance', 'ads', 'advertising', 'ctr', 'roas', 'spend', 'analytics'],
    component: 'campaign-table',
    dependencies: ['analyticsData'],
    priority: 4,
    dataFilter: (analyticsData: AnalyticsData, searchQuery: string) =>
      analyticsData?.campaigns.filter(campaign =>
        searchQuery === "" ||
        campaign.name.toLowerCase().includes(searchQuery) ||
        campaign.status.toLowerCase().includes(searchQuery)
      ) || []
  },
  {
    id: 'funnel-table',
    title: 'Conversion Funnel',
    description: 'User journey analysis',
    searchKeywords: ['funnel', 'conversion', 'journey', 'stage', 'dropoff', 'analysis', 'user', 'table', 'analytics'],
    component: 'funnel-table',
    dependencies: ['analyticsData'],
    priority: 5
  }
]

// KPI Card Component
const KpiCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  isLoading = false 
}: {
  title: string
  value: string | number
  icon: any
  trend?: string
  isLoading?: boolean
}) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative flex items-center justify-between p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {title}
          </p>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </div>
          ) : (
            <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {value}
            </h3>
          )}
          {trend && !isLoading && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>{trend}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
          <div className="relative p-3 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
            <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportsPage() {
  const [data, setData] = useState<ReportSummary | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsError, setAnalyticsError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch('/api/report/summary')
      if (!res.ok) throw new Error('Failed to fetch summary data')
      const result = await res.json()
      setData(result)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAnalyticsData = async () => {
    try {
      setIsAnalyticsLoading(true)
      setAnalyticsError(null)
      const res = await fetch('/api/report/analytics')
      if (!res.ok) throw new Error('Failed to fetch analytics data')
      const result: AnalyticsResponse = await res.json()
      
      if (result.success && result.data) {
        setAnalyticsData(result.data)
      } else {
        throw new Error(result.message || 'Failed to load analytics data')
      }
    } catch (err) {
      setAnalyticsError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyticsLoading(false)
    }
  }

  const refreshAllData = async () => {
    await Promise.all([fetchData(), fetchAnalyticsData()])
  }

  useEffect(() => {
    fetchData()
    fetchAnalyticsData()
  }, [])

  // Listen for dashboard search events
  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      setSearchQuery(event.detail.toLowerCase())
    }

    window.addEventListener('dashboard-search', handleSearch as EventListener)
    
    return () => {
      window.removeEventListener('dashboard-search', handleSearch as EventListener)
    }
  }, [])

  // Filter analytics data based on search
  const filteredCampaigns = analyticsData?.campaigns.filter(campaign =>
    searchQuery === "" ||
    campaign.name.toLowerCase().includes(searchQuery) ||
    campaign.channel.toLowerCase().includes(searchQuery) ||
    campaign.status.toLowerCase().includes(searchQuery)
  ) || []

  const filteredChannelData = analyticsData?.channelData.filter(channel =>
    searchQuery === "" ||
    channel.channel.toLowerCase().includes(searchQuery)
  ) || []

  // Determine what sections to show based on search
  const showKpis = searchQuery === "" ||
    searchQuery.includes("campaign") ||
    searchQuery.includes("impression") ||
    searchQuery.includes("click") ||
    searchQuery.includes("revenue") ||
    searchQuery.includes("metric") ||
    searchQuery.includes("kpi") ||
    (data && (
      data.totalCampaigns.toString().includes(searchQuery) ||
      data.impressions.toLowerCase().includes(searchQuery) ||
      data.clicks.toLowerCase().includes(searchQuery) ||
      data.revenue.toLowerCase().includes(searchQuery)
    ))

  const showRevenueChart = searchQuery === "" ||
    searchQuery.includes("revenue") ||
    searchQuery.includes("trend") ||
    searchQuery.includes("growth") ||
    searchQuery.includes("chart") ||
    searchQuery.includes("analytics")

  const showChannelChart = searchQuery === "" ||
    searchQuery.includes("channel") ||
    searchQuery.includes("performance") ||
    searchQuery.includes("chart") ||
    searchQuery.includes("analytics") ||
    filteredChannelData.length > 0

  const showCampaignTable = searchQuery === "" ||
    searchQuery.includes("campaign") ||
    searchQuery.includes("table") ||
    searchQuery.includes("analytics") ||
    filteredCampaigns.length > 0

  const showFunnelTable = searchQuery === "" ||
    searchQuery.includes("funnel") ||
    searchQuery.includes("conversion") ||
    searchQuery.includes("table") ||
    searchQuery.includes("analytics")

  const kpiConfig = data ? [
    {
      title: "Total Campaigns",
      value: data.totalCampaigns,
      icon: BarChart3,
      trend: undefined
    },
    {
      title: "Impressions",
      value: data.impressions,
      icon: Eye,
      trend: undefined
    },
    {
      title: "Clicks",
      value: data.clicks,
      icon: MousePointer,
      trend: undefined
    },
    {
      title: "Revenue",
      value: data.revenue,
      icon: DollarSign,
      trend: undefined
    }
  ] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent p-8 border border-primary/10 dark:border-primary/20">
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Reports Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                View analytics, charts, KPIs, and export options here.
              </p>
              {searchQuery && (
                <p className="text-sm text-primary flex items-center gap-2">
                  <span>Searching for: "{searchQuery}"</span>
                </p>
              )}
              {lastUpdated && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              )}
            </div>
            
            <Button
              onClick={refreshAllData}
              disabled={isLoading || isAnalyticsLoading}
              variant="outline"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            >
              {(isLoading || isAnalyticsLoading) ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Show no results message if search returns nothing */}
        {searchQuery && !showKpis && !showRevenueChart && !showChannelChart && !showCampaignTable && !showFunnelTable && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">No results found for "{searchQuery}"</p>
              <p className="text-sm">Try searching for: campaign, revenue, channel, conversion, funnel, or chart</p>
            </div>
          </div>
        )}

        {/* Error States */}
        {(error || analyticsError) && (
          <div className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <span className="w-4 h-4 rounded-full bg-red-500 inline-block" />
                  <span className="font-medium">Error loading summary:</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
            {analyticsError && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <span className="w-4 h-4 rounded-full bg-red-500 inline-block" />
                  <span className="font-medium">Error loading analytics:</span>
                  <span>{analyticsError}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* KPI Cards Section */}
        {showKpis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Key Metrics</h2>
              {data && (
                <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">
                  {kpiConfig.length} metrics
                </span>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <KpiCard
                    key={i}
                    title="Loading..."
                    value=""
                    icon={Activity}
                    isLoading={true}
                  />
                ))}
              </div>
            ) : data ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiConfig.map((kpi, index) => (
                  <KpiCard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    icon={kpi.icon}
                    trend={kpi.trend}
                  />
                ))}
              </div>
            ) : !error && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-muted-foreground text-lg">No data available</p>
                  <Button onClick={fetchData} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed Analytics Section */}
        {(data || analyticsData) && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Detailed Analytics</h2>
              {analyticsData && (
                <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">
                  Dynamic data loaded
                </span>
              )}
            </div>
            
            {/* Revenue Trends and Channel Performance Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {showRevenueChart && (
                <RevenueChart
                  data={analyticsData?.revenueData || []}
                  isLoading={isAnalyticsLoading}
                />
              )}
              {showChannelChart && (
                <ChannelChart
                  data={filteredChannelData}
                  isLoading={isAnalyticsLoading}
                />
              )}
            </div>

            {/* Campaign Performance Table */}
            {showCampaignTable && (
              <div className="w-full">
                <CampaignTable
                  data={filteredCampaigns}
                  isLoading={isAnalyticsLoading}
                />
              </div>
            )}

            {/* Conversion Funnel Analysis */}
            {showFunnelTable && (
              <div className="w-full">
                <ConversionFunnelTable
                  data={analyticsData?.conversionFunnel || []}
                  isLoading={isAnalyticsLoading}
                />
              </div>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground py-4 border-t border-border/50">
          <span>Reports Dashboard • Real-time Analytics</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse inline-block" />
            Live updates
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
