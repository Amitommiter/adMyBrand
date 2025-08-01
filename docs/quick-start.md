# Quick Start Guide

Get the ADmyBRAND Dashboard up and running in under 5 minutes. This guide covers the essential steps to start developing with the project.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** for version control

### Check Your Setup

```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check npm version
npm --version   # Should be >= 8.0.0

# Check Git version
git --version   # Any recent version
```

## 📥 Installation

### 1. Clone the Repository

```bash
# Clone the repository
git clone <your-repo-url>
cd admybrand-dashboard

# Or if you have the project locally, navigate to it
cd /path/to/admybrand-dashboard
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev
```

### 4. Open Your Browser

Navigate to [https://admybrand-blond.vercel.app/](https://admybrand-blond.vercel.app/) to see the dashboard in action.

## 🎯 What You'll See

After starting the development server, you'll see:

> **💡 Live Demo**: You can also view the live dashboard at [https://admybrand-blond.vercel.app/](https://admybrand-blond.vercel.app/) without setting up locally.

- **Dashboard Overview**: Main page with KPIs and charts
- **Navigation**: Sidebar with links to different sections
- **Theme Toggle**: Dark/light mode switch
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📁 Project Structure Overview

```
admybrand-dashboard/
├── app/                    # Pages and API routes
│   ├── page.tsx           # Home dashboard
│   ├── reports/           # Reports page
│   └── setting/           # Settings page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── charts/           # Chart components
│   └── layouts/          # Layout components
└── lib/                  # Utilities and config
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

## 🎨 Key Features to Explore

### 1. **Dashboard Overview** (`/`)
- Real-time KPIs (Revenue, Users, Conversions, Growth)
- Interactive charts (Line, Bar, Pie)
- User data table with search and filtering
- Global search functionality

### 2. **Reports Page** (`/reports`)
- Campaign performance analytics
- Revenue trends visualization
- Channel performance comparison
- Conversion funnel analysis

### 3. **Settings Page** (`/setting`)
- User profile management
- Notification preferences
- Theme and layout settings
- Billing information

### 4. **Global Features**
- Dark/light theme toggle
- Responsive design
- Global search
- Error handling

## 🛠️ Development Workflow

### Making Changes

1. **Edit Components**: Modify files in `/components`
2. **Update Pages**: Edit files in `/app`
3. **Add API Routes**: Create new files in `/app/api`
4. **Update Styles**: Modify Tailwind classes or CSS

### Hot Reload

The development server includes hot reload, so changes will appear immediately in your browser.

### TypeScript

The project uses TypeScript for type safety. You'll see type errors in your terminal and IDE.

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# If port 3000 is busy, use a different port
npm run dev -- -p 3001
```

#### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Fix auto-fixable issues
npm run lint -- --fix
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Getting Help

- **Check the console**: Browser and terminal for error messages
- **Review logs**: Development server output
- **TypeScript errors**: Check terminal for type issues
- **Documentation**: Refer to other docs in `/docs`

## 📚 Next Steps

Now that you have the project running, explore:

1. **[Project Structure](./project-structure.md)** - Understand the codebase organization
2. **[Component Architecture](./components.md)** - Learn about the component system
3. **[API Documentation](./api.md)** - Explore the backend API
4. **[Features Documentation](./features/dashboard.md)** - Deep dive into features
5. **[Deployment Guide](./deployment.md)** - Deploy to production

## 🎉 You're Ready!

You now have a fully functional development environment for the ADmyBRAND Dashboard. Start exploring the codebase, making changes, and building new features!

---

**Need Help?** Check the [Troubleshooting Guide](./development/troubleshooting.md) or [Project Structure](./project-structure.md) 