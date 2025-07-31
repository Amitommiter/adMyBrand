'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, Zap } from 'lucide-react'
import { ChannelData } from '@/lib/config'

interface ChannelChartProps {
  data: ChannelData[]
  isLoading?: boolean
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function ChannelChart({ data, isLoading = false }: ChannelChartProps) {
  // Custom tooltip component for better styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm">
          <p className="font-medium text-slate-900 dark:text-slate-100 mb-3">{label}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Revenue:</span>
              <span className="font-semibold text-primary">
                ${data.revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Impressions:</span>
              <span className="font-medium">
                {data.impressions.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Clicks:</span>
              <span className="font-medium">
                {data.clicks.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">CTR:</span>
              <span className="font-medium">
                {data.ctr.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">ROI:</span>
              <span className={`font-semibold ${
                data.roi > 500 ? 'text-green-600 dark:text-green-400' : 
                data.roi > 300 ? 'text-blue-600 dark:text-blue-400' : 
                'text-yellow-600 dark:text-yellow-400'
              }`}>
                {data.roi.toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Cost:</span>
              <span className="font-medium">
                ${data.cost.toLocaleString()}
              </span>
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

  // Calculate totals and best performing channel
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const bestChannel = data.reduce((best, current) => 
    current.roi > best.roi ? current : best
  )
  const averageROI = data.reduce((sum, item) => sum + item.roi, 0) / data.length

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
                <Zap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Channel Performance
              </h2>
              <p className="text-sm text-muted-foreground">
                Revenue comparison across marketing channels
              </p>
            </div>
          </div>
          
          {/* Performance indicators */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>Best: {bestChannel.channel}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
              <Zap className="w-3 h-3" />
              <span>{averageROI.toFixed(0)}% avg ROI</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-2">
        {/* Chart container with enhanced styling */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent p-4 border border-gray-100/50 dark:border-slate-700/50">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data}
                margin={{ 
                  top: 20, 
                  right: 30, 
                  left: 20, 
                  bottom: 60 
                }}
              >
                <defs>
                  {/* Gradient definitions for bars */}
                  {COLORS.map((color, index) => (
                    <linearGradient key={index} id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e2e8f0" 
                  opacity={0.3}
                  horizontal={true}
                  vertical={false}
                />
                
                <XAxis 
                  dataKey="channel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fontSize: 11, 
                    fill: '#64748b',
                    fontWeight: 500
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
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
                    fill: 'rgba(59, 130, 246, 0.1)',
                    stroke: 'none'
                  }}
                />
                
                <Bar 
                  dataKey="revenue" 
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#barGradient${index % COLORS.length})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel performance metrics */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.slice(0, 3).map((channel, index) => (
            <div 
              key={channel.channel}
              className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="text-sm font-medium truncate">{channel.channel}</div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-medium">${(channel.revenue / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">ROI</span>
                  <span className={`font-medium ${
                    channel.roi > 500 ? 'text-green-600 dark:text-green-400' : 
                    channel.roi > 300 ? 'text-blue-600 dark:text-blue-400' : 
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {channel.roi.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">CTR</span>
                  <span className="font-medium">{channel.ctr.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Revenue</div>
              <div className="text-lg font-bold text-primary">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Best ROI</div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {bestChannel.roi.toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Channels</div>
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {data.length}
              </div>
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