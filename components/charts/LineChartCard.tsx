'use client'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, Users } from 'lucide-react'
import { configService, type ChartData } from '@/lib/config'
import { useEffect, useState } from 'react'

export default function LineChartCard() {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true)
        const config = await configService.loadConfig()
        if (config.charts?.lineChart && Array.isArray(config.charts.lineChart)) {
          setData(config.charts.lineChart)
        } else {
          console.warn('Line chart data not found in config')
          setData([])
        }
      } catch (error) {
        console.error('Failed to load line chart data:', error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadChartData()
  }, [])

  // Custom tooltip component for better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm">
          <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <p className="text-primary font-semibold">
              {payload[0]?.value?.toLocaleString() ?? 'N/A'} users
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm w-full h-full">
          <CardHeader className="relative pb-2 px-3 sm:px-4 md:px-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-48"></div>
            </div>
          </CardHeader>
          <CardContent className="relative p-3 sm:p-4 md:p-6 pt-2">
            <div className="h-[300px] bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ FIXED: Complete validation with TypeScript safety
  if (!Array.isArray(data) || data.length < 2) {
    return (
      <div className="w-full h-full">
        <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm w-full h-full">
          <CardContent className="relative p-6 flex items-center justify-center h-[300px]">
            <div className="text-center space-y-3">
              <Users className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <p className="text-muted-foreground">No chart data available</p>
              <p className="text-sm text-muted-foreground">Please check your configuration</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ FIXED: Completely safe calculations with explicit type checking
  const firstValue = data[0]?.value ?? 0
  const lastValue = data[data.length - 1]?.value ?? 0
  const totalGrowth = lastValue - firstValue
  const growthPercentage = firstValue !== 0 
    ? ((totalGrowth / firstValue) * 100).toFixed(1)
    : "0.0"

  const isPositiveGrowth = totalGrowth >= 0

  const totalUsers = data.reduce((sum, item) => sum + (item?.value ?? 0), 0)

  return (
    <div className="w-full h-full">
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm w-full h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        
        <CardHeader className="relative pb-2 px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {/* Icon background glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
                <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent truncate">
                  User Growth
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Monthly active user progression
                </p>
              </div>
            </div>
            
            {/* ✅ FIXED: Safe growth indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold self-start sm:self-center ${
              isPositiveGrowth 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 ${isPositiveGrowth ? '' : 'rotate-180'}`} />
              <span>{isPositiveGrowth ? '+' : ''}{growthPercentage}%</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-3 sm:p-4 md:p-6 pt-2">
          {/* Chart container with enhanced styling and increased width */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent p-1 sm:p-2 border border-gray-100/50 dark:border-slate-700/50">
            <div className="h-[200px] xs:h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={data}
                  margin={{ 
                    top: 15, 
                    right: 50, 
                    left: 10, 
                    bottom: 15 
                  }}
                >
                  <defs>
                    {/* Gradient definition for line */}
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
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
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fontSize: 11, 
                      fill: '#64748b',
                      fontWeight: 500
                    }}
                    dy={5}
                    interval={0}
                  />
                  
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fontSize: 11, 
                      fill: '#64748b',
                      fontWeight: 500
                    }}
                    tickFormatter={(value) => {
                      if (typeof value === 'number' && value >= 1000) {
                        return `${(value / 1000).toFixed(0)}k`
                      }
                      return String(value)
                    }}
                    width={35}
                  />
                  
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ 
                      stroke: '#3b82f6',
                      strokeWidth: 1,
                      strokeDasharray: '4 4'
                    }}
                  />
                  
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#lineGradient)"
                    strokeWidth={2.5}
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
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional info only */}
          <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 text-xs text-muted-foreground">
            <span>Last updated: Just now</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Live data
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
