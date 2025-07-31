'use client'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, DollarSign } from 'lucide-react'
import { RevenueData } from '@/lib/config'

interface RevenueChartProps {
  data: RevenueData[]
  isLoading?: boolean
}

export default function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  // Custom tooltip component for better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm">
          <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">
            {new Date(label).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <p className="text-primary font-semibold">
                Revenue: ${data.revenue.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Target: ${data.target.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <p className={`font-medium ${
                data.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                Growth: {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
        <CardHeader className="relative pb-2 px-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6 pt-2">
          <div className="h-[350px] bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Calculate total revenue and average growth
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const averageGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length
  const targetAchievement = (totalRevenue / data.reduce((sum, item) => sum + item.target, 0)) * 100

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      <CardHeader className="relative pb-2 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              {/* Icon background glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
              <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                <DollarSign className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Revenue Trends
              </h2>
              <p className="text-sm text-muted-foreground">
                Daily revenue performance vs targets
              </p>
            </div>
          </div>
          
          {/* Stats indicators */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+{averageGrowth.toFixed(1)}% avg</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
              <DollarSign className="w-3 h-3" />
              <span>{targetAchievement.toFixed(0)}% target</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-2">
        {/* Chart container with enhanced styling */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent p-4 border border-gray-100/50 dark:border-slate-700/50">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={data}
                margin={{ 
                  top: 20, 
                  right: 30, 
                  left: 20, 
                  bottom: 20 
                }}
              >
                <defs>
                  {/* Gradient definitions for area fill */}
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b7280" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#6b7280" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e2e8f0" 
                  opacity={0.3}
                  horizontal={true}
                  vertical={false}
                />
                
                <XAxis 
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12, 
                    fill: '#64748b',
                    fontWeight: 500
                  }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  }}
                  dy={10}
                />
                
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 12, 
                    fill: '#64748b',
                    fontWeight: 500
                  }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  width={60}
                />
                
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ 
                    stroke: '#3b82f6',
                    strokeWidth: 1,
                    strokeDasharray: '4 4'
                  }}
                />
                
                {/* Target area (background) */}
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#6b7280"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  fill="url(#targetGradient)"
                  fillOpacity={0.3}
                />
                
                {/* Revenue area (foreground) */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  fillOpacity={0.6}
                  dot={{ 
                    r: 4, 
                    fill: '#3b82f6',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    className: 'drop-shadow-sm'
                  }}
                  activeDot={{ 
                    r: 6, 
                    fill: '#3b82f6',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    className: 'drop-shadow-md'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Revenue</div>
            <div className="text-lg font-bold text-primary">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Avg Growth</div>
            <div className={`text-lg font-bold ${
              averageGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {averageGrowth >= 0 ? '+' : ''}{averageGrowth.toFixed(1)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Target Achievement</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {targetAchievement.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: Just now</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Live data
          </span>
        </div>
      </CardContent>
    </Card>
  )
}