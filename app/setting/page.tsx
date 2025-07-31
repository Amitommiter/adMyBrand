'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { configService, type User as ConfigUser, type NotificationPreference, type BillingInfo } from "@/lib/config"
import { useTheme } from "next-themes"
import { useLayoutContext } from "@/components/context/LayoutContext"
import { 
  User, 
  Bell, 
  Settings, 
  CreditCard, 
  Upload, 
  Save, 
  X,
  Shield,
  Camera,
  Star,
  Building,
  Mail,
  Loader2,
  Check,
  AlertTriangle,
  Info,
  Zap,
  Calendar,
  DollarSign,
  CreditCard as CreditCardIcon,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const {
    compactLayout,
    setCompactLayout,
    showAnimations,
    setShowAnimations,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion
  } = useLayoutContext()

  useEffect(() => {
    setMounted(true)
  }, [])
  const [user, setUser] = useState<ConfigUser | null>(null)
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=32")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreference[]>([])
  const [emailFrequency, setEmailFrequency] = useState('immediate')
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: '22:00',
    end: '08:00'
  })

  // Billing state
  const [billingInfo, setBillingInfo] = useState({
    plan: 'premium',
    nextBilling: '2024-02-15',
    amount: 29.99,
    currency: 'USD',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25'
    },
    billingHistory: [
      { date: '2024-01-15', amount: 29.99, status: 'paid' },
      { date: '2023-12-15', amount: 29.99, status: 'paid' },
      { date: '2023-11-15', amount: 29.99, status: 'paid' }
    ]
  })

  const [showCardNumber, setShowCardNumber] = useState(false)

  // Preferences state for non-layout settings
  const [preferences, setPreferences] = useState({
    analyticsCollection: true,
    personalizedContent: true,
    autoSave: true,
    screenReaderSupport: true,
    language: 'en',
    timezone: 'utc'
  })

  // Load user data and notification preferences on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const config = await configService.loadConfig()
        
        // Load user data
        const userData = config.user
        setUser(userData)
        
        // Parse name into first and last name
        const nameParts = userData.name.split(' ')
        setFirstName(nameParts[0] || '')
        setLastName(nameParts.slice(1).join(' ') || '')
        setEmail(userData.email)
        setAvatar(userData.avatar || "https://i.pravatar.cc/150?img=32")
        
        // Load notification preferences
        setNotificationPrefs(config.notifications)
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }

    loadData()
  }, [])

  // Helper function to find notification preference by ID
  const getNotificationPref = (id: string) => {
    return notificationPrefs.find(pref => pref.id === id)
  }

  // Helper function to update notification preference
  const updateNotificationPref = (id: string, enabled: boolean) => {
    setNotificationPrefs(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled } : pref
      )
    )
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] },
    maxSize: 5 * 1024 * 1024 // 5MB limit
  })

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // Save user profile data
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      })
      
      if (res.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 3000)
        
        // Show success message for layout changes
        if (compactLayout || !showAnimations) {
          console.log('Layout preferences updated!')
        }
      } else {
        alert('Failed to save settings.')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const tabsConfig = [
    { value: "profile", label: "Profile", icon: User },
    { value: "notifications", label: "Notifications", icon: Bell },
    { value: "preferences", label: "Preferences", icon: Settings },
    { value: "billing", label: "Billing", icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent p-8 mb-8 border border-primary/10 dark:border-primary/20">
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-muted-foreground text-lg mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Success notification */}
        {isSaved && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Settings saved successfully!</span>
            </div>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6 w-full">
          {/* Enhanced Tabs List */}
          <div className="relative overflow-hidden rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 p-2">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full bg-transparent">
              {tabsConfig.map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value}
                  className="group relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-primary/10 dark:hover:bg-primary/20"
                >
                  <tab.icon className="w-4 h-4 group-data-[state=active]:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Profile Tab Content */}
          <TabsContent value="profile">
            <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative p-6 space-y-8">
                {/* Profile Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar Upload */}
                  <div {...getRootProps()} className="cursor-pointer group/avatar relative">
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="relative">
                        <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-lg group-hover/avatar:scale-105 transition-transform duration-200">
                          <AvatarImage src={avatar} />
                          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary to-primary/80 text-white">
                            {firstName[0]}{lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-primary group-hover/avatar:underline">
                          {isDragActive ? "Drop image here..." : "Change Photo"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Click or drag to upload
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {firstName} {lastName}
                      </h2>
                      <div className="flex items-center gap-1 px-3 py-1 text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-full font-semibold shadow-sm">
                        <Star className="w-3 h-3" />
                        Premium
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>ADmyBRAND Agency</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200/50 dark:border-slate-700/50" />

                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                  </div>

                  <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">First Name</Label>
                        <Input 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)}
                          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-foreground">Last Name</Label>
                        <Input 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)}
                          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">Email Address</Label>
                      <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/50 dark:border-slate-700/50">
                      <Button 
                        variant="outline"
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90 transition-all duration-200"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Preferences */}
          <TabsContent value="notifications">
            <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative p-6 space-y-8">
                {/* Header Section */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts</p>
                  </div>
                </div>

                {/* Email Notifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Email Notifications</h4>
                  <div className="space-y-4">
                    {notificationPrefs
                      .filter(pref => pref.category === 'email')
                      .map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                          <div className="space-y-1">
                            <p className="font-medium">{pref.title}</p>
                            <p className="text-sm text-muted-foreground">{pref.description}</p>
                          </div>
                          <Switch
                            checked={pref.enabled}
                            onCheckedChange={(checked) => updateNotificationPref(pref.id, checked)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* System Notifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">System Notifications</h4>
                  <div className="space-y-4">
                    {notificationPrefs
                      .filter(pref => pref.category === 'system')
                      .map((pref) => (
                        <div key={pref.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                          <div className="space-y-1">
                            <p className="font-medium">{pref.title}</p>
                            <p className="text-sm text-muted-foreground">{pref.description}</p>
                          </div>
                          <Switch
                            checked={pref.enabled}
                            onCheckedChange={(checked) => updateNotificationPref(pref.id, checked)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Email Frequency */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Email Frequency</h4>
                  <div className="p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Email Delivery</Label>
                                                                   <Select
                        value={emailFrequency}
                        onValueChange={(value: string) => setEmailFrequency(value)}
                      >
                        <SelectTrigger className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Quiet Hours */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Quiet Hours</h4>
                  <div className="p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <p className="font-medium">Enable Quiet Hours</p>
                        <p className="text-sm text-muted-foreground">Pause notifications during specific hours</p>
                      </div>
                      <Switch
                        checked={quietHours.enabled}
                        onCheckedChange={(checked) => 
                          setQuietHours(prev => ({ 
                            ...prev, 
                            enabled: checked 
                          }))
                        }
                      />
                    </div>
                    
                                         {quietHours.enabled && (
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label className="text-sm font-medium">Start Time</Label>
                           <Input
                             type="time"
                             value={quietHours.start}
                             onChange={(e) => 
                               setQuietHours(prev => ({ 
                                 ...prev, 
                                 start: e.target.value 
                               }))
                             }
                             className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50"
                           />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-sm font-medium">End Time</Label>
                           <Input
                             type="time"
                             value={quietHours.end}
                             onChange={(e) => 
                               setQuietHours(prev => ({ 
                                 ...prev, 
                                 end: e.target.value 
                               }))
                             }
                             className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50"
                           />
                         </div>
                       </div>
                     )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/50 dark:border-slate-700/50">
                  <Button 
                    variant="outline"
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Preferences */}
          <TabsContent value="preferences">
            <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative p-6 space-y-8">
                {/* Header Section */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">User Preferences</h3>
                    <p className="text-sm text-muted-foreground">Customize your experience and application settings</p>
                  </div>
                </div>

                {/* Display Settings */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Display Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Use dark theme for better eye comfort</p>
                      </div>
                      <Switch
                        checked={mounted && theme === 'dark'}
                        onCheckedChange={(checked) => {
                          setTheme(checked ? 'dark' : 'light')
                          setPreferences(prev => ({ ...prev, darkMode: checked }))
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Compact Layout</p>
                        <p className="text-sm text-muted-foreground">Use compact spacing for more content</p>
                      </div>
                      <Switch 
                        checked={compactLayout}
                        onCheckedChange={(checked) => 
                          setCompactLayout(checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Show Animations</p>
                        <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                      </div>
                      <Switch 
                        checked={showAnimations}
                        onCheckedChange={(checked) => 
                          setShowAnimations(checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Data & Privacy */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Data & Privacy</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Analytics Collection</p>
                        <p className="text-sm text-muted-foreground">Allow us to collect usage analytics</p>
                      </div>
                      <Switch 
                        checked={preferences.analyticsCollection}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, analyticsCollection: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Personalized Content</p>
                        <p className="text-sm text-muted-foreground">Show personalized recommendations</p>
                      </div>
                      <Switch 
                        checked={preferences.personalizedContent}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, personalizedContent: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Auto-Save</p>
                        <p className="text-sm text-muted-foreground">Automatically save your work</p>
                      </div>
                      <Switch 
                        checked={preferences.autoSave}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, autoSave: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Language & Region */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Language & Region</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Language</Label>
                      <Select 
                        value={preferences.language}
                        onValueChange={(value: string) => 
                          setPreferences(prev => ({ ...prev, language: value }))
                        }
                      >
                        <SelectTrigger className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Time Zone</Label>
                      <Select 
                        value={preferences.timezone}
                        onValueChange={(value: string) => 
                          setPreferences(prev => ({ ...prev, timezone: value }))
                        }
                      >
                        <SelectTrigger className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time</SelectItem>
                          <SelectItem value="pst">Pacific Time</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Accessibility */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Accessibility</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">High Contrast</p>
                        <p className="text-sm text-muted-foreground">Use high contrast colors</p>
                      </div>
                      <Switch 
                        checked={highContrast}
                        onCheckedChange={(checked) => 
                          setHighContrast(checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Reduce Motion</p>
                        <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                      </div>
                      <Switch 
                        checked={reduceMotion}
                        onCheckedChange={(checked) => 
                          setReduceMotion(checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                      <div className="space-y-1">
                        <p className="font-medium">Screen Reader Support</p>
                        <p className="text-sm text-muted-foreground">Enhanced screen reader compatibility</p>
                      </div>
                      <Switch 
                        checked={preferences.screenReaderSupport}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, screenReaderSupport: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/50 dark:border-slate-700/50">
                  <Button 
                    variant="outline"
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing & Subscription */}
          <TabsContent value="billing">
            <Card className="group relative overflow-hidden transition-all duration-300 dark:bg-slate-900/50 border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-slate-900 dark:to-slate-800/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardContent className="relative p-6 space-y-8">
                {/* Header Section */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Billing & Subscription</h3>
                    <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
                  </div>
                </div>

                {/* Current Plan */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Current Plan</h4>
                  <div className="p-6 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20 dark:bg-primary/30">
                          <Star className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold">Premium Plan</h5>
                          <p className="text-sm text-muted-foreground">Full access to all features</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Monthly Cost</p>
                        <p className="font-semibold">${billingInfo.amount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Billing</p>
                        <p className="font-semibold">{new Date(billingInfo.nextBilling).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Payment Method</h4>
                  <div className="p-6 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                          <CreditCardIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{billingInfo.paymentMethod.brand} •••• {billingInfo.paymentMethod.last4}</p>
                            <Badge variant="outline" className="text-xs">Default</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Expires {billingInfo.paymentMethod.expiry}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Billing History</h4>
                  <div className="space-y-3">
                    {billingInfo.billingHistory.map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium">Invoice #{index + 1}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(invoice.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold">${invoice.amount}</p>
                          <Badge 
                            variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                            className={invoice.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Plan Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Change Plan</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-left">
                        Upgrade or downgrade your subscription
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">Add Payment Method</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-left">
                        Add a new credit card or payment method
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-medium">Security Settings</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-left">
                        Manage billing security and permissions
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Cancel Subscription</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-left">
                        Cancel your subscription (no refund)
                      </p>
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200/50 dark:border-slate-700/50">
                  <Button 
                    variant="outline"
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
