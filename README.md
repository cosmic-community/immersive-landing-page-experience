# Immersive Landing Page Experience

![App Preview](https://imgix.cosmicjs.com/f5856950-a455-11ed-81f2-f50e185dd248-NRQV-hBF10M.jpg?w=1200&h=300&fit=crop&auto=format,compress)

Create an immersive single-page landing experience where scrolling delves users into deeper parts of the site with stylish animations and transitions.

## Features

- Full-screen sections that keep users engaged.
- Smooth scroll-triggered animations powered by GSAP.
- Responsive design that works seamlessly on desktop and mobile devices.
- Dynamic data integration from Cosmic, making it easy to update content without touching the code.
- Accessibility features for a more inclusive experience.

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68839f8d45a59f0b52cf8847&clone_repository=6883a0e145a59f0b52cf8856)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to create a landing page that any business can use where everything is on one main screen (no scrolling down the page) but when you do scroll down it zooms into the middle of the page with a very slick animation that takes you to the next page so it feels like each scroll takes you deeper and deeper into this website. Can we do that?"

### Code Generation Prompt

> Build the landing page website that fits entirely on the main screen because as you scroll it zooms into the middle of the page with a very cool animation taking you to the next page that feels like you're going deeper and deeper into the website. Based on the previous conversation, it needs: Front-End Implementation for Slick Animations CSS and JavaScript: Use CSS for animations and transitions for simple effects. For complex animations like zoom effects, utilize JavaScript libraries such as GSAP (GreenSock Animation Platform) or utilize CSS with frameworks like Three.js for 3D animations. Scrolling Events: Capture scroll events using JavaScript to trigger the transition to the next section. Each scroll event can trigger an animation that zooms into the content. Full-Screen Sections: Ensure each section fills the viewport to maintain the no-scroll effect initially and begin the zoom transitions based on defined user actions. Best Practices Performance Optimization: Ensure that animations are smooth and performance-efficient. Optimize images and videos to prevent page load issues. Accessibility: Ensure the content is accessible without relying solely on animations for navigation; provide alternative navigation methods. Responsive Design: Check that the animations and layout are responsive and function correctly on all device types. also be sure to add to Cosmic config  apiEnvironment: “staging”

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 15](https://nextjs.org/) for server-rendered React applications.
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap) for scroll-triggered animations.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS styling.
- [Cosmic](https://www.cosmicjs.com) for headless CMS content management.

## Getting Started

### Prerequisites

- Node.js
- Bun package manager
- Cosmic Bucket with read and write keys set in the environment variables

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/your-project.git
   cd your-project
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Configure your environment variables:

   Copy `.env.example` to `.env.local` and fill in your Cosmic bucket details.

   ```bash
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:

   ```bash
   bun run dev
   ```

## Cosmic SDK Examples

The integration with Cosmic uses the Cosmic JS SDK to fetch data required for the landing page sections. Below is an example of fetching sections using the SDK:

```typescript
import { cosmic } from '@/lib/cosmic'

const getSections = async () => {
  try {
    const response = await cosmic.objects
      .find({ type: 'sections' })
      .props(['title', 'slug', 'metadata'])
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

## Cosmic CMS Integration

This app dynamically pulls content from your Cosmic bucket. It uses the 'Landing Page' object type to structure the page and the 'Section' object type to compose each story on the page.

## Deployment Options

### Vercel

1. Push the repository to your preferred Git hosting service.
2. Connect the repository to Vercel.
3. Set your Cosmic environment variables in the Vercel dashboard.
4. Deploy the application.

### Netlify

1. Push the repository to your preferred Git hosting service.
2. Import the repository in Netlify.
3. Set your Cosmic environment variables in Netlify dashboard.
4. Deploy the application.

Ensure that you have the correct environment variables set for deployment and check the deployment logs for any errors.

<!-- README_END -->