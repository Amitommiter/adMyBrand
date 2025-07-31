'use client'

import { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import Papa from 'papaparse'
import { CampaignData } from '@/lib/config'

interface CampaignTableProps {
  data: CampaignData[]
  isLoading?: boolean
}

export default function CampaignTable({ data, isLoading = false }: CampaignTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  // Define columns for campaign data
  const columns: ColumnDef<CampaignData>[] = [
    {
      accessorKey: 'name',
      header: 'Campaign Name',
      cell: ({ row }) => (
        <div className="font-medium text-foreground">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge 
            variant={
              status === 'active' ? 'default' : 
              status === 'completed' ? 'secondary' : 
              'outline'
            }
            className={
              status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'channel',
      header: 'Channel',
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue('channel')}
        </div>
      ),
    },
    {
      accessorKey: 'budget',
      header: 'Budget',
      cell: ({ row }) => (
        <div className="font-medium">
          ${(row.getValue('budget') as number).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'spent',
      header: 'Spent',
      cell: ({ row }) => {
        const spent = row.getValue('spent') as number
        const budget = row.original.budget
        const percentage = (spent / budget) * 100
        
        return (
          <div className="space-y-1">
            <div className="font-medium">
              ${spent.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {percentage.toFixed(1)}% of budget
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'impressions',
      header: 'Impressions',
      cell: ({ row }) => (
        <div className="font-medium">
          {(row.getValue('impressions') as number).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'clicks',
      header: 'Clicks',
      cell: ({ row }) => (
        <div className="font-medium">
          {(row.getValue('clicks') as number).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'ctr',
      header: 'CTR',
      cell: ({ row }) => (
        <div className="font-medium">
          {(row.getValue('ctr') as number).toFixed(2)}%
        </div>
      ),
    },
    {
      accessorKey: 'conversions',
      header: 'Conversions',
      cell: ({ row }) => (
        <div className="font-medium">
          {(row.getValue('conversions') as number).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'roi',
      header: 'ROI',
      cell: ({ row }) => {
        const roi = row.getValue('roi') as number
        const isPositive = roi > 0
        
        return (
          <div className={`flex items-center gap-1 font-medium ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {roi.toFixed(0)}%
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const handleDownload = () => {
    const csv = Papa.unparse(table.getRowModel().rows.map(row => row.original))
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "campaign-data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
                Campaign Performance
              </h2>
              <p className="text-sm text-muted-foreground">
                {data.length} campaigns tracked
              </p>
            </div>
          </div>
          
          {/* Controls section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-10 max-w-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            
            {/* Export button */}
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 group/btn"
            >
              <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-0 space-y-4">
        {/* Table container */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent border border-gray-100/50 dark:border-slate-700/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="hover:bg-muted/50 border-b border-gray-200/50 dark:border-slate-700/50">
                    {headerGroup.headers.map(header => (
                      <TableHead 
                        key={header.id} 
                        onClick={header.column.getToggleSortingHandler()} 
                        className="cursor-pointer hover:bg-primary/5 transition-colors duration-200 font-semibold text-foreground/80 group/header"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="flex flex-col opacity-0 group-hover/header:opacity-100 transition-opacity duration-200">
                            {header.column.getIsSorted() === 'asc' && (
                              <ChevronUp className="w-4 h-4 text-primary" />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <ChevronDown className="w-4 h-4 text-primary" />
                            )}
                            {!header.column.getIsSorted() && (
                              <div className="w-4 h-4 flex flex-col">
                                <ChevronUp className="w-3 h-2 text-muted-foreground/50" />
                                <ChevronDown className="w-3 h-2 text-muted-foreground/50" />
                              </div>
                            )}
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow 
                      key={row.id} 
                      className={`hover:bg-muted/30 transition-colors duration-200 border-b border-gray-100/50 dark:border-slate-700/50 ${
                        index % 2 === 0 ? 'bg-white/20 dark:bg-slate-800/20' : 'bg-transparent'
                      }`}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                      No campaigns found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-white/50 to-transparent dark:from-slate-800/30 dark:to-transparent rounded-lg border border-gray-100/50 dark:border-slate-700/50">
          <div className="text-sm text-muted-foreground font-medium">
            <span className="text-foreground font-semibold">
              Page {table.getState().pagination.pageIndex + 1}
            </span>
            {' '}of{' '}
            <span className="text-foreground font-semibold">
              {table.getPageCount()}
            </span>
            {' • '}
            <span className="text-foreground font-semibold">
              {table.getFilteredRowModel().rows.length}
            </span>
            {' '}campaigns
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
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