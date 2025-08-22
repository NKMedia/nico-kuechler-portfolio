# Contributing to Maria Nielsen Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

### Local Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/portfolio-project.git
   cd portfolio-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔄 Development Process

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(header): add mobile navigation menu
fix(theme): resolve theme toggle state persistence
docs(readme): update installation instructions
```

## 📏 Coding Standards

### JavaScript/React Guidelines

- Use functional components with hooks
- Prefer const over let when possible
- Use destructuring for props and state
- Add PropTypes or TypeScript for type checking
- Write self-documenting code with clear variable names

### CSS Guidelines

- Use CSS custom properties for theming
- Follow BEM methodology for class naming
- Prefer Flexbox/Grid for layouts
- Ensure responsive design for all components
- Use semantic HTML elements

### File Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components (if separated)
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── constants/          # Application constants
├── styles/             # Global styles
└── assets/             # Static assets
```

### Component Structure

```jsx
import React from 'react';

/**
 * Component description
 * @param {Object} props - Component props
 * @returns {JSX.Element} Component JSX
 */
const ComponentName = ({ prop1, prop2 }) => {
  // Component logic

  return (
    // JSX
  );
};

export default ComponentName;
```

## 🧪 Testing Guidelines

### Testing Requirements

- Write unit tests for utility functions
- Add integration tests for critical user flows
- Ensure accessibility compliance
- Test responsive design on different screen sizes

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Pull Request Process

### Before Submitting

1. **Test your changes**:

   ```bash
   npm run lint
   npm run build
   npm test
   ```

2. **Update documentation** if needed
3. **Add or update tests** for new functionality
4. **Ensure responsive design** works on all screen sizes

### PR Requirements

- **Clear title and description** explaining the changes
- **Link to related issues** if applicable
- **Screenshots** for UI changes
- **Testing instructions** for reviewers
- **Breaking changes** clearly documented

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing

- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Responsive design verified

## Screenshots

(if applicable)

## Checklist

- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Environment details** (browser, OS, screen size)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots or screen recordings** if applicable
- **Console errors** if any

### Feature Requests

For new features, please provide:

- **Use case description**
- **Proposed solution**
- **Alternative solutions considered**
- **Additional context** or mockups

## 🎨 Design Guidelines

### Color Palette

- Primary: `#2563eb`
- Background: `#e7dbce`
- Text: `#222` (light), `#e0e0e0` (dark)
- Secondary: `#7a7a7a`

### Typography

- Font Family: Montserrat
- Headings: 700 weight
- Body: 400 weight

### Spacing

Use consistent spacing units:

- Small: 8px, 16px
- Medium: 24px, 32px
- Large: 40px, 48px, 60px

## 📞 Getting Help

- **Questions**: Open a discussion on GitHub
- **Issues**: Create an issue with detailed information
- **Code Review**: Request review from maintainers

## 🎯 Development Priorities

1. **Accessibility**: Ensure WCAG compliance
2. **Performance**: Optimize for mobile devices
3. **User Experience**: Smooth interactions and transitions
4. **Code Quality**: Maintainable and documented code

Thank you for contributing to this project! 🚀
