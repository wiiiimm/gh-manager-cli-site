# AI Agent Instructions for gh-manager-cli Landing Page

This document provides comprehensive instructions for AI agents working on the gh-manager-cli landing page project.

## 🎯 Project Overview

This is the official landing page for **gh-manager-cli**, an interactive TUI terminal app for GitHub repository management. The site showcases the CLI tool with an optimized video demo and provides installation instructions.

### Key Details
- **Live Site**: https://gh-manager-cli.dev
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom terminal theme
- **Deployment**: Vercel with automatic deployments
- **Main CLI Repository**: https://github.com/wiiiimm/gh-manager-cli
- **npm Package**: https://www.npmjs.com/package/gh-manager-cli

## 🔧 Development Workflow

### Prerequisites
- Node.js 18+ and pnpm package manager
- Git with proper GitHub access

### Setup Commands
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm lint             # Run ESLint
```

## 📝 Commit Guidelines

**CRITICAL**: Always use Semantic Commit Messages following Conventional Commits specification.

### Commit Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

### Examples
```bash
feat: add hero video component with optimized loading
fix: resolve video playback issues on mobile devices
docs: update README with deployment instructions
style: improve responsive design for mobile viewport
refactor: extract video optimization logic to utils
perf: optimize video compression and loading strategy
```

### Multi-line Commit Example
```
feat: add hero video with optimized media and improve UX flow

- Add optimized video demo (59MB → 1.8MB) with GIF preview and poster
- Create HeroVideo component with smart loading from GitHub raw URLs
- Remove initial terminal block from hero section for cleaner flow
- Update first 'Try Now' button to scroll to CTA section
- Add blinking cursor animation to header terminal icon
- Add small link to installation options in CTA section
- Improve responsive design with better sizing for mobile/desktop
- Optimize video files: MP4 (1.8MB), GIF (5.3MB), poster (264KB)
```

## 🏗️ Project Architecture

### Directory Structure
```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles, animations, CSS variables
│   ├── layout.tsx         # Root layout with theme provider
│   ├── loading.tsx        # Loading UI
│   └── page.tsx          # Main landing page component
├── components/            # React components
│   ├── hero-video.tsx    # Video demo component
│   ├── theme-provider.tsx # Dark/light theme context
│   ├── theme-toggle.tsx  # Theme switcher component
│   └── ui/               # shadcn/ui components
├── docs/                 # Video source files (served via GitHub raw URLs)
├── lib/                  # Utility functions
├── public/               # Static assets (backup for video files)
├── styles/               # Additional CSS files
└── components.json       # shadcn/ui configuration
```

### Key Files to Understand

#### `app/page.tsx`
- Main landing page with all sections
- Hero section with video demo
- Features grid showcasing CLI capabilities
- Installation methods section
- CTA section with terminal command
- Footer with links

#### `components/hero-video.tsx`
- Smart video loading component
- Progressive enhancement: GIF → Video
- Loads from GitHub raw URLs for zero bandwidth cost
- Handles loading states and fallbacks

#### `app/globals.css`
- CSS custom properties for theme system
- Terminal-inspired color palette using OKLCH
- Cursor blink animation keyframes
- Terminal component styles

## 🎨 Design System

### Theme Architecture
- **Light Theme**: Terminal-inspired with off-white background
- **Dark Theme**: True terminal feel with dark background
- **Primary Color**: Terminal green (`oklch(0.45 0.15 142)`)
- **Typography**: Geist Mono for monospace, Geist Sans for readability

### Color Variables
```css
/* Light theme example */
--primary: oklch(0.45 0.15 142);        /* Terminal green */
--background: oklch(0.98 0 0);           /* Off-white */
--foreground: oklch(0.15 0 0);           /* Dark text */

/* Dark theme example */
--primary: oklch(0.6 0.18 142);          /* Bright terminal green */
--background: oklch(0.08 0 0);           /* Dark terminal background */
--foreground: oklch(0.85 0.02 142);      /* Light green text */
```

### Responsive Breakpoints
- `sm:` 640px+ (Mobile landscape)
- `md:` 768px+ (Tablet)
- `lg:` 1024px+ (Desktop)
- `xl:` 1280px+ (Large desktop)

## 📱 Component Guidelines

### Responsive Design Patterns
Always include responsive classes:
```tsx
// Text sizing
className="text-sm sm:text-base md:text-lg"

// Spacing
className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20"

// Layout
className="flex flex-col sm:flex-row"
```

### Theme-Aware Components
Use CSS variables for theming:
```tsx
className="bg-card text-card-foreground border-border"
```

### Font Guidelines
- Use `font-mono` for code, terminal commands, and technical content
- Use default (Geist Sans) for body text and descriptions
- Include `font-mono` class on technical elements

## 🎬 Video Asset Management

### Current Video Setup
- **Source Files**: Located in `/docs/` directory
- **Delivery**: GitHub raw URLs (https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/...)
- **Optimization**: FFmpeg with aggressive compression
- **Fallbacks**: GIF preview → MP4 video → error state

### Video Files
- `app-demo-optimized.mp4` (1.8MB) - Main video
- `app-demo.gif` (5.3MB) - Preview/fallback
- `app-demo-poster.jpg` (264KB) - Poster frame

### Video Optimization Commands
```bash
# Optimize MP4 (used in project)
ffmpeg -i source.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 96k -vf "scale=1280:-2" -preset slow output.mp4

# Create GIF with palette
ffmpeg -i source.mp4 -vf "fps=10,scale=640:-1:flags=lanczos,palettegen" palette.png
ffmpeg -i source.mp4 -i palette.png -lavfi "fps=10,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse" output.gif

# Extract poster frame
ffmpeg -i source.mp4 -ss 00:00:26 -vframes 1 -q:v 2 poster.jpg
```

## 🔄 GitHub Workflow

### Branch Strategy
- **main**: Production branch (auto-deploys to https://gh-manager-cli.dev)
- Feature branches: Use descriptive names like `feat/video-optimization`

### Pull Request Process
1. Create feature branch from main
2. Make changes with semantic commits
3. Test locally with `pnpm dev`
4. Submit PR with descriptive title and body
5. Ensure CI passes (linting, build)
6. Merge to main triggers automatic deployment

### Deployment Pipeline
- **Platform**: Vercel
- **Trigger**: Push to main branch
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Node Version**: 18.x

## 🛠️ Common Tasks for AI Agents

### Adding New Components
1. Create in `/components/` directory
2. Follow existing naming conventions
3. Include proper TypeScript types
4. Add responsive design patterns
5. Use theme-aware CSS variables

### Updating Video Content
1. Place source files in `/docs/`
2. Optimize using FFmpeg commands above
3. Update URLs in `hero-video.tsx`
4. Test loading and fallbacks
5. Commit with `feat:` or `perf:` prefix

### Styling Changes
1. Prefer Tailwind classes over custom CSS
2. Use existing CSS variables for theming
3. Test in both light and dark modes
4. Ensure mobile responsiveness
5. Use semantic commit type `style:`

### Performance Optimization
1. Check bundle size with `pnpm build`
2. Optimize images and videos
3. Use Next.js Image component when applicable
4. Lazy load components when appropriate
5. Use semantic commit type `perf:`

## 🔍 Testing Guidelines

### Manual Testing Checklist
- [ ] Video loads and plays correctly
- [ ] Theme toggle works in both modes
- [ ] Responsive design on mobile/tablet/desktop
- [ ] All links work (internal anchors and external)
- [ ] Copy buttons function properly
- [ ] Smooth scrolling to sections
- [ ] Terminal cursor animation displays
- [ ] Loading states work properly

### Browser Testing
Test in major browsers:
- Chrome/Chromium
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Critical Notes for AI Agents

### DO's
- ✅ Always use semantic commit messages
- ✅ Test responsive design on multiple breakpoints
- ✅ Maintain consistent mono font usage for technical content
- ✅ Preserve existing color theme system
- ✅ Keep video files optimized and under 5MB
- ✅ Use GitHub raw URLs for video delivery
- ✅ Test both light and dark themes

### DON'Ts
- ❌ Don't break the existing theme system
- ❌ Don't add large assets without optimization
- ❌ Don't remove responsive design patterns
- ❌ Don't use custom colors outside the theme system
- ❌ Don't commit without semantic commit messages
- ❌ Don't deploy untested video changes
- ❌ Don't modify core layout without thorough testing

## 📊 Performance Targets

### Core Web Vitals Goals
- **LCP**: < 2.5s (video should not block)
- **FID**: < 100ms (interactive elements)
- **CLS**: < 0.1 (stable layout)

### Asset Targets
- **Video files**: < 5MB each
- **Images**: < 500KB each
- **Bundle size**: Monitor with `pnpm build`

## 🔗 Key URLs and Resources

### Project Links
- **Live Site**: https://gh-manager-cli.dev
- **GitHub Repo**: https://github.com/wiiiimm/gh-manager-cli-site
- **Main CLI Repo**: https://github.com/wiiiimm/gh-manager-cli
- **npm Package**: https://www.npmjs.com/package/gh-manager-cli

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Vercel**: https://vercel.com/docs

### Tools
- **FFmpeg**: For video optimization
- **Git**: Version control with semantic commits
- **pnpm**: Package manager

## 🆘 Common Issues and Solutions

### Video Not Loading
1. Check GitHub raw URL format
2. Verify files exist in `/docs/` directory
3. Test fallback to GIF preview
4. Check browser network tab for 404s

### Theme Issues
1. Verify CSS variables are defined
2. Check both light and dark mode
3. Ensure proper class usage (`bg-card` vs custom colors)

### Build Failures
1. Run `pnpm lint` to check for errors
2. Verify all imports are correct
3. Check TypeScript types
4. Test with `pnpm build` locally

### Mobile Issues
1. Test responsive breakpoints
2. Check touch targets (min 44px)
3. Verify video plays on mobile browsers
4. Test with real devices when possible

---

**Remember**: This project represents a professional CLI tool. Maintain high quality, performance, and attention to detail in all changes.
