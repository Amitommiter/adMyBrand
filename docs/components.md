# Component Architecture

This document provides a comprehensive overview of the component system in ADmyBRAND Dashboard, including design patterns, component categories, and usage guidelines.

## 🏗️ Component Architecture Overview

The component system follows a hierarchical structure based on **Atomic Design** principles, combined with **feature-based organization** for better maintainability and scalability.

```
Components/
├── ui/                     # Atomic Components (shadcn/ui)
├── charts/                 # Data Visualization
├── cards/                  # Content Containers
├── tables/                 # Data Display
├── reports/                # Feature-specific
├── layouts/                # Page Structure
├── context/                # State Management
└── utils/                  # Utility Components
```

## 🎨 Design System

### Component Categories

#### 1. **UI Components** (`/components/ui/`)
Base components built on shadcn/ui, providing the foundation for all other components.

```typescript
// Example: Button component usage
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">
  Click me
</Button>
```

**Available Components:**
- `Button` - Interactive buttons with variants
- `Card` - Content containers with headers and content
- `Input` - Form input fields
- `Select` - Dropdown selection components
- `Table` - Data table components
- `Tabs` - Tabbed interface components
- `Avatar` - User avatar display
- `Badge` - Status and label indicators
- `Switch` - Toggle components
- `Label` - Form labels

#### 2. **Chart Components** (`/components/charts/`)
Data visualization components using Recharts library.

```typescript
// Example: LineChartCard usage
import LineChartCard from "@/components/charts/LineChartCard"

<LineChartCard />
```

**Available Components:**
- `LineChartCard` - Time series data visualization
- `BarChartCard` - Categorical data comparison
- `PieChartCard` - Proportional data representation

#### 3. **Card Components** (`/components/cards/`)
Specialized content containers for specific use cases.

```typescript
// Example: KpiCard usage
import KpiCard from "@/components/cards/KpiCard"

<KpiCard
  title="Revenue"
  value="$24,500"
  icon={DollarSign}
  trend="+12.3%"
/>
```

**Available Components:**
- `KpiCard` - Key Performance Indicator display

#### 4. **Table Components** (`/components/tables/`)
Data display and management components.

```typescript
// Example: DataTable usage
import { DataTable } from "@/components/tables/DataTable"

<DataTable columns={columns} data={data} />
```

**Available Components:**
- `DataTable` - Generic data table with sorting/filtering
- `columns.ts` - Column definitions for tables

#### 5. **Report Components** (`/components/reports/`)
Feature-specific components for the reports section.

```typescript
// Example: CampaignTable usage
import CampaignTable from "@/components/reports/CampaignTable"

<CampaignTable data={campaignData} isLoading={false} />
```

**Available Components:**
- `CampaignTable` - Campaign performance data
- `RevenueChart` - Revenue visualization
- `ChannelChart` - Channel performance comparison
- `ConversionFunnelTable` - Conversion funnel analysis

#### 6. **Layout Components** (`/components/layouts/`)
Page structure and navigation components.

```typescript
// Example: DashboardLayout usage
import { DashboardLayout } from "@/components/layouts/DashboardLayout"

<DashboardLayout>
  {children}
</DashboardLayout>
```

**Available Components:**
- `DashboardLayout` - Main application layout with sidebar

#### 7. **Context Components** (`/components/context/`)
State management and global context providers.

```typescript
// Example: ThemeContext usage
import { useTheme } from "@/components/context/ThemeContext"

const { theme, setTheme } = useTheme()
```

**Available Components:**
- `ThemeContext` - Theme management (dark/light mode)
- `LayoutContext` - Layout preferences and settings

#### 8. **Utility Components** (`/components/utils/`)
Helper components for common functionality.

```typescript
// Example: SearchProvider usage
import { SearchProvider } from "@/components/utils/SearchProvider"

<SearchProvider>
  {children}
</SearchProvider>
```

**Available Components:**
- `SearchProvider` - Global search functionality

## 🔧 Component Patterns

### 1. **Composition Pattern**
Components are designed for composition, allowing flexible combinations.

```typescript
// Example: Card composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>
```

### 2. **Props Interface Pattern**
All components use TypeScript interfaces for prop definitions.

```typescript
interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: string
  isLoading?: boolean
}
```

### 3. **Default Props Pattern**
Components provide sensible defaults for optional props.

```typescript
const KpiCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  isLoading = false 
}: KpiCardProps) => {
  // Component implementation
}
```

### 4. **Loading States Pattern**
Components handle loading states gracefully.

```typescript
if (isLoading) {
  return (
    <Card className="animate-pulse">
      <CardContent>
        <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </CardContent>
    </Card>
  )
}
```

### 5. **Error Boundaries Pattern**
Components are wrapped with error boundaries for graceful error handling.

```typescript
// In app/error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Error handling implementation
}
```

## 🎨 Styling Patterns

### 1. **Tailwind CSS Classes**
All styling uses Tailwind CSS utility classes.

```typescript
// Example: Responsive design with Tailwind
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card className="p-4 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      Title
    </h3>
  </Card>
</div>
```

### 2. **Dark Mode Support**
All components support dark mode through CSS variables.

```typescript
// Example: Dark mode classes
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
  Content
</div>
```

### 3. **Responsive Design**
Components are mobile-first and responsive.

```typescript
// Example: Responsive sizing
<div className="text-sm sm:text-base lg:text-lg">
  Responsive text
</div>
```

### 4. **Animation Classes**
Smooth transitions and animations for better UX.

```typescript
// Example: Hover animations
<Card className="transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
  Content
</Card>
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Base styles for mobile devices
- **Tablet**: `sm:` prefix (640px+)
- **Desktop**: `lg:` prefix (1024px+)
- **Large Desktop**: `xl:` prefix (1280px+)

### Responsive Patterns

#### 1. **Grid Layouts**
```typescript
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</div>
```

#### 2. **Flexible Typography**
```typescript
// Responsive text sizing
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
```

#### 3. **Adaptive Spacing**
```typescript
// Responsive padding/margins
<div className="p-4 sm:p-6 lg:p-8">
  Content with adaptive spacing
</div>
```

## ♿ Accessibility Features

### 1. **ARIA Labels**
Components include proper ARIA labels for screen readers.

```typescript
// Example: Accessible button
<Button
  aria-label="Toggle dark mode"
  onClick={toggleTheme}
>
  <Moon className="w-4 h-4" />
</Button>
```

### 2. **Keyboard Navigation**
All interactive components support keyboard navigation.

```typescript
// Example: Keyboard accessible dropdown
<Select onKeyDown={handleKeyDown}>
  <SelectTrigger tabIndex={0}>
    <SelectValue />
  </SelectTrigger>
</Select>
```

### 3. **Focus Management**
Proper focus indicators and management.

```typescript
// Example: Focus styles
<Button className="focus:ring-2 focus:ring-primary focus:outline-none">
  Accessible Button
</Button>
```

## 🔄 State Management

### 1. **Local State**
Component-specific state using React hooks.

```typescript
const [isLoading, setIsLoading] = useState(false)
const [data, setData] = useState<Data[]>([])
```

### 2. **Context State**
Global state management using React Context.

```typescript
// Theme context
const { theme, setTheme } = useTheme()

// Layout context
const { compactLayout, setCompactLayout } = useLayoutContext()
```

### 3. **Server State**
API data fetching and caching.

```typescript
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  fetchData()
}, [])
```

## 🧪 Testing Strategy

### 1. **Component Testing**
Each component should be tested for:
- Rendering without errors
- Props handling
- User interactions
- Accessibility features

### 2. **Integration Testing**
Test component interactions and data flow.

### 3. **Visual Testing**
Ensure components look correct across different screen sizes.

## 📋 Component Guidelines

### 1. **Naming Conventions**
- **PascalCase** for component names: `KpiCard.tsx`
- **camelCase** for props and variables
- **Descriptive names** that indicate purpose

### 2. **File Organization**
- One component per file
- Related components in the same directory
- Index files for clean imports

### 3. **Props Design**
- Use TypeScript interfaces for prop definitions
- Provide sensible defaults for optional props
- Keep props focused and specific

### 4. **Error Handling**
- Include error boundaries where appropriate
- Provide fallback UI for error states
- Log errors for debugging

### 5. **Performance**
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Optimize re-renders with useCallback and useMemo

## 🔧 Development Workflow

### 1. **Creating New Components**
```bash
# Create component file
touch components/NewComponent.tsx

# Add TypeScript interface
interface NewComponentProps {
  // Define props
}

# Implement component
export default function NewComponent({ prop }: NewComponentProps) {
  // Component implementation
}
```

### 2. **Component Testing**
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### 3. **Component Documentation**
- Add JSDoc comments for complex components
- Include usage examples
- Document prop interfaces

---

**Next Steps**: [API Documentation](./api.md) | [Features Documentation](./features/dashboard.md) 