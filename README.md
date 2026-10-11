# Sneha Singh — Portfolio

A responsive React + Vite portfolio starter with a dark, editorial design.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this folder and open it in VS Code.
3. Open the terminal in the project folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints in your terminal (usually http://localhost:5173).

## Before publishing

- In `src/App.jsx`, replace the GitHub and LinkedIn profile URLs in the footer with your real profile URLs.
- Replace each project’s placeholder live demo and generic GitHub profile link with its exact repository URL and deployed demo URL. Do not claim a demo is live until deployed.
- Your resume is included as `public/resume.pdf`; replace it whenever you update your resume. The hero has both View resume and Download PDF links.
- Add your own portrait photo as `public/profile.jpg` to show your real photo alongside the developer visual. Until then, the portfolio shows initials as a fallback.
- The theme toggle switches between dark and light themes.
- Verify all project claims and dates before publishing.
- Update the project list as your work grows.

## Deploy to GitHub Pages

For the easiest first deployment, use Vercel or Netlify by importing the GitHub repository and selecting the Vite framework. Build command: `npm run build`; output directory: `dist`.

To publish via GitHub Pages, configure Vite's `base` to match your repository name and use a GitHub Pages deployment workflow. If the repository is named `yourusername.github.io`, the default base `/` is appropriate.
