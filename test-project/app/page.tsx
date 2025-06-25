import { ThemeSwitcher } from 'theme-switcher-nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Theme Switcher Test</h1>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Testing Different Sizes</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-20">Small:</span>
                <ThemeSwitcher size="sm" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20">Medium:</span>
                <ThemeSwitcher size="md" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20">Large:</span>
                <ThemeSwitcher size="lg" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Testing Theme Options</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-32">Light & Dark:</span>
                <ThemeSwitcher themes={['light', 'dark']} includeSystem={false} />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-32">All themes:</span>
                <ThemeSwitcher themes={['light', 'dark', 'system']} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Custom Styling</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-32">Custom bg:</span>
                <ThemeSwitcher className="bg-blue-100 dark:bg-blue-900" />
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Content Test</h2>
            <p className="mb-4">
              This is some sample content to test how the theme switching affects the overall appearance.
              The background should change from white to dark gray, and the text should invert accordingly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Card 1</h3>
                <p>This card should have a light gray background in light mode and dark gray in dark mode.</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">Card 2</h3>
                <p>Same styling as Card 1 to test consistency across components.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}