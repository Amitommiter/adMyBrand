"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, PieChart as PieChartIcon } from "lucide-react"
import { configService, type ChartData } from '@/lib/config'
import { useEffect, useState } from 'react'

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]

export default function PieChartCard() {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true)
        const config = await configService.loadConfig()
        if (config.charts?.pieChart) {
          setData(config.charts.pieChart)
        } else {
          console.warn('Pie chart data not found in config')
          setData([])
        }
      } catch (error) {
        console.error('Failed to load pie chart data:', error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadChartData()
  }, [])

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const total = 800 // Sum of all values
    const percentage = ((data.value / total) * 100).toFixed(1)
    
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm">
        <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">{data.name}</p>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: payload[0].color }}
          ></div>
          <p className="font-semibold" style={{ color: payload[0].color }}>
            {data.value.toLocaleString()} users ({percentage}%)
          </p>
        </div>
      </div>
    )
  }
  return null
}

// Custom label component
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.05) return null // Don't show labels for very small slices

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-semibold drop-shadow-lg"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

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
            <div className="h-[350px] bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalUsers = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="w-full h-full">
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm w-full h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        
        <CardHeader className="relative pb-2 px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {/* Icon background glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
                <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                  <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  User Distribution
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Breakdown by subscription type
                </p>
              </div>
            </div>
            
            {/* Total users indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{totalUsers.toLocaleString()}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative p-3 sm:p-4 md:p-6 pt-2">
          {/* Chart container with enhanced styling */}
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent p-1 sm:p-2 border border-gray-100/50 dark:border-slate-700/50">
            <div className="h-[250px] xs:h-[280px] sm:h-[320px] md:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {/* Gradient definitions for each slice */}
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="yellowGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                      <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={80}
                    innerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                    className="drop-shadow-lg"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                  >
                    {data.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#blueGradient)" : index === 1 ? "url(#greenGradient)" : "url(#yellowGradient)"}
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    ))}
                  </Pie>
                  
                  <Tooltip content={<CustomTooltip />} />
                  
                  <Legend 
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional info */}
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
