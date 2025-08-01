"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { configService, type ChartData } from '@/lib/config'
import { useEffect, useState } from 'react'

export default function BarChartCard() {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true)
        const config = await configService.loadConfig()
        if (config.charts?.barChart) {
          setData(config.charts.barChart)
        } else {
          console.warn('Bar chart data not found in config')
          setData([])
        }
      } catch (error) {
        console.error('Failed to load bar chart data:', error)
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
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600">
        <p className="font-medium text-slate-900 dark:text-slate-100">{label}</p>
        <p className="text-primary font-semibold">
          Sales: ${(payload[0]?.value ?? 0).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

  if (isLoading) {
    return (
      <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
        <CardHeader className="relative pb-2">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-48"></div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6 pt-2">
          <div className="h-[320px] bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Don't render chart if no data
  if (!data || data.length === 0) {
    return (
      <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Sales by Product
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Performance overview across product lines
              </p>
            </div>
            <div className="relative">
              <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6 pt-2">
          <div className="flex items-center justify-center h-[320px] text-muted-foreground">
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Sales by Product
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Performance overview across product lines
            </p>
          </div>
          <div className="relative">
            {/* Icon background glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
            <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
              <TrendingUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-2">
        {/* Chart container with enhanced styling */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent p-4 border border-gray-100/50 dark:border-slate-700/50">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart 
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <defs>
                {/* Gradient definition for bars */}
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e2e8f0" 
                dark-stroke="#475569"
                opacity={0.3}
                horizontal={true}
                vertical={false}
              />
              
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 12, 
                  fill: '#64748b',
                  fontWeight: 500
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ 
                  fill: 'rgba(59, 130, 246, 0.1)',
                  stroke: 'none'
                }}
              />
              
              <Bar 
                dataKey="sales" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                className="drop-shadow-sm"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional info section */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: Just now</span>
                      <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Total: ${data.reduce((sum, item) => sum + (item.sales || 0), 0).toLocaleString()}
            </span>
        </div>
      </CardContent>
    </Card>
  )
}
