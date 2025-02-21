# Swapify: Community Trading & Skill Exchange Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 📚 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

Swapify is a peer-to-peer platform designed for University of Waterloo students to trade skills, services, and goods without monetary exchange. The platform aims to foster collaboration, financial flexibility, and community trust within the university ecosystem.

### 🎯 Purpose
- Enable skill trades between students (e.g., coding tutorials for graphic design)
- Reduce financial barriers to accessing services
- Build meaningful connections within the university community
- Facilitate resource sharing and collaborative learning

## ✨ Features

### Core Features
- **User Profiles**
  - Skill tags and expertise levels
  - Availability calendars
  - Trade history and ratings
  - UW email verification
  - LinkedIn/Portfolio integration

- **Skill/Service Listings**
  - Categorized posts (Academic, Creative, Fitness)
  - Advanced search and filters
  - Location-based matching

- **Smart Matching**
  - Compatibility scoring
  - Skill overlap detection
  - Automated match notifications

- **Secure Messaging**
  - Real-time chat system
  - File sharing capabilities
  - Content moderation

- **Trust & Safety**
  - User verification system
  - Rating and review platform
  - Community guidelines enforcement

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Radix UI** - Headless UI components

### Backend & Infrastructure
- **Supabase** - Database and real-time features
- **Google Cloud** - Authentication
- **Vercel** - Hosting and deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/swapify.git
cd swapify
```

2. Install dependencies
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory with your environment variables

4. Start the development server
```bash
pnpm dev
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Note: You'll need to:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from the project settings
3. Replace the placeholder values in `.env.local` with your actual credentials

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for University of Waterloo Students
</div>