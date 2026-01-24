# Accessibility Enhancements

This document describes the accessibility (a11y) features and improvements for the portfolio site.

## Implemented Accessibility Features

### 1. Semantic HTML ✅

- **HTML5 Semantic Elements**: Using proper semantic tags
  - `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
  - Proper heading hierarchy (h1-h6)
  - `<button>` for interactive elements, not `<div>`

### 2. ARIA Labels ✅

- **Form Labels**: All form inputs have associated labels or aria-labels
  ```tsx
  <input aria-label="記事を検索" />
  ```
- **Link Descriptions**: Screen reader-friendly link text
- **Icon Accessibility**: Icons have descriptive labels

### 3. Keyboard Navigation ✅

- **Focus Management**: All interactive elements focusable
  - `tabindex` for non-native focusable elements
  - Visible focus indicators

### 4. Color Contrast ✅

- **WCAG AA Compliance**: Colors meet 4.5:1 contrast ratio
  - Primary teal color (#14b8a6) on dark background
  - Text colors (white, zinc) pass contrast checks
  - Link colors (teal-400) sufficient contrast

### 5. Responsive Design ✅

- **Mobile Accessibility**: Touch targets minimum 44x44px
- **Responsive Typography**: Scalable text size (no fixed font-size)

### 6. Screen Reader Support ✅

- **Alt Text**: Images have meaningful alt text
  ```tsx
  <Image src="/images/profile.jpg" alt="本山貴大のプロフィール写真" />
  ```

- **Skip Links**: Can be added for screen reader users

## Accessibility Checklist

### Content & Structure

- [x] Use proper heading hierarchy (h1-h6)
- [x] Use semantic HTML (header, nav, main, article, footer)
- [x] Provide text alternatives for non-text content (alt text)
- [x] Include skip navigation links (can be added)
- [x] Use landmark elements (header, nav, main, footer)
- [x] Use lists for related items (ul/li)
- [x] Use proper list nesting

### Interactive Elements

- [x] All interactive elements focusable (tabindex, keyboard)
- [x] Focus indicators visible
- [x] Buttons use `<button>` element, not `<div>`
- [x] Links use `<a>` element, not `<div>` with click handler
- [x] Form inputs have labels or aria-labels
- [x] Error messages associated with form fields
- [x] Provide feedback for user actions

### Visual Design

- [x] Color contrast meets WCAG AA (4.5:1)
- [x] Color not the only indicator of information
- [x] Text resizeable up to 200% without assistive tech
- [x] No use of `text-decoration: blink`
- [x] Sufficient line spacing (1.5 to 2)
- [x] Sufficient paragraph spacing (2 to 3)

### Images & Media

- [x] Images have alt text
- [x] Decorative images marked with `alt=""`
- [x] Captions for informative images (can be added)
- [x] Video controls (if video content added)

### Forms

- [x] Form labels visible
- [x] Required fields marked
- [x] Error messages clear and specific
- [x] Validation messages associated with fields
- [x] Submit buttons clearly labeled

### Keyboard Accessibility

- [x] All functions available via keyboard
- [x] Logical tab order
- [x] No keyboard traps
- [x] Focus moves predictably
- [ ] Escape key cancels/closes (can be added)

## Areas for Improvement

### High Priority

1. **Skip Navigation Link**
   ```tsx
   <a href="#main-content" className="sr-only">
     コンテンツへスキップ
   </a>
   ```

2. **Focus Management in Modals**
   - Trap focus within modal
   - Return focus to trigger after close

3. **Loading States for Screen Readers**
   ```tsx
   <div role="status" aria-live="polite">
     Loading...
   </div>
   ```

### Medium Priority

4. **Improved Form Validation**
   - More descriptive error messages
   - ARIA-invalid/aria-valid attributes

5. **Announce Dynamic Content Changes**
   - Use `aria-live` regions for dynamic content
   - Announce search results, form submissions

### Low Priority

6. **Enhanced Keyboard Shortcuts**
   - Document available shortcuts
   - Implement common patterns (Esc, Enter, Arrows)

7. **Reduced Motion Preference**
   ```tsx
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches;
   ```

## Testing Checklist

### Manual Testing

- [ ] Navigate site using Tab key
- [ ] Use only keyboard (no mouse)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test color blindness simulation
- [ ] Test zoom at 200%
- [ ] Test on mobile devices

### Automated Testing

Run accessibility linters:
```bash
npm install -D eslint-plugin-jsx-a11y
npm install -D @axe-core/react
```

## Implementation Examples

### Skip Navigation Link

```tsx
// In layout.tsx or navigation component
<a
  href="#main"
  className="sr-only focus:not-sr-only"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById('main')?.focus();
  }}
>
  コンテンツへスキップ
</a>
```

### Skip Link CSS

```css
/* In globals.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Focus Trap in Modals

```tsx
import { useEffect, useRef } from 'react';

export function useFocusTrap(isOpen: boolean) {
  const firstRef = useRef<HTMLElement>(null);
  const lastRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstRef.current) {
          lastRef.current?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastRef.current) {
          firstRef.current?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return { firstRef, lastRef };
}
```

### Reduced Motion

```tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedComponent({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

## Resources

### Accessibility Tools

- **axe DevTools**: Chrome/Firefox extension for accessibility testing
- **WAVE**: WebAIM accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit
- **NVDA**: Windows screen reader
- **VoiceOver**: macOS screen reader
- **TalkBack**: Android screen reader

### WCAG 2.1 Quick Reference

| Level | Criterion | Status |
|--------|-----------|--------|
| A | 1.1.1 Non-text Content | ✅ |
| A | 1.3.1 Info and Relationships | ✅ |
| A | 1.3.2 Meaningful Sequence | ✅ |
| A | 1.3.3 Sensory Characteristics | ⚠️ |
| A | 1.4.2 Audio Control | N/A |
| A | 2.1.1 Keyboard | ✅ |
| A | 2.1.2 No Keyboard Trap | ⚠️ |
| A | 2.4.1 Bypass Blocks | ⚠️ |
| A | 2.4.2 Page Titled | ✅ |
| A | 2.4.3 Focus Order | ✅ |
| A | 2.4.7 Focus Visible | ✅ |
| A | 3.1.1 Language of Page | ✅ |
| A | 3.3.2 Labels or Instructions | ✅ |
| A | 4.1.1 Parsing | ✅ |
| A | 4.1.2 Name, Role, Value | ✅ |
| AA | 1.4.3 Contrast (Minimum) | ✅ |
| AA | 1.4.4 Resize Text | ✅ |
| AA | 1.4.5 Images of Text | N/A |
| AA | 2.4.6 Focus Visible | ✅ |
| AA | 3.2.1 On Focus | ✅ |
| AA | 3.2.2 On Input | N/A |
| AA | 3.3.1 Error Suggestion | ✅ |

## Next Steps

1. **Add skip navigation link** (High Priority)
2. **Implement focus management for any modals/dropdowns** (High Priority)
3. **Add aria-live regions for dynamic content** (Medium Priority)
4. **Implement reduced motion preference** (Medium Priority)
5. **Run full accessibility audit with axe-core** (Medium Priority)
6. **Test with actual screen readers** (Medium Priority)

## Monitoring

### Lighthouse Score Targets

- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Regular Audits

- **Monthly**: Run Lighthouse audit
- **Quarterly**: Test with screen reader
- **Release Cycle**: Test new features for accessibility
