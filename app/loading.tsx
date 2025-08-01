import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="relative">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold">Loading...</h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 