// components/cards/KpiCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
}

export default function KpiCard({ title, value, icon: Icon, trend }: Props) {
  const isPositiveTrend = trend && !trend.startsWith('-')
  
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative flex items-center justify-between p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            {title}
          </p>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                isPositiveTrend 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>
                <span className={cn(
                  "w-1 h-1 rounded-full",
                  isPositiveTrend ? "bg-green-500" : "bg-red-500"
                )} />
                {trend}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          {/* Icon background glow */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
          <div className="relative p-3 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
            <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
