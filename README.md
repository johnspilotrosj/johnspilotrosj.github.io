# Setup by Ethan Gardner
When you push changes to this repository, GitHub Pages automatically builds and deploys your site. Here's the full process:

```mermaid
flowchart TD
    A["✏️ Edit your files\n<i>Change HTML, CSS, images</i>"]:::you --> B["💾 Commit changes\n<i>Save with a message</i>"]:::you
    B --> C["🚀 Push to main branch\n<i>Upload to GitHub</i>"]:::git
    C --> D["⚙️ GitHub Actions triggered\n<i>Automatic build pipeline</i>"]:::cicd
    D --> E["📦 Build & deploy\n<i>Pages published to CDN</i>"]:::cicd
    E --> F["🌐 Site is live!\n<i>johnspilotrosj.github.io</i>"]:::live

    classDef you fill:#EEEDFE,stroke:#534AB7,color:#3C3489,stroke-width:1px
    classDef git fill:#E1F5EE,stroke:#0F6E56,color:#085041,stroke-width:1px
    classDef cicd fill:#FAECE7,stroke:#993C1D,color:#712B13,stroke-width:1px
    classDef live fill:#E6F1FB,stroke:#185FA5,color:#0C447C,stroke-width:2px
```

> **Purple** = your actions &nbsp;|&nbsp; **Green** = Git &nbsp;|&nbsp; **Orange** = CI/CD pipeline &nbsp;|&nbsp; **Blue** = live site

## Quick start

1. Click the **Edit site** button on the welcome page (or go to this repo directly)
2. Edit `index.html` — change text, colors, or add new sections
3. Commit your changes to the `main` branch
4. GitHub Actions will automatically build and deploy your updated site
5. Your changes go live at `https://johnspilotrosj.github.io` within a few minutes

## File structure

```
├── index.html          # The welcome page (everything in one file)
├── README.md           # This file
```

## Customization tips

**Change the greeting** — Find `Hello, <em>John</em>.` in the HTML and swap in whatever you like.

**Change colors** — Edit the CSS variables in the `:root` block at the top of the `<style>` section. The three accent colors (purple, teal, coral) control the background orbs and highlights.

**Add new sections** — Copy the hero section structure and add content below it. The existing animations and styles will carry over.

**Dark mode** — The site automatically adapts to the visitor's system preference. Both palettes are defined in the CSS variables — the `@media (prefers-color-scheme: dark)` block handles the switch.

## Credits

Designed & developed by **Ethan Gardner**
