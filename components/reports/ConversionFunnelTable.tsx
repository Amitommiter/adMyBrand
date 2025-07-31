'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingDown,
  ArrowRight,
  Target
} from 'lucide-react'

// Simple Progress component
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
    <div
      className="bg-primary h-full transition-all duration-300 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)
import { ConversionFunnelData } from '@/lib/config'

interface ConversionFunnelTableProps {
  data: ConversionFunnelData[]
  isLoading?: boolean
}

export default function ConversionFunnelTable({ data, isLoading = false }: ConversionFunnelTableProps) {
  if (isLoading) {
    return (
      <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
        <CardHeader className="relative pb-4 px-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
          </div>
        </CardHeader>
        <CardContent className="relative p-6 pt-0">
          <div className="h-[400px] bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Calculate total conversion rate from start to end
  const totalConversionRate = data.length > 0 ? 
    (data[data.length - 1].conversions / data[0].visitors) * 100 : 0

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      <CardHeader className="relative pb-4 px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              {/* Icon background glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
              <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                <Target className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Conversion Funnel
              </h2>
              <p className="text-sm text-muted-foreground">
                User journey and conversion analysis
              </p>
            </div>
          </div>
          
          {/* Overall conversion rate */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary font-semibold">
            <Target className="w-4 h-4" />
            <span>{totalConversionRate.toFixed(1)}% overall</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-0 space-y-4">
        {/* Funnel visualization */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent border border-gray-100/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div className="p-6 space-y-4">
            {data.map((stage, index) => {
              const isFirst = index === 0
              const isLast = index === data.length - 1
              const nextStage = data[index + 1]
              
              return (
                <div key={stage.stage} className="space-y-3">
                  {/* Stage header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isFirst ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        isLast ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{stage.stage}</h3>
                        <p className="text-sm text-muted-foreground">
                          {stage.visitors.toLocaleString()} visitors
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {stage.conversionRate.toFixed(1)}%
                      </div>
                      {!isFirst && (
                        <div className="text-xs text-muted-foreground">
                          from previous stage
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conversion Progress</span>
                      <span>{stage.conversions.toLocaleString()} converted</span>
                    </div>
                    <Progress 
                      value={stage.conversionRate} 
                      className="h-2"
                    />
                  </div>

                  {/* Drop-off information */}
                  {!isLast && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-700 dark:text-red-400">
                          Drop-off Rate: {stage.dropOffRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400">
                        {(stage.visitors - (nextStage?.visitors || 0)).toLocaleString()} users lost
                      </div>
                    </div>
                  )}

                  {/* Arrow connector */}
                  {!isLast && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Visitors</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data[0]?.visitors.toLocaleString() || '0'}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Final Conversions</span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data[data.length - 1]?.conversions.toLocaleString() || '0'}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Total Drop-off</span>
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {data.length > 0 ? 
                ((data[0].visitors - data[data.length - 1].conversions) / data[0].visitors * 100).toFixed(1) 
                : '0'
              }%
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Funnel Stages</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {data.length}
            </div>
          </div>
        </div>

        {/* Insights section */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20">
          <h4 className="font-semibold text-foreground mb-2">Key Insights</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            {data.length > 0 && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>
                    Biggest drop-off occurs at: {
                      data.reduce((max, stage) => 
                        stage.dropOffRate > max.dropOffRate ? stage : max
                      ).stage
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>
                    Best performing stage: {
                      data.reduce((max, stage) => 
                        stage.conversionRate > max.conversionRate ? stage : max
                      ).stage
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>
                    Overall funnel efficiency: {totalConversionRate.toFixed(1)}% of visitors convert
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
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