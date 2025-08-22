# Deployment Guide

This guide covers various deployment options for the Nico Küchler Portfolio website.

## 📋 Table of Contents

- [Pre-deployment Checklist](#pre-deployment-checklist)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## ✅ Pre-deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build completes successfully (`npm run build`)
- [ ] All placeholder content is replaced with real content
- [ ] Images are optimized for web
- [ ] Contact information is updated
- [ ] Social media links are correct
- [ ] SEO meta tags are configured
- [ ] Responsive design tested on multiple devices

## 🔨 Build Process

### Production Build

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Create production build
npm run build

# Test the build locally (optional)
npm run preview
```

The build process creates a `dist/` directory with optimized files ready for deployment.

### Build Output

```
dist/
├── index.html          # Main HTML file
├── assets/            # Optimized JS, CSS, and images
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [image files]
└── [other static files]
```

## 🚀 Deployment Options

### 1. Vercel (Recommended)

**Automatic Deployment:**

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

**Manual Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### 2. Netlify

**Drag & Drop Deployment:**

1. Build the project: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist/` folder to the deployment area

**Git Integration:**

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### 3. GitHub Pages

**Using GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

1. **Create S3 bucket** for static website hosting
2. **Build the project**: `npm run build`
3. **Upload files** from `dist/` to S3 bucket
4. **Configure CloudFront** for global CDN
5. **Set up custom domain** (optional)

## ⚙️ Environment Configuration

### Environment Variables

Create `.env` files for different environments:

**.env.production:**

```env
VITE_API_URL=https://api.nicokuechlerportfolio.com
VITE_CONTACT_EMAIL=nico@example.com
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

**.env.development:**

```env
VITE_API_URL=http://localhost:3000
VITE_CONTACT_EMAIL=dev@example.com
```

### Router Configuration

For single-page applications, configure redirects:

**Netlify (\_redirects file):**

```
/*    /index.html   200
```

**Vercel (vercel.json):**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Apache (.htaccess):**

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🔧 Performance Optimization

### Before Deployment

1. **Image Optimization:**

   ```bash
   # Optimize images (install imagemin-cli)
   npm install -g imagemin-cli
   imagemin src/assets/*.{jpg,png} --out-dir=src/assets/optimized
   ```

2. **Bundle Analysis:**

   ```bash
   # Install bundle analyzer
   npm install --save-dev rollup-plugin-visualizer

   # Analyze bundle
   npm run build -- --analyze
   ```

3. **Performance Audit:**
   ```bash
   # Using Lighthouse CI
   npm install -g @lhci/cli
   lhci autorun
   ```

### Post-deployment Optimization

- **Enable Gzip/Brotli compression** on your server
- **Set proper cache headers** for static assets
- **Configure CDN** for global content delivery
- **Implement service worker** for offline functionality

## 📊 Monitoring and Maintenance

### Analytics Setup

Add Google Analytics to track website performance:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Performance Monitoring

- **Lighthouse CI** for automated performance audits
- **Web Vitals** monitoring
- **Error tracking** with Sentry
- **Uptime monitoring** with services like Pingdom

### Maintenance Tasks

- **Regular dependency updates**
- **Security audits** (`npm audit`)
- **Performance monitoring**
- **Backup strategies**
- **SSL certificate renewal**

## 🔒 Security Considerations

- **HTTPS enforcement**
- **Content Security Policy (CSP) headers**
- **Regular dependency updates**
- **Environment variables protection**
- **Input validation** for contact forms

## 📞 Troubleshooting

### Common Issues

**Build fails:**

- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify all dependencies are installed

**Routing issues:**

- Ensure proper redirect configuration
- Check base URL in Vite config

**Assets not loading:**

- Verify build output paths
- Check server configuration for static files

### Support

For deployment issues:

- Check hosting provider documentation
- Review build logs for errors
- Test locally with `npm run preview`

---

_Last updated: August 2025_
