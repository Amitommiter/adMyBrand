'use client'

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
import { useState, useEffect } from 'react'
import { Download, Search, ChevronUp, ChevronDown, Database, ChevronLeft, ChevronRight } from 'lucide-react'
import Papa from 'papaparse'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

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
  })

  const handleDownload = () => {
    const csv = Papa.unparse(table.getRowModel().rows.map(row => row.original))
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", "data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full h-full">
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm w-full h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        
        <CardHeader className="relative pb-4 px-3 sm:px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {/* Icon background glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150" />
                <div className="relative p-2 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Data Table
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {data.length} total records
                </p>
              </div>
            </div>
            
            {/* Controls section */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Search input with enhanced styling */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-10 max-w-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              
              {/* Export button with enhanced styling */}
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

        <CardContent className="relative p-3 sm:p-4 md:p-6 pt-0 space-y-4">
          {/* Table container with enhanced styling */}
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
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination section with enhanced styling */}
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
              {' '}results
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
    </div>
  )
}
