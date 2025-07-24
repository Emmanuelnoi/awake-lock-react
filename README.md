# Awake Lock React App

<div align="center">

![Awake Lock](https://img.shields.io/badge/status-production--ready-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)
![Tests](https://img.shields.io/badge/tests-29%2F29%20passing-brightgreen)

**Prevent your device from going to sleep with intelligent wake lock management**

</div>

## 🚀 Overview

**Awake Lock** is a modern React application that prevents devices from going to sleep using the Wake Lock API. Built with TypeScript, Vite, and shadcn/ui, it provides an intuitive interface for managing screen and system wake locks with comprehensive settings, monitoring, and multi-language support.

### 📋 Recent Updates

- ✅ **awake-lock v1.2.0 Migration** - Updated to latest library version with enhanced features
- ✅ **API Import Changes** - Migrated from default export to named export (`{ WakeLock }`)
- ✅ **Test Suite Updates** - All 29 tests passing with updated mocks
- ✅ **Zero Breaking Changes** - Maintained full compatibility during upgrade

### ✨ Key Features

- 🔐 **Wake Lock Management** - Screen and system wake locks with intelligent fallbacks
- 🎨 **Modern UI/UX** - Beautiful interface built with shadcn/ui and Tailwind CSS
- 🌍 **Multi-language Support** - 6 languages (EN, ES, FR, DE, JA, ZH, IT)
- 🎯 **Theme System** - Light, dark, and system theme modes
- 📊 **Performance Monitoring** - Battery optimization and real-time metrics
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 📱 **Mobile Responsive** - Works seamlessly across all devices
- 🔧 **Developer Ready** - Full TypeScript, testing, and CI/CD

## 🎯 Use Cases

Perfect for situations requiring continuous screen visibility:

- 📈 **Presentations & Demos** - Keep screen active during presentations
- 📊 **Dashboard Monitoring** - Continuous monitoring of real-time data
- 📚 **Reading & Research** - Long-form content without interruption
- 🎮 **Gaming & Entertainment** - Uninterrupted media consumption
- 🔬 **Development & Testing** - Maintain screen during long processes

## 🛠 Tech Stack

### Core Technologies
- **React 19.1.0** - Modern hooks-based architecture
- **TypeScript 5.8.3** - Full type safety throughout
- **Vite 7.x** - Lightning-fast development and optimized builds
- **Tailwind CSS 3.4.x** - Utility-first styling system

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Headless, accessible primitives
- **Lucide React** - Beautiful, consistent icon system

### Features & Libraries
- **[awake-lock] (https://www.npmjs.com/package/awake-lock) v1.2.0** - Core wake lock functionality with fallbacks
- **react-i18next v15.6.0** - Internationalization framework
- **clsx + tailwind-merge** - Conditional styling utilities

### Testing & Quality
- **Vitest 3.2.4** - Fast, modern test runner
- **@testing-library/react** - Component testing utilities
- **ESLint + TypeScript** - Code quality and type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd awake-lock-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev              # Start development server with HMR
npm run build            # Create optimized production build
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint for code quality
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run test suite with Vitest
npm run test:ui          # Run tests with UI dashboard
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

## 🏗 Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── switch.tsx
│   │   └── ...
│   ├── WakeLockControl.tsx    # Main wake lock interface
│   ├── Header.tsx             # Navigation header
│   ├── ThemeProvider.tsx      # Theme context management
│   ├── ThemeToggle.tsx        # Theme switcher component
│   ├── SettingsDialog.tsx     # Settings modal
│   ├── AboutDialog.tsx        # About/info modal
│   └── LanguageSelector.tsx   # Language switching
├── hooks/
│   └── useAwakeLock.ts        # Wake lock management hook
├── lib/
│   └── utils.ts               # Utility functions
├── i18n/
│   ├── index.ts               # i18next configuration
│   └── locales/               # Translation files
│       ├── en.json            # English
│       ├── es.json            # Spanish
│       ├── fr.json            # French
│       ├── de.json            # German
│       ├── ja.json            # Japanese
│       ├── zh.json            # Chinese
│       └── it.json            # Italian
├── test/                      # Test suite
│   ├── setup.ts               # Test configuration
│   ├── *.test.tsx             # Component tests
│   └── *.test.ts              # Hook tests
├── App.tsx                    # Main application
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

### Core Components

#### WakeLockControl
The main interface component that provides:
- Wake lock activation/deactivation controls
- Real-time status indicators
- Battery level monitoring
- Session duration tracking
- Error state handling

#### useAwakeLock Hook
Custom hook managing all wake lock functionality:
- Wake lock state management
- Browser compatibility detection
- Fallback strategy implementation
- Performance monitoring
- Error handling

#### ThemeProvider
Context-based theme management:
- Light/dark/system theme modes
- Persistent theme preferences
- CSS variable management
- Real-time theme switching

## 🌍 Internationalization

### Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | en | ✅ Complete |
| Spanish | es | ✅ Complete |
| French | fr | ✅ Complete |
| German | de | ✅ Complete |
| Japanese | ja | ✅ Complete |
| Chinese | zh | ✅ Complete |
| Italian | it | ✅ Complete |

### i18n Features
- **Automatic Detection** - Browser language detection
- **Manual Override** - User-selectable language preference
- **Persistent Settings** - Language choice saved locally
- **Real-time Switching** - Instant language changes
- **Namespace Organization** - Structured translation keys

## 🎨 Theming

### Theme Modes
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes for low-light use
- **System Mode** - Follows OS preference automatically

### Customization
The app uses CSS custom properties for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

## 🔒 Browser Compatibility

### Native Support
- ✅ **Chrome/Chromium** - Full Wake Lock API support
- ✅ **Edge** - Complete implementation  
- ⚠️ **Firefox** - Partial support with fallbacks
- ⚠️ **Safari** - Limited support, fallback strategies used

### Fallback Strategies
When native Wake Lock API isn't available:
1. **Video Element Strategy** - Invisible video loop
2. **Audio Context Strategy** - Silent audio processing
3. **Timer Strategy** - Periodic DOM manipulation
4. **User Notification** - Clear compatibility messaging

## 📊 Performance

### Bundle Size
- **JavaScript**: ~421KB (production optimized)
- **CSS**: ~25KB (utility-first approach)
- **Assets**: Optimized images and icons

### Runtime Optimization
- **Efficient Hooks** - Minimal re-renders
- **Event Cleanup** - Proper listener management
- **Memory Management** - Automatic wake lock cleanup
- **Battery Awareness** - Optional power optimization

## 🧪 Testing

### Test Coverage
- **29/29 tests passing** - 100% test success rate
- **Component Tests** - UI interaction testing
- **Hook Tests** - Business logic verification
- **Integration Tests** - End-to-end workflows
- **Error Scenarios** - Comprehensive error handling

### Testing Strategy
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# UI dashboard
npm run test:ui
```

## 🚀 Deployment

### Production Build
```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

## 🛡 Security & Privacy

### Privacy-First Design
- ❌ **No Data Collection** - Zero analytics or tracking
- 🏠 **Local Storage Only** - Settings stored in browser
- 🔒 **No External Calls** - All processing client-side
- 🛡 **CSP Compatible** - Content Security Policy ready

### Security Best Practices
- No API keys or secrets in code
- Safe default configurations
- Secure fallback implementations

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Run tests: `npm test`


### Adding Features
1. Create feature branch
2. Implement with tests
3. Update documentation
4. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Vite** - Next-generation frontend tooling
- **React** - User interface library

---

<div align="center">

**Built using modern React, TypeScript, and Vite**

</div>