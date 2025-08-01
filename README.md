# ADmyBRAND Dashboard

A modern, responsive analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 📊 **Analytics Dashboard** - Real-time KPIs and metrics
- 📈 **Interactive Charts** - Revenue trends, channel performance, and conversion funnels
- 👥 **User Management** - User table with search and filtering
- ⚙️ **Settings Panel** - Profile, notifications, preferences, and billing
- 🎨 **Dark/Light Mode** - Theme switching with system preference detection
- 📱 **Responsive Design** - Optimized for all device sizes
- 🔍 **Global Search** - Search across all dashboard sections

## Tech Stack

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Custom components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd admybrand-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

### Automatic Deployment (Recommended)

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository

2. **Configure project settings**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Confirm deployment settings
   - Wait for build and deployment

### Environment Variables (Optional)

If you need to add environment variables:

1. **In Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add any required variables

2. **Local Development**
   - Create a `.env.local` file
   - Add your environment variables

### Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Project Structure

```
admybrand-dashboard/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── reports/           # Reports page
│   └── setting/           # Settings page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── charts/           # Chart components
│   ├── cards/            # Card components
│   └── layouts/          # Layout components
├── lib/                  # Utilities and config
├── public/               # Static assets
└── vercel.json           # Vercel configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Performance Optimizations

- ✅ **Image Optimization** - Next.js Image component with WebP/AVIF
- ✅ **Code Splitting** - Automatic route-based code splitting
- ✅ **Bundle Optimization** - Tree shaking and minification
- ✅ **Caching** - Static generation and ISR
- ✅ **Security Headers** - XSS protection and content security

## Troubleshooting

### Build Issues

1. **Clear cache and reinstall**
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   ```

2. **Check Node.js version**
   ```bash
   node --version
   # Should be >= 18.0.0
   ```

### Deployment Issues

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Check for TypeScript errors** locally first

### Performance Issues

1. **Analyze bundle size**
   ```bash
   npm run build
   # Check the build output for bundle analysis
   ```

2. **Optimize images** - Use Next.js Image component
3. **Lazy load components** - Use dynamic imports

## Support

For issues and questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Vercel deployment docs](https://vercel.com/docs)
- Open an issue in the repository

## License

This project is licensed under the MIT License.
