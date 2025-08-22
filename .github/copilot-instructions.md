# GitHub Copilot Instructions

This file provides workspace-specific custom instructions for GitHub Copilot when working with the Maria Nielsen Portfolio project.

## Project Overview

This is a React-based portfolio website for Maria Nielsen, a Project Manager. The project uses modern React patterns, Vite for building, and includes responsive design with dark/light theme support.

## Code Style Guidelines

- Use functional components with React hooks
- Prefer const over let when possible
- Use destructuring for props and imports
- Write semantic HTML with proper accessibility attributes
- Follow CSS BEM methodology for class naming
- Use meaningful variable and function names

## Component Patterns

- Add JSDoc comments for all components
- Include PropTypes or TypeScript for type safety
- Use lazy loading for route components
- Implement proper error boundaries
- Ensure responsive design for all components

## Accessibility Requirements

- Include alt text for all images
- Use proper ARIA labels for interactive elements
- Ensure keyboard navigation support
- Maintain proper heading hierarchy
- Test with screen readers

## Performance Considerations

- Lazy load route components
- Optimize images for web
- Use CSS custom properties for theming
- Minimize bundle size
- Implement proper caching strategies

## Development Workflow

- Run linting before commits: `npm run lint`
- Test builds before deployment: `npm run build`
- Follow conventional commit messages
- Write meaningful commit descriptions
- Test responsive design on multiple devices

## Project Structure

- `/src/components/` - Reusable React components
- `/src/assets/` - Static assets (images, icons)
- `/public/` - Public assets and favicon
- `/src/App.css` - Global styles and theme variables

## Theme Implementation

- Use CSS custom properties for colors
- Support both light and dark themes
- Ensure proper contrast ratios
- Test theme switching functionality

## Contact Form Integration

- Implement proper form validation
- Add loading states for form submission
- Include error handling and user feedback
- Ensure accessibility compliance

Work through development tasks systematically and maintain high code quality standards.
