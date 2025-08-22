# Nico Küchler - Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing the professional profile of Nico Küchler, Senior Software Developer & Media Designer.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes for better user experience
- **Single Page Application**: Fast navigation with React Router and lazy loading
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Performance Optimized**: Lazy loading of components for better performance

## 🛠️ Technologies Used

- **Frontend**: React 19.1.1, React Router DOM 7.8.1, TypeScript
- **Build Tool**: Vite 7.1.2
- **Testing**: Vitest, React Testing Library, Jest DOM
- **Styling**: CSS3 with custom properties and Flexbox/Grid
- **Code Quality**: ESLint with TypeScript and React plugins
- **Fonts**: Google Fonts (Montserrat)
- **Icons**: Font Awesome (for theme toggle and social icons)
- **Development**: Custom hooks, Environment variables, Performance monitoring

## 📁 Project Structure

```
src/
├── components/          # React components with TypeScript
│   ├── About.tsx       # About/Home page component
│   ├── Footer.tsx      # Footer component
│   ├── Header.tsx      # Header with navigation
│   ├── Kontakt.tsx     # Contact page component
│   ├── Lebenslauf.tsx  # Resume/CV page component
│   ├── ProfileCard.tsx # Profile card component
│   ├── Projekte.tsx    # Projects page component
│   ├── ThemeToggle.tsx # Dark/light theme toggle
│   ├── ErrorBoundary.tsx # Error boundary component
│   ├── Datenschutz.tsx # Privacy policy component
│   ├── Impressum.tsx   # Legal notice component
│   └── NotFound.tsx    # 404 page component
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme management hook
│   ├── useLocalStorage.ts # Local storage hook
│   ├── useForm.ts      # Form handling hook
│   └── useFocus.ts     # Focus management hook
├── constants/          # Application constants
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── test/               # Test configuration and utilities
├── assets/             # Static assets
├── App.tsx            # Main application component
├── App.css           # Global styles
├── index.css         # Base styles
└── main.tsx          # Application entry point
```

## 🎯 Pages

- **About** (`/`): Introduction and overview
- **Lebenslauf** (`/lebenslauf`): Professional resume and experience
- **Projekte** (`/projekte`): Portfolio of projects
- **Kontakt** (`/kontakt`): Contact information and form

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nico-kuechler/portfolio.git
cd nico-kuechler-portfolio
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:analyze` - Build with bundle analysis
- `npm run build:prod` - Full production build with linting and tests
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve production build on port 4173
- `npm run lint` - Run ESLint for code quality checks
- `npm run lint:fix` - Run ESLint and fix auto-fixable issues
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Generate test coverage report
- `npm run clean` - Clean build directory

## 🎨 Customization

### Environment Variables

Configuration can be updated via environment variables in `.env`:

```env
VITE_APP_NAME=Nico Küchler Portfolio
VITE_CONTACT_EMAIL=mail@nico-kuechler.de
VITE_CONTACT_PHONE=+49 171 816 816 4
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_ANALYTICS=false
```

### Theme Colors

The main theme colors can be modified in `src/App.css`:

- Primary Blue: `#2563eb`
- Background Beige: `#e7dbce`
- Text Colors: `#222` (light theme), `#e0e0e0` (dark theme)

### Content Updates

- Update personal information via environment variables or `src/constants/index.ts`
- Modify page content in respective component files
- Replace placeholder images in `public/` and `src/assets/`

## 📱 Responsive Breakpoints

- Desktop: `> 1000px`
- Tablet: `850px - 1000px`
- Mobile: `< 850px`
- Small Mobile: `< 480px`

## 🔧 Development

The project uses modern React patterns including:

- Functional components with TypeScript and hooks
- Custom hooks for theme management, localStorage, and form handling
- Comprehensive test suite with Vitest and React Testing Library
- Environment variable configuration for different deployments
- Error boundaries for robust error handling
- Lazy loading for better performance
- Responsive design with CSS media queries
- Accessibility considerations (ARIA labels, semantic HTML)
- Performance monitoring and optimization utilities

## 🚀 Deployment

### Build for Production

```bash
# Run full production build with tests and linting
npm run build:prod

# Or run individual steps
npm run lint
npm run test
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Deploy using Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Nico Küchler**

- Role: Senior Software Developer & Media Designer BA
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

---

_Built with ❤️ using React and Vite_
