// components/layouts/DashboardLayout.tsx
'use client'

import { ReactNode, useState, useEffect, useRef } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import {
  Menu,
  X,
  BarChart3,
  FileText,
  Settings,
  Home,
  ChevronRight,
  User,
  Bell,
  Search,
  Check,
  AlertCircle,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import { usePathname, useRouter } from "next/navigation"

export type DashboardLayoutProps = {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Smith has joined your platform",
      time: "2 minutes ago",
      type: "info",
      read: false
    },
    {
      id: 2,
      title: "Campaign completed",
      message: "Summer Sale campaign has ended successfully",
      time: "1 hour ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "Low budget alert",
      message: "Google Ads campaign is running low on budget",
      time: "3 hours ago",
      type: "warning",
      read: true
    },
    {
      id: 4,
      title: "Monthly report ready",
      message: "Your analytics report for January is ready",
      time: "1 day ago",
      type: "info",
      read: true
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  const pathname = usePathname()
  const router = useRouter()

  const navigationItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/setting", label: "Settings", icon: Settings },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchTerm(query)

    // Dispatch search event for both dashboard and reports pages
    if (pathname === "/" || pathname === "/reports") {
      const event = new CustomEvent("dashboard-search", { detail: query })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        text-white transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        border-r border-slate-700/50 backdrop-blur-sm
      `}>
        <div className="relative p-6 border-b border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                ADmyBRAND
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:bg-slate-700/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              <item.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-200" />
              <span className="relative z-10 font-medium">{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 relative z-10" />
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm">
            <Avatar className="w-8 h-8 border-2 border-slate-600">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
          <div className="relative flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={notificationRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 z-50">
                    <Card className="shadow-xl border border-gray-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="p-4 border-b border-gray-200/50 dark:border-slate-700/50">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">Notifications</h3>
                            <span className="text-xs text-muted-foreground">
                              {unreadCount} unread
                            </span>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100/50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                                !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-1 rounded-full ${
                                  notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                                  notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                  'bg-blue-100 dark:bg-blue-900/30'
                                }`}>
                                  {notification.type === 'success' ? (
                                    <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  ) : notification.type === 'warning' ? (
                                    <AlertCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                                  ) : (
                                    <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-sm text-foreground truncate">
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 border-t border-gray-200/50 dark:border-slate-700/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setShowNotifications(false)}
                          >
                            View All Notifications
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              <ThemeToggle />

              <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-slate-700">
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="mt-auto border-t border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="px-4 md:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>© 2024 ADmyBRAND</span>
                <span className="hidden sm:block">•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  All systems operational
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Support</a>
                <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}