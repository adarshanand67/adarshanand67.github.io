# Personal Portfolio Template

A modern, customizable portfolio website built with **Next.js 16**, **React 19**, and **TypeScript**. Features a terminal-inspired design with Matrix rain effects, interactive widgets, and a fully decoupled data system.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

![Portfolio Preview](./public/ogImage.png)

---

## Features

- **Modern Terminal Design**: Cyberpunk-inspired UI with Matrix rain background
- **Music Player**: Background music with playlist support
- **Interactive Terminal**: Functional command-line interface
- **Blog System**: Markdown-based blog with syntax highlighting
- **Project Showcase**: Portfolio projects with tech stack
- **Reading List**: Books and research papers
- **Entertainment Tracker**: Anime and movies watchlist
- **Dark/Light Mode**: Theme toggle with system preference
- **Performance**: Optimized with Next.js 16
- **Responsive**: Mobile-first design
- **Feature Toggles**: Enable/disable components easily
- **Customizable**: Fully decoupled configuration and data

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/adarshanand67/adarshanand67.github.io.git my-portfolio
cd my-portfolio
npm install
```

### 2. Customize Your Info

Edit **`lib/config.ts`**:

```typescript
export const siteConfig = {
  name: "Your Name", // Change this
  title: "Your Name - Your Title", // Change this
  description: "Your portfolio description",
  url: "https://yourwebsite.com",

  author: {
    name: "Your Name",
    email: "your.email@example.com",
    role: "Your Role @ Company",
    github: "yourgithub",
    linkedin: "yourlinkedin",
  },
};
```

### 3. Update Your Data

Edit `data.ts` to update your profile, projects, experiences, and more.

### 4. Run Locally

```bash
npm run dev
```

Visit **http://localhost:3000**

### 5. Deploy

```bash
npm run build
```

Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com).

---

## Project Structure

```
my-portfolio/
├── lib/                       # CORE CONFIG & DATA
│   ├── config.ts              # Site, theme, and feature config
│   ├── data.ts                # Profile, projects, blogs, etc.
│   ├── api.ts                 # Data fetching utilities
│   └── store.ts               # State management (Zustand)
│
├── components/                # UI Components
│   ├── features.tsx           # Feature components (Terminal, Music, etc.)
│   ├── layout.tsx             # Root layout & Navigation
│   ├── shelves.tsx            # specialized shelf displays
│   └── ui.tsx                 # Reusable UI primitives
│
├── app/                       # Next.js App Router Pages
├── public/                    # Images, assets
└── types/                     # TypeScript definitions
```

---

## Configuration

This project is designed to be easily configurable. You can adjust the behavior and appearance by modifying the configuration files.

### Site Configuration (`lib/config.ts`)

- **Site Details**: `siteConfig` controls the metadata, SEO, and contact information.
- **Theme**: `themeConfig` allows you to set default themes and colors.
- **Features**: `featuresConfig` lets you toggle major features like the Music Player, Terminal, or specific shelves on/off.
- **Shelves**: `shelfConfigs` defines the appearance and data source for different content shelves (Books, Anime, Articles, etc.).

### Content Data (`data.ts`)

All personal content is stored in `data.ts`. This includes:
- **Profile**: Bio, stats, skills, and experience.
- **Projects**: Showcase of your work.
- **Anime/Books/Hobbies**: Arrays of items for the respective shelves.

### Global Constants (`lib/constants.ts`)

Modify `lib/constants.ts` for:
- **Navigation Routes**: `routes` object.
- **Terminal Commands**: Define custom commands for the terminal interface.
- **Music Tracks**: Update the `tracks` array with your own music playlist.

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Deploy!

### GitHub Pages

The project includes a GitHub Action for automatic deployment.

1. Go to Settings > Pages
2. Source: GitHub Actions

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://reactjs.org/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Google Fonts](https://fonts.google.com/) (Assistant, JetBrains Mono)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made by [Adarsh Anand](https://github.com/adarshanand67)**
