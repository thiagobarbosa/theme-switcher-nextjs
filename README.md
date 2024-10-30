# Geist-Inspired Theme Switcher

A beautifully designed theme switcher component for Next.js applications based on the Vercel's Geist design system.

## Features

- 💪 Written in TypeScript
- 🌗 Light/Dark/System theme support
- 🎨 Fully customizable with Tailwind
- 🔌 Easy integration with Next.js

## Installation

```bash
npx geist-theme-switcher@latest add theme-switcher
```

This will:
- Install all required dependencies
- Add the ThemeSwitcher component to your project

## Prerequisites

- Next.js 13+ with App Router
- Tailwind CSS

## Manual Installation

If you prefer to set things up manually:

1. Install the package and its peer dependencies:
```bash
npm install geist-theme-switcher next-themes @phosphor-icons/react clsx tailwind-merge
```

2. Copy the file `components/ThemeSwitcher.tsx` to your project.


## Usage

1. Make sure your `layout.tsx` file is wrapped with the `ThemeProvider` from `next-themes`, like in this example:
```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

2. Import the `ThemeSwitcher` component in your header, footer or any other component where you want to display the theme switcher:
```tsx
import { ThemeSwitcher } from 'geist-theme-switcher'

export default function Header() {
  return (
    <header>
      <ThemeSwitcher />
    </header>
  )
}
```

## Props

| Prop           | Type                                   | Default                      | Description            |
|----------------|----------------------------------------|------------------------------|------------------------|
| `defaultTheme` | `'light' \| 'dark' \| 'system'`        | `'system'`                   | Initial theme          |
| `themes`       | `Array<'light' \| 'dark' \| 'system'>` | `['light', 'dark', 'system']` | Available themes       |
| `size`         | `'sm' \| 'md' \| 'lg'`                 | `'sm'`    | Component size         |
| `className`    | `string`                               | `undefined`                  | Additional CSS classes |

## Customization

The component uses Tailwind CSS for styling and can be customized using the `className` prop:

```tsx
<ThemeSwitcher 
  size="md"
  className="bg-slate-100 dark:bg-slate-800" // custom background color
  themes={['light', 'dark']} // remove system theme
/>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Licensed under the MIT License.
