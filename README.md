# RelocateReady

A modern web application that helps users discover their ideal relocation destination based on personalized preferences. Built with Next.js and powered by intelligent location scoring algorithms.

## Overview

RelocateReady provides a data-driven approach to relocation planning by analyzing multiple factors including cost of living, safety, climate, and healthcare. Users can customize their preferences and receive personalized location recommendations with match scores.

## Features

- **Personalized Preferences**: Customize importance weights for cost, safety, climate, and healthcare factors
- **Location Browsing**: Explore cities worldwide with detailed descriptions and statistics
- **Smart Matching**: AI-powered scoring system ranks locations based on your preferences
- **User Dashboard**: Track and compare saved locations with real-time match scores
- **Account Management**: Secure authentication with profile and preference management

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: FastAPI (deployed on Railway)
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/relocateready-frontend.git
cd relocateready-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── browse/          # Location discovery and browsing
├── dashboard/       # Personalized user dashboard
├── preferences/     # Preference configuration
├── settings/        # Account settings
├── login/          # Authentication
├── signup/         # User registration
└── components/     # Shared UI components
```

## API Integration

The frontend integrates with a FastAPI backend deployed on Railway that provides:
- User authentication and management
- Location data and descriptions
- Preference storage and retrieval
- Dynamic location scoring based on user preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub.
