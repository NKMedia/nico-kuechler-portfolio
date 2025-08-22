# Security headers configuration for production deployment

# This file provides examples and templates for configuring security headers

# Content Security Policy (CSP)

# Add this to your web server configuration or deployment platform

## For Nginx:

# add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';" always;

## For Apache (.htaccess):

# Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';"

## For Netlify (\_headers file):

# /\*

# Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';

## For Vercel (vercel.json):

# "headers": [

# {

# "source": "/(.\*)",

# "headers": [

# {

# "key": "Content-Security-Policy",

# "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self';"

# }

# ]

# }

# ]

# Additional Security Headers

## X-Frame-Options

# Prevents clickjacking attacks

# Nginx: add_header X-Frame-Options "DENY" always;

# Apache: Header always set X-Frame-Options "DENY"

# Netlify: X-Frame-Options: DENY

## X-Content-Type-Options

# Prevents MIME type sniffing

# Nginx: add_header X-Content-Type-Options "nosniff" always;

# Apache: Header always set X-Content-Type-Options "nosniff"

# Netlify: X-Content-Type-Options: nosniff

## Referrer-Policy

# Controls referrer information

# Nginx: add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Apache: Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Netlify: Referrer-Policy: strict-origin-when-cross-origin

## Permissions-Policy

# Controls browser features

# Nginx: add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# Apache: Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

# Netlify: Permissions-Policy: camera=(), microphone=(), geolocation=()

## X-XSS-Protection (Legacy, but still useful for older browsers)

# Nginx: add_header X-XSS-Protection "1; mode=block" always;

# Apache: Header always set X-XSS-Protection "1; mode=block"

# Netlify: X-XSS-Protection: 1; mode=block

## Strict-Transport-Security (HTTPS only)

# Forces HTTPS connections

# Nginx: add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Apache: Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Netlify: Strict-Transport-Security: max-age=31536000; includeSubDomains
