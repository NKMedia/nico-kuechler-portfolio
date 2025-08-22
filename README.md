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

- **Frontend**: React 19.1.1, React Router DOM 7.8.1
- **Build Tool**: Vite 7.1.2
- **Styling**: CSS3 with custom properties and Flexbox/Grid
- **Code Quality**: ESLint with React hooks and refresh plugins
- **Fonts**: Google Fonts (Montserrat)
- **Icons**: Font Awesome (for theme toggle and social icons)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.jsx       # About/Home page component
│   ├── Footer.jsx      # Footer component
│   ├── Header.jsx      # Header with navigation
│   ├── Kontakt.jsx     # Contact page component
│   ├── Lebenslauf.jsx  # Resume/CV page component
│   ├── ProfileCard.jsx # Profile card component
│   ├── Projekte.jsx    # Projects page component
│   └── ThemeToggle.jsx # Dark/light theme toggle
├── assets/             # Static assets
├── App.jsx            # Main application component
├── App.css           # Global styles
├── index.css         # Base styles
└── main.jsx          # Application entry point
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
git clone [repository-url]
cd NeuerTest
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Customization

### Theme Colors

The main theme colors can be modified in `src/App.css`:

- Primary Blue: `#2563eb`
- Background Beige: `#e7dbce`
- Text Colors: `#222` (light theme), `#e0e0e0` (dark theme)

### Content Updates

- Update personal information in `src/components/ProfileCard.jsx`
- Modify page content in respective component files
- Replace placeholder images in `public/` and `src/assets/`

## 📱 Responsive Breakpoints

- Desktop: `> 1000px`
- Tablet: `850px - 1000px`
- Mobile: `< 850px`
- Small Mobile: `< 480px`

## 🔧 Development

The project uses modern React patterns including:

- Functional components with hooks
- Lazy loading for better performance
- Responsive design with CSS media queries
- Accessibility considerations (ARIA labels, semantic HTML)

## 🚀 Deployment

### Build for Production

```bash
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
