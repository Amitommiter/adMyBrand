# Project Structure

This document provides a comprehensive overview of the ADmyBRAND Dashboard codebase structure, explaining the organization of files, directories, and the reasoning behind the architecture decisions.

## 📁 Root Directory Structure

```
admybrand-dashboard/
├── app/                    # Next.js App Router (Pages & API Routes)
├── components/             # Reusable React Components
├── lib/                    # Utility Functions & Configuration
├── public/                 # Static Assets
├── docs/                   # Project Documentation
├── constants/              # Application Constants
├── data/                   # Mock Data & Static Data
├── .next/                  # Next.js Build Output (auto-generated)
├── node_modules/           # Dependencies (auto-generated)
├── package.json            # Project Configuration
├── next.config.ts          # Next.js Configuration
├── tsconfig.json           # TypeScript Configuration
├── tailwind.config.js      # Tailwind CSS Configuration
├── vercel.json             # Vercel Deployment Configuration
└── README.md               # Project Overview
```

## 🗂️ Detailed Directory Breakdown

### `/app` - Next.js App Router

The `app` directory follows Next.js 15 App Router conventions, providing a file-system based routing system.

```
app/
├── layout.tsx              # Root layout component
├── page.tsx                # Home page (Dashboard)
├── error.tsx               # Global error boundary
├── loading.tsx             # Global loading component
├── not-found.tsx           # 404 page component
├── globals.css             # Global styles
├── favicon.ico             # Site favicon
├── api/                    # API Routes
│   ├── config/
│   │   └── route.ts        # Configuration API
│   ├── users/
│   │   └── route.ts        # Users API
│   ├── settings/
│   │   └── route.ts        # Settings API
│   └── report/
│       ├── summary/
│       │   └── route.ts    # Report summary API
│       └── analytics/
│           └── route.ts    # Analytics data API
├── reports/
│   └── page.tsx            # Reports page
└── setting/
    └── page.tsx            # Settings page
```

**Key Files:**
- **`layout.tsx`**: Root layout with theme providers and global context
- **`page.tsx`**: Main dashboard page with KPIs and charts
- **`error.tsx`**: Global error handling component
- **`loading.tsx`**: Loading states for better UX
- **`not-found.tsx`**: Custom 404 page

### `/components` - React Components

Organized by functionality and reusability, following a component-driven architecture.

```
components/
├── ui/                     # Base UI Components (shadcn/ui)
│   ├── button.tsx          # Button component
│   ├── card.tsx            # Card component
│   ├── input.tsx           # Input component
│   ├── select.tsx          # Select component
│   ├── table.tsx           # Table component
│   ├── tabs.tsx            # Tabs component
│   ├── avatar.tsx          # Avatar component
│   ├── badge.tsx           # Badge component
│   ├── dropdown-menu.tsx   # Dropdown menu component
│   ├── label.tsx           # Label component
│   ├── switch.tsx          # Switch component
│   └── index.ts            # Component exports
├── charts/                 # Chart Components
│   ├── LineChartCard.tsx   # Line chart component
│   ├── BarChartCard.tsx    # Bar chart component
│   └── PieChartCard.tsx    # Pie chart component
├── cards/                  # Card Components
│   └── KpiCard.tsx         # KPI display card
├── tables/                 # Table Components
│   ├── DataTable.tsx       # Generic data table
│   └── columns.ts          # Table column definitions
├── reports/                # Report-specific Components
│   ├── CampaignTable.tsx   # Campaign data table
│   ├── RevenueChart.tsx    # Revenue visualization
│   ├── ChannelChart.tsx    # Channel performance chart
│   └── ConversionFunnelTable.tsx # Conversion funnel
├── layouts/                # Layout Components
│   └── DashboardLayout.tsx # Main dashboard layout
├── context/                # React Context Providers
│   ├── ThemeContext.tsx    # Theme management
│   └── LayoutContext.tsx   # Layout preferences
├── utils/                  # Utility Components
│   └── SearchProvider.tsx  # Global search functionality
├── theme-provider.tsx      # Theme provider wrapper
└── ThemeToggle.tsx         # Theme toggle component
```

**Component Categories:**
- **UI Components**: Reusable base components (shadcn/ui)
- **Feature Components**: Specific to dashboard features
- **Layout Components**: Page structure and navigation
- **Context Components**: State management and providers

### `/lib` - Utilities & Configuration

Core utilities, configurations, and helper functions.

```
lib/
├── config.ts               # Application configuration
├── utils.ts                # Utility functions
└── types.ts                # TypeScript type definitions
```

**Key Files:**
- **`config.ts`**: Central configuration management with default data
- **`utils.ts`**: Helper functions for common operations
- **types.ts**: Shared TypeScript interfaces and types

### `/public` - Static Assets

Static files served directly by the web server.

```
public/
├── images/                 # Image assets
├── icons/                  # Icon files
└── fonts/                  # Custom fonts (if any)
```

### `/docs` - Documentation

Comprehensive project documentation.

```
docs/
├── README.md               # Documentation index
├── overview.md             # Project overview
├── quick-start.md          # Quick start guide
├── installation.md         # Installation instructions
├── project-structure.md    # This file
├── components.md           # Component documentation
├── api.md                  # API documentation
├── deployment.md           # Deployment guide
├── features/               # Feature documentation
│   ├── dashboard.md        # Dashboard features
│   ├── analytics.md        # Analytics features
│   ├── users.md            # User management
│   └── settings.md         # Settings features
├── development/            # Development guides
│   ├── workflow.md         # Development workflow
│   ├── standards.md        # Coding standards
│   ├── testing.md          # Testing strategy
│   └── troubleshooting.md  # Common issues
└── api/                    # API documentation
    ├── endpoints.md        # API endpoints
    ├── models.md           # Data models
    └── errors.md           # Error handling
```

## 🏗️ Architecture Patterns

### 1. **App Router Structure**
- **File-based Routing**: Each folder represents a route
- **Layout Nesting**: Shared layouts for consistent UI
- **Server Components**: Default server-side rendering
- **Client Components**: Marked with `'use client'` directive

### 2. **Component Organization**
- **Atomic Design**: UI components follow atomic design principles
- **Feature-based**: Components grouped by feature/domain
- **Reusability**: Shared components in `/ui` directory
- **Composition**: Components designed for composition

### 3. **State Management**
- **React Context**: Global state (theme, layout preferences)
- **Local State**: Component-specific state with useState
- **Server State**: API data fetching with useEffect
- **Configuration**: Centralized config management

### 4. **Type Safety**
- **TypeScript**: Full type safety throughout the application
- **Interface Definitions**: Clear contracts for data structures
- **Type Guards**: Runtime type checking where needed
- **Generic Types**: Reusable type definitions

## 📋 File Naming Conventions

### Components
- **PascalCase**: `KpiCard.tsx`, `DashboardLayout.tsx`
- **Descriptive Names**: Clear, purpose-indicating names
- **Consistent Suffixes**: `.tsx` for React components

### Utilities & Config
- **camelCase**: `config.ts`, `utils.ts`
- **Descriptive Names**: Function and purpose clear from name
- **Grouped by Domain**: Related functionality together

### Pages & Routes
- **kebab-case**: `project-structure.md`, `quick-start.md`
- **Descriptive URLs**: SEO-friendly and user-friendly
- **Consistent Structure**: Similar pages follow same pattern

## 🔧 Configuration Files

### Root Level Configs
- **`package.json`**: Dependencies, scripts, and project metadata
- **`next.config.ts`**: Next.js configuration and optimizations
- **`tsconfig.json`**: TypeScript compiler options
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`vercel.json`**: Vercel deployment settings

### Environment Configuration
- **`.env.local`**: Local environment variables (gitignored)
- **`.env.example`**: Example environment variables
- **Environment-specific**: Different configs for dev/staging/prod

## 🚀 Build & Deployment Structure

### Development
```
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Production
- **Static Generation**: Pre-rendered pages for performance
- **API Routes**: Serverless functions for dynamic content
- **Image Optimization**: Automatic image processing
- **Code Splitting**: Automatic bundle optimization

## 📊 Data Flow Architecture

```
User Action → Component → Context/State → API Route → Database
     ↓              ↓           ↓           ↓          ↓
UI Update ← Component ← Context/State ← API Response ← Data
```

### Data Layers
1. **Presentation Layer**: React components and UI
2. **State Layer**: React Context and local state
3. **API Layer**: Next.js API routes
4. **Data Layer**: Database and external services

## 🔍 Key Design Decisions

### 1. **Next.js App Router**
- **Modern Architecture**: Latest Next.js features
- **Performance**: Built-in optimizations
- **Developer Experience**: Excellent DX with TypeScript

### 2. **Component Library**
- **shadcn/ui**: High-quality, accessible components
- **Custom Components**: Domain-specific functionality
- **Consistency**: Unified design system

### 3. **TypeScript First**
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support
- **Maintainability**: Self-documenting code

### 4. **Responsive Design**
- **Mobile First**: Mobile-optimized approach
- **Tailwind CSS**: Utility-first styling
- **Accessibility**: WCAG compliant components

---

**Next Steps**: [Component Architecture](./components.md) | [API Documentation](./api.md) 