# gh-manager-cli Landing Page

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://gh-manager-cli.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/wiiiimm/gh-manager-cli)
[![npm](https://img.shields.io/badge/npm-Package-red?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/gh-manager-cli)

## Overview

This is the official landing page for **gh-manager-cli** - an interactive TUI terminal app for browsing and managing GitHub repositories. Built with Next.js, TypeScript, and Tailwind CSS, featuring an optimized video demo and modern terminal-inspired design.

## 🚀 Live Site

**[https://gh-manager-cli.dev](https://gh-manager-cli.dev)**

## 📦 gh-manager-cli Links

- **GitHub Repository**: [https://github.com/wiiiimm/gh-manager-cli](https://github.com/wiiiimm/gh-manager-cli)
- **npm Package**: [https://www.npmjs.com/package/gh-manager-cli](https://www.npmjs.com/package/gh-manager-cli)
- **Quick Start**: `npx gh-manager-cli@latest`

## ✨ Features

- **🎥 Interactive Video Demo**: Optimized video showcasing the CLI in action
- **📱 Responsive Design**: Perfect experience on all devices
- **🌙 Dark/Light Theme**: Terminal-inspired design with theme toggle
- **⚡ Performance Optimized**: Fast loading with optimized assets
- **🎯 Smart UX Flow**: Guided user journey from demo to installation
- **📋 Multiple Installation Methods**: NPX, Homebrew, npm, and pre-built binaries

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom terminal theme
- **Components**: Radix UI primitives with shadcn/ui
- **Typography**: Geist Sans & Geist Mono fonts
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Video Optimization**: FFmpeg with GitHub raw URLs

## 🎬 Video Assets

The site features an optimized demo video with smart loading:

- **Original**: 59MB M4V → **Optimized**: 1.8MB MP4 (97% reduction)
- **GIF Preview**: 5.3MB for instant loading
- **Poster Frame**: 264KB for fast preview
- **Delivery**: GitHub raw URLs (zero bandwidth cost)

## 🚀 Development

```bash
# Clone the repository
git clone https://github.com/wiiiimm/gh-manager-cli-site.git
cd gh-manager-cli-site

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles and animations
│   ├── layout.tsx       # Root layout with theme provider
│   └── page.tsx         # Main landing page
├── components/          # Reusable components
│   ├── hero-video.tsx   # Video demo component
│   ├── theme-toggle.tsx # Dark/light mode toggle
│   └── ui/              # shadcn/ui components
├── docs/                # Video source files
├── public/              # Static assets
└── styles/              # Additional CSS
```

## 🎨 Design System

- **Colors**: Terminal-inspired green palette with OKLCH color space
- **Typography**: Monospace fonts throughout for technical feel
- **Animations**: Subtle cursor blink and hover effects
- **Layout**: Centered content with responsive breakpoints
- **Theme**: Consistent dark/light mode with proper contrast

## 📱 Responsive Breakpoints

- **Mobile**: `sm:` (640px+)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large**: `xl:` (1280px+)

## ⚡ Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Image Optimization**: Next.js automatic optimization
- **Video Loading**: Progressive with GIF fallback
- **Code Splitting**: Automatic with Next.js
- **CDN Delivery**: Vercel Edge Network + GitHub raw URLs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **[gh-manager-cli](https://github.com/wiiiimm/gh-manager-cli)** - The main CLI tool
- **[Ink](https://github.com/vadimdemedes/ink)** - React for CLIs (what powers gh-manager-cli)

---

**Built with ❤️ by [wiiiimm](https://github.com/wiiiimm)**
