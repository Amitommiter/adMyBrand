// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import KpiCard from "@/components/cards/KpiCard"
import LineChartCard from "@/components/charts/LineChartCard"
import BarChartCard from "@/components/charts/BarChartCard"
import PieChartCard from "@/components/charts/PieChartCard"
import { DataTable } from "@/components/tables/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { configService, type User, type KpiData } from "@/lib/config"
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"

// Icon mapping for dynamic KPI icons
const iconMap: Record<string, any> = {
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  BarChart3,
  PieChartIcon
}

// Define table columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'plan',
    header: 'Plan',
  },
]

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [kpis, setKpis] = useState<KpiData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Load configuration
        const config = await configService.loadConfig()
        setKpis(config.kpis)
        
        // Load users
        const usersResponse = await fetch('/api/users')
        if (usersResponse.ok) {
          const usersData = await usersResponse.json()
          setUsers(usersData)
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
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

  // Filter dashboard content based on search
  const filteredKpis = kpis.filter(kpi =>
    searchQuery === "" ||
    kpi.title.toLowerCase().includes(searchQuery) ||
    kpi.value.toLowerCase().includes(searchQuery)
  )

  const filteredUsers = users.filter(user =>
    searchQuery === "" ||
    user.name.toLowerCase().includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery) ||
    (user.role && user.role.toLowerCase().includes(searchQuery)) ||
    (user.plan && user.plan.toLowerCase().includes(searchQuery))
  )

  // Determine what sections to show based on search
  const showKpis = searchQuery === "" || filteredKpis.length > 0
  const showCharts = searchQuery === "" ||
    searchQuery.includes("chart") ||
    searchQuery.includes("revenue") ||
    searchQuery.includes("sales") ||
    searchQuery.includes("user") ||
    searchQuery.includes("growth")
  const showTable = searchQuery === "" || filteredUsers.length > 0 || searchQuery.includes("user") || searchQuery.includes("table")

  if (isLoading) {
    return (
      <div className="p-6 sm:p-10 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            Searching for: "{searchQuery}"
          </div>
        )}
      </div>

      {/* Show no results message if search returns nothing */}
      {searchQuery && !showKpis && !showCharts && !showTable && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">No results found for "{searchQuery}"</p>
            <p className="text-sm">Try searching for: revenue, users, growth, sales, or user names</p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      {showKpis && (
        <div className="space-y-4">
          {searchQuery && <h2 className="text-lg font-semibold">Metrics</h2>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredKpis.map((kpi, index) => {
              const IconComponent = iconMap[kpi.icon]
              return (
                <KpiCard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  icon={IconComponent}
                  trend={kpi.trend}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Charts */}
      {showCharts && (
        <div className="space-y-6">
          {searchQuery && <h2 className="text-lg font-semibold">Charts</h2>}
          
          {/* Line Chart */}
          <div className="w-full max-w-4xl">
            <LineChartCard />
          </div>

          {/* Bar Chart */}
          <div className="w-full max-w-4xl">
            <BarChartCard />
          </div>

          {/* Pie Chart */}
          <div className="w-full max-w-4xl">
            <PieChartCard />
          </div>
        </div>
      )}

      {/* Data Table */}
      {showTable && (
        <div className="w-full max-w-5xl space-y-4">
          {searchQuery && <h2 className="text-lg font-semibold">User Data</h2>}
          <h3 className="text-xl font-semibold">User Table</h3>
          <DataTable columns={columns} data={filteredUsers} />
        </div>
      )}
    </div>
  )
}