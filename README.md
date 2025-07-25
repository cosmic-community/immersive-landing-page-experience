# README.md
# Immersive Landing Page Experience

A beautiful, immersive landing page experience powered by Cosmic CMS and built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Immersive Design** - Full-screen sections with smooth scroll transitions
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Performance** - Optimized images with imgix and smooth animations
- 🎭 **Animations** - Beautiful motion effects powered by Framer Motion
- 🎯 **CMS-Powered** - Content managed through Cosmic CMS
- 🔧 **TypeScript** - Fully typed for better development experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Touch Support** - Swipe gestures for mobile navigation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic CMS account and bucket

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cosmic-community/immersive-landing-page-experience.git
cd immersive-landing-page-experience
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env.local
```

4. Add your Cosmic CMS credentials to `.env.local`:
```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic CMS Setup

This application expects the following Object Types in your Cosmic CMS bucket:

### Landing Page Object Type
- **Slug**: `landing-page`
- **Singleton**: Yes
- **Metafields**:
  - `title` (Text, Required)
  - `subtitle` (Text, Optional)
  - `main_image` (File, Optional)
  - `sections` (Objects, Optional) - References to Section objects

### Section Object Type
- **Slug**: `sections`
- **Singleton**: No
- **Metafields**:
  - `title` (Text, Required)
  - `body` (Markdown, Optional)
  - `images` (Files, Optional)
  - `cta_button_label` (Text, Optional)
  - `cta_button_url` (Text, Optional)

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page component
├── components/            # React components
│   ├── Hero.tsx          # Hero section component
│   ├── Navigation.tsx    # Navigation dots component
│   └── ScrollSection.tsx # Content section component
├── hooks/                # Custom React hooks
│   └── useScrollSections.ts # Scroll section management
├── lib/                  # Utility libraries
│   └── cosmic.ts         # Cosmic CMS client
├── types/                # TypeScript type definitions
│   └── index.ts          # Shared types
└── public/               # Static assets
```

## Customization

### Styling
The application uses Tailwind CSS with custom glass morphism effects and animations. You can modify the styles in:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration and custom animations

### Content Structure
Content is managed through Cosmic CMS. You can modify the data structure by updating the TypeScript interfaces in `types/index.ts` and the corresponding fetching logic in `lib/cosmic.ts`.

### Animations
Motion effects are handled by Framer Motion. You can customize animations in the component files, particularly in `components/Hero.tsx` and `components/ScrollSection.tsx`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms
This is a standard Next.js application and can be deployed to any platform that supports Node.js applications.

## Environment Variables

- `COSMIC_BUCKET_SLUG` - Your Cosmic CMS bucket slug
- `COSMIC_READ_KEY` - Your Cosmic CMS read key
- `COSMIC_WRITE_KEY` - Your Cosmic CMS write key (optional, for write operations)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the Cosmic CMS community.