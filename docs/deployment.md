# Deployment Guide

This comprehensive guide covers deploying the ADmyBRAND Dashboard to production, including setup, configuration, monitoring, and maintenance.

## 🚀 Deployment Options

### 1. **Vercel (Recommended)**
- **Pros**: Zero-config deployment, automatic scaling, built-in analytics
- **Cons**: Vendor lock-in, limited customization
- **Best for**: Most use cases, rapid deployment

### 2. **Netlify**
- **Pros**: Similar to Vercel, good for static sites
- **Cons**: Limited server-side features
- **Best for**: Static deployments

### 3. **AWS/GCP/Azure**
- **Pros**: Full control, enterprise features
- **Cons**: Complex setup, higher costs
- **Best for**: Enterprise deployments

### 4. **Self-hosted**
- **Pros**: Complete control, no vendor lock-in
- **Cons**: Maintenance overhead, security responsibility
- **Best for**: On-premise deployments

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] Build passes successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] All tests passing
- [ ] No console errors or warnings

### ✅ Configuration
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Database connections verified
- [ ] External services configured

### ✅ Performance
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Core Web Vitals in "Good" range
- [ ] Loading times acceptable

### ✅ Security
- [ ] Environment variables secured
- [ ] API endpoints protected
- [ ] CORS configured properly
- [ ] Security headers implemented

## 🎯 Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. **Visit Vercel**: Go to [vercel.com](https://vercel.com)
2. **Sign Up/Login**: Use your GitHub account
3. **Create Project**: Click "New Project"
4. **Import Repository**: Select your dashboard repository
5. **Configure Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 3: Environment Variables

In Vercel dashboard, go to **Project Settings → Environment Variables**:

```bash
# Required Variables
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app

# Optional Variables
CUSTOM_KEY=your_custom_key_here
DATABASE_URL=your_database_url_here
API_KEY=your_api_key_here
```

### Step 4: Deploy

1. **Click "Deploy"**
2. **Wait for Build**: Monitor the build process
3. **Verify Deployment**: Check the live URL
4. **Test Functionality**: Verify all features work

### Step 5: Custom Domain (Optional)

1. **Go to Domains**: Project Settings → Domains
2. **Add Domain**: Enter your custom domain
3. **Configure DNS**: Follow Vercel's DNS instructions
4. **Verify SSL**: Automatic SSL certificate

## 🔧 Environment Configuration

### Development Environment

Create `.env.local` for local development:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
CUSTOM_KEY=dev_key_here
DATABASE_URL=your_dev_database_url
```

### Production Environment

Configure in your deployment platform:

```bash
# Production Environment Variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
CUSTOM_KEY=prod_key_here
DATABASE_URL=your_prod_database_url
NODE_ENV=production
```

### Environment-Specific Configs

```typescript
// lib/config.ts
const config = {
  apiUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
  customKey: process.env.CUSTOM_KEY,
}
```

## 📊 Performance Optimization

### 1. **Build Optimization**

```typescript
// next.config.ts
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}
```

### 2. **Caching Strategy**

```typescript
// API route caching
export async function GET() {
  const headers = {
    'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
  }
  
  return NextResponse.json(data, { headers })
}
```

### 3. **CDN Configuration**

- **Vercel**: Automatic CDN
- **Custom**: Configure CDN for static assets
- **Images**: Use Next.js Image optimization

## 🔒 Security Configuration

### 1. **Security Headers**

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### 2. **Environment Variable Security**

- **Never commit secrets**: Use `.env.local` and platform variables
- **Rotate keys regularly**: Update API keys and secrets
- **Limit access**: Restrict who can access environment variables

### 3. **API Security**

```typescript
// API route protection
export async function POST(request: Request) {
  // Validate request origin
  const origin = request.headers.get('origin')
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  
  // Rate limiting (implement as needed)
  // Authentication (implement as needed)
}
```

## 📈 Monitoring & Analytics

### 1. **Vercel Analytics**

Enable in Vercel dashboard:
1. **Go to Analytics**: Project → Analytics
2. **Enable Analytics**: Turn on web analytics
3. **Configure Events**: Set up custom events
4. **Monitor Performance**: Track Core Web Vitals

### 2. **Error Monitoring**

```typescript
// Error boundary with monitoring
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error)
    // Send to error tracking service (Sentry, etc.)
  }, [error])

  return (
    // Error UI
  )
}
```

### 3. **Performance Monitoring**

```typescript
// Performance monitoring
export function reportWebVitals(metric: any) {
  // Send to analytics service
  console.log(metric)
  
  // Example: Send to Google Analytics
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}
```

## 🔄 Continuous Deployment

### 1. **Automatic Deployments**

Vercel automatically deploys on:
- **Push to main**: Production deployment
- **Pull requests**: Preview deployments
- **Branch pushes**: Branch-specific deployments

### 2. **Deployment Pipeline**

```yaml
# Example: GitHub Actions (if needed)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      # Deploy to Vercel
```

### 3. **Rollback Strategy**

- **Vercel**: Automatic rollback on build failure
- **Manual rollback**: Revert to previous deployment
- **Database rollback**: Backup and restore if needed

## 🛠️ Maintenance

### 1. **Regular Updates**

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Update to latest Next.js
npm install next@latest react@latest react-dom@latest
```

### 2. **Database Maintenance**

- **Backups**: Regular database backups
- **Migrations**: Safe database schema updates
- **Monitoring**: Database performance monitoring

### 3. **Performance Monitoring**

- **Core Web Vitals**: Monitor regularly
- **Error Rates**: Track and fix issues
- **User Experience**: Gather feedback

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Environment Variables
- **Check spelling**: Ensure variable names match
- **Restart deployment**: Redeploy after adding variables
- **Check scope**: Ensure variables are set for correct environment

#### Performance Issues
- **Analyze bundle**: Check bundle size
- **Optimize images**: Use Next.js Image component
- **Enable caching**: Implement proper caching

#### API Issues
- **Check endpoints**: Verify API routes work
- **Test locally**: Ensure APIs work in development
- **Check CORS**: Verify cross-origin requests

### Getting Help

1. **Check logs**: Vercel deployment logs
2. **Review documentation**: This guide and Next.js docs
3. **Community support**: GitHub discussions
4. **Professional support**: Contact for enterprise issues

## 📊 Post-Deployment Checklist

### ✅ Functionality
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Forms submit successfully
- [ ] API endpoints respond
- [ ] Charts render correctly

### ✅ Performance
- [ ] Page load times < 3 seconds
- [ ] Core Web Vitals in "Good" range
- [ ] Images load properly
- [ ] No console errors

### ✅ Security
- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] Environment variables secured
- [ ] No sensitive data exposed

### ✅ Monitoring
- [ ] Analytics tracking enabled
- [ ] Error monitoring configured
- [ ] Performance monitoring active
- [ ] Alerts set up

## 🎉 Success!

Your ADmyBRAND Dashboard is now live in production! 

### Next Steps:
1. **Monitor performance** and user feedback
2. **Set up alerts** for critical issues
3. **Plan regular updates** and maintenance
4. **Scale as needed** based on usage

---

**Need Help?** Check the [Troubleshooting Guide](./development/troubleshooting.md) or [API Documentation](./api.md) 