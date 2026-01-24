# Performance Optimizations

This document describes the performance optimizations implemented in the portfolio site and recommendations for further improvements.

## Implemented Optimizations

### 1. Image Optimization ✅

- **Next/Image Component**: Using `next/image` for all images with:
  - Lazy loading by default
  - Automatic format conversion (AVIF, WebP)
  - Responsive sizing with device sizes
  - Width and height specified for preventing layout shift

**Configuration in `next.config.ts`:**
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### 2. Font Optimization ✅

- **next/font/google**: Using `next/font/google` for automatic font optimization
  - Self-hosted fonts (no external request)
  - Font subset optimization
  - Automatic preloading
  - Zero layout shift (FOUT prevention)

**Fonts Used:**
- `Inter` (Latin subset)
- `Noto Sans JP` (Latin subset, for Japanese characters)

### 3. Code Splitting ✅

- **Dynamic Imports**: Heavy components loaded dynamically with `next/dynamic`:
  - `LiquidCursor` (SSR disabled, not loaded on initial render)
  - `GiscusComments` (Lazy loading with skeleton state)

**Benefits:**
- Smaller initial bundle size
- Faster initial page load
- Components loaded only when needed

### 4. Package Import Optimization ✅

- **optimizePackageImports**: Automatically tree-shakes imports from:
  - `lucide-react` (icons)
  - `framer-motion` (animations)

**Configuration in `next.config.ts`:**
```typescript
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```

### 5. Production Settings ✅

- **Compression**: Gzip compression enabled
- **Powered By Header**: Removed to reduce header size
- **Turbopack**: Enabled by default in Next.js 16 for faster builds

### 6. Giscus Comments ✅

- **Lazy Loading**: Giscus component has `loading="lazy"` attribute
- Loads only when scrolled into view

## Performance Metrics (Targets)

| Metric | Target | Status |
|---------|---------|--------|
| Largest Contentful Paint (LCP) | < 2.5s | 🟡 Good |
| First Input Delay (FID) | < 100ms | 🟢 Excellent |
| Cumulative Layout Shift (CLS) | < 0.1 | 🟢 Excellent |
| Total Blocking Time (TBT) | < 300ms | 🟡 Good |
| First Contentful Paint (FCP) | < 1.8s | 🟡 Good |

## Recommendations for Further Optimization

### High Priority

1. **Image Preloading for Above-the-Fold Images**
   ```typescript
   // In page components
   <Link href="/blog" prefetch={true}>
   ```

2. **Critical CSS Inlining**
   - Extract critical CSS from Tailwind
   - Inline critical CSS in page
   - Load rest asynchronously

3. **Add Preload Hints for Critical Resources**
   ```html
   <link rel="preload" href="/fonts/..." as="font" />
   ```

### Medium Priority

4. **Service Worker for Caching**
   - Implement service worker for offline support
   - Cache static assets
   - Cache API responses

5. **Bundle Analysis**
   ```bash
   npm run build
   npm run build:analyze
   ```
   - Identify large bundles
   - Optimize or split them further

6. **Reduce Third-Party Scripts**
   - Giscus: Consider defer loading
   - Analytics: Ensure async loading

### Low Priority

7. **HTTP/2 Push**
   - Server configuration
   - Push critical resources early

8. **Edge Runtime for API Routes**
   - Use `export const runtime = 'edge'` for API routes
   - Reduces cold start time

9. **Image CDNs**
   - Consider using CDN for images
   - Automatic optimization and caching

## Monitoring

### Tools for Performance Monitoring

1. **Lighthouse** (Chrome DevTools)
   - Run regularly to catch regressions
   - Focus on Core Web Vitals

2. **WebPageTest**
   - https://www.webpagetest.org/
   - Detailed waterfall charts

3. **Vercel Analytics**
   - Built-in performance monitoring
   - Real-user monitoring (RUM)

4. **Google Analytics**
   - Track Core Web Vitals
   - Set up custom dashboards

## Build Optimization Tips

### Reduce Bundle Size

1. **Analyze Dependencies**
   ```bash
   npx next-bundle-analyzer
   ```

2. **Replace Heavy Libraries**
   - Consider lighter alternatives
   - Use tree-shakeable packages

3. **Dynamic Imports for Large Components**
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'))
   ```

### Reduce Build Time

1. **Cache Dependencies**
   - Turbopack caches builds automatically
   - Keep node_modules between builds

2. **Parallel Builds**
   - Next.js automatically parallelizes
   - Use multi-core CI/CD

## Testing Performance

### Before Deploying

1. **Run Lighthouse**
   ```bash
   npm run build
   npm run start
   # Open Chrome DevTools > Lighthouse
   ```

2. **Test on Slow Networks**
   - Chrome DevTools > Network > Throttling
   - Select "Slow 3G"

3. **Test on Real Devices**
   - Mobile (iOS Safari, Chrome)
   - Desktop (Chrome, Firefox, Safari)

4. **Test with Real Data**
   - Use production data size
   - Test with many blog posts

## Maintenance

### Regular Performance Checks

- **Weekly**: Run Lighthouse on key pages
- **Monthly**: Review bundle sizes
- **Quarterly**: Full performance audit

### Performance Budgets

Set budgets in `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  // ...other config
  experimental: {
    scrollRestoration: true,
  },
}
```

### Monitoring Alerts

Set up alerts for:
- LCP > 2.5s
- CLS > 0.1
- TBT > 300ms

## Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev](https://web.dev/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Image Optimization](https://nextjs.org/docs/app/api-reference/next/image)
- [Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
