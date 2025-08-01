# API Documentation

This document provides comprehensive documentation for the ADmyBRAND Dashboard API endpoints, data models, and integration patterns.

## 🏗️ API Architecture

The API is built using Next.js API Routes, providing a RESTful interface for the dashboard. All endpoints are TypeScript-based with proper type safety and error handling.

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

### Response Format
All API responses follow a consistent format:

```typescript
// Success Response
{
  success: true,
  data: any,
  message?: string
}

// Error Response
{
  success: false,
  message: string,
  error?: any
}
```

## 📋 API Endpoints

### 1. **Configuration API**

#### `GET /api/config`
Retrieves application configuration and default data.

**Request:**
```http
GET /api/config
```

**Response:**
```typescript
{
  success: true,
  data: {
    company: {
      name: string,
      logo: string,
      domain: string
    },
    user: User,
    kpis: KpiData[],
    charts: {
      lineChart: ChartData[],
      barChart: ChartData[],
      pieChart: ChartData[]
    },
    notifications: NotificationPreference[],
    billing: BillingInfo,
    settings: {
      languages: Array<{ code: string; name: string }>,
      timezones: Array<{ code: string; name: string }>,
      themes: Array<{ id: string; name: string }>
    },
    analytics: AnalyticsData
  }
}
```

#### `POST /api/config`
Updates application configuration.

**Request:**
```http
POST /api/config
Content-Type: application/json

{
  // Configuration updates
}
```

**Response:**
```typescript
{
  success: true,
  message: "Configuration updated successfully",
  data: any
}
```

### 2. **Users API**

#### `GET /api/users`
Retrieves user data for the dashboard.

**Request:**
```http
GET /api/users
```

**Response:**
```typescript
User[] = [
  {
    id: number,
    name: string,
    email: string,
    role: string,
    plan: string
  }
]
```

### 3. **Settings API**

#### `POST /api/settings`
Updates user settings and preferences.

**Request:**
```http
POST /api/settings
Content-Type: application/json

{
  firstName: string,
  lastName: string,
  email: string
}
```

**Response:**
```typescript
{
  success: true,
  message: "Settings updated successfully"
}
```

### 4. **Reports API**

#### `GET /api/report/summary`
Retrieves summary data for the reports dashboard.

**Request:**
```http
GET /api/report/summary
```

**Response:**
```typescript
{
  totalCampaigns: number,
  impressions: string,
  clicks: string,
  revenue: string
}
```

#### `GET /api/report/analytics`
Retrieves detailed analytics data.

**Request:**
```http
GET /api/report/analytics
```

**Response:**
```typescript
{
  success: true,
  data: {
    campaigns: CampaignData[],
    revenueData: RevenueData[],
    channelData: ChannelData[],
    conversionFunnel: ConversionFunnelData[]
  }
}
```

## 📊 Data Models

### Core Types

#### `User`
```typescript
interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: string
  plan: string
  status: 'active' | 'inactive'
}
```

#### `KpiData`
```typescript
interface KpiData {
  title: string
  value: string
  trend: string
  icon: string
  color: string
}
```

#### `ChartData`
```typescript
interface ChartData {
  name: string
  value?: number
  sales?: number
}
```

### Analytics Types

#### `CampaignData`
```typescript
interface CampaignData {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  startDate: string
  endDate: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roi: number
  channel: string
}
```

#### `RevenueData`
```typescript
interface RevenueData {
  date: string
  revenue: number
  target: number
  growth: number
}
```

#### `ChannelData`
```typescript
interface ChannelData {
  channel: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  conversionRate: number
  cost: number
  roi: number
}
```

#### `ConversionFunnelData`
```typescript
interface ConversionFunnelData {
  stage: string
  visitors: number
  conversions: number
  conversionRate: number
  dropOffRate: number
}
```

### Settings Types

#### `NotificationPreference`
```typescript
interface NotificationPreference {
  id: string
  title: string
  description: string
  enabled: boolean
  category: 'email' | 'system' | 'marketing'
}
```

#### `BillingInfo`
```typescript
interface BillingInfo {
  plan: string
  amount: number
  currency: string
  nextBilling: string
  status: 'active' | 'cancelled' | 'pending'
  paymentMethod: {
    type: string
    brand: string
    last4: string
    expiry: string
  }
  billingHistory: Array<{
    id: string
    date: string
    amount: number
    status: string
  }>
}
```

## 🔧 API Integration Patterns

### 1. **Data Fetching Pattern**

```typescript
// Example: Fetching user data
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    const users = await response.json()
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
```

### 2. **Error Handling Pattern**

```typescript
// Example: API call with error handling
const fetchData = async () => {
  try {
    setIsLoading(true)
    const response = await fetch('/api/data')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    setData(data)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An error occurred')
  } finally {
    setIsLoading(false)
  }
}
```

### 3. **Configuration Service Pattern**

```typescript
// Example: Using the config service
import { configService } from '@/lib/config'

const loadConfig = async () => {
  try {
    const config = await configService.loadConfig()
    setKpis(config.kpis)
    setUser(config.user)
  } catch (error) {
    console.error('Failed to load config:', error)
  }
}
```

## 🔒 Security & Authentication

### 1. **Request Validation**
All API endpoints validate incoming requests:

```typescript
// Example: Request validation
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Process request
    // ...
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    )
  }
}
```

### 2. **Error Handling**
Consistent error responses across all endpoints:

```typescript
// Example: Error response
return NextResponse.json(
  { 
    success: false, 
    message: 'Failed to process request',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  },
  { status: 500 }
)
```

### 3. **CORS Configuration**
API routes are configured for cross-origin requests:

```typescript
// Example: CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

## 📈 Performance Optimization

### 1. **Caching Strategy**
API responses can be cached for better performance:

```typescript
// Example: Cache headers
const headers = {
  'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
}
```

### 2. **Response Compression**
Responses are automatically compressed for faster transmission.

### 3. **Database Optimization**
Ready for database integration with optimized queries.

## 🧪 Testing API Endpoints

### 1. **Manual Testing**
Test endpoints using tools like:
- **Postman**: API testing and documentation
- **cURL**: Command-line testing
- **Browser DevTools**: Network tab for debugging

### 2. **Automated Testing**
```typescript
// Example: API test
describe('Users API', () => {
  it('should return users list', async () => {
    const response = await fetch('/api/users')
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })
})
```

## 🔄 API Versioning

### Current Version: v1
All endpoints are currently v1. Future versions will be prefixed:
- `v1`: Current version
- `v2`: Future version (when needed)

### Migration Strategy
- Backward compatibility maintained
- Deprecation notices for old endpoints
- Gradual migration path for clients

## 📊 Monitoring & Analytics

### 1. **Request Logging**
All API requests are logged for monitoring:

```typescript
// Example: Request logging
console.log(`${new Date().toISOString()} - ${method} ${path} - ${status}`)
```

### 2. **Performance Metrics**
Track response times and error rates.

### 3. **Error Tracking**
Monitor and alert on API errors.

## 🚀 Future API Enhancements

### Planned Features
- **Real-time Updates**: WebSocket support for live data
- **GraphQL**: Alternative to REST for complex queries
- **Rate Limiting**: Protect against abuse
- **Authentication**: JWT-based auth system
- **File Upload**: Support for file uploads
- **Webhooks**: Event-driven integrations

### API Roadmap
1. **Phase 1**: Current REST API (Complete)
2. **Phase 2**: Authentication & Authorization
3. **Phase 3**: Real-time features
4. **Phase 4**: Advanced integrations

## 📚 API Examples

### Complete Integration Example

```typescript
// Example: Complete dashboard data loading
const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        
        // Load configuration
        const configResponse = await fetch('/api/config')
        const config = await configResponse.json()
        
        // Load users
        const usersResponse = await fetch('/api/users')
        const users = await usersResponse.json()
        
        // Load analytics
        const analyticsResponse = await fetch('/api/report/analytics')
        const analytics = await analyticsResponse.json()
        
        setData({
          config: config.data,
          users: users,
          analytics: analytics.data
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {/* Render dashboard with data */}
    </div>
  )
}
```

---

**Next Steps**: [Data Models](./api/models.md) | [Error Handling](./api/errors.md) | [Features Documentation](./features/dashboard.md) 