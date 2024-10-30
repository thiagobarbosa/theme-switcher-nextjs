'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { GearSix, Moon, Sun } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'system'
type Size = 'sm' | 'md' | 'lg'

interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultTheme?: Theme
  themes?: Theme[]
  size?: Size
  includeSystem?: boolean
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
                                                       className,
                                                       defaultTheme = 'system',
                                                       themes = ['light', 'dark', 'system'],
                                                       size = 'sm',
                                                       includeSystem = true,
                                                       ...props
                                                     }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // filter out system theme if includeSystem is false
  const filteredThemes = includeSystem
    ? themes
    : themes.filter(t => t !== 'system')
  
  // adjust defaultTheme if system is not included
  useEffect(() => {
    if (!includeSystem && theme === 'system') {
      setTheme('light')
    }
  }, [includeSystem, theme, setTheme])
  
  if (!mounted) {
    return null
  }
  
  const getIcon = (t: Theme): React.ReactNode => {
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 24 : 32
    switch (t) {
      case 'light':
        return <Sun size={iconSize} className="rounded-full"/>
      case 'dark':
        return <Moon size={iconSize} className="rounded-full"/>
      case 'system':
        return <GearSix size={iconSize} className="rounded-full"/>
    }
  }
  
  return (
    <div
      className={cn(
        'flex gap-1 rounded-full h-fit w-fit border border-zinc-200 bg-zinc-100 dark:bg-[#1F1F22] dark:border-zinc-600',
        className
      )}
      {...props}
    >
      {filteredThemes.map(t => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          className={cn(
            `${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'}`,
            'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium relative rounded-full bg-zinc-100 dark:bg-[#1F1F22]',
            theme === t
              ? `bg-white hover:bg-white text-zinc-700 dark:text-zinc-50 dark:bg-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-zinc-50 shadow-[0_0_0_1px_rgba(228,228,231,1)] dark:shadow-[0_0_0_1px_rgba(82,82,91,1)]`
              : 'text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
          )}
        >
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: theme === t ? 'scale(1.15)' : 'scale(1)'
            }}
          >
            {getIcon(t)}
          </div>
          <span className="sr-only">
            {t.charAt(0).toUpperCase() + t.slice(1)} theme
          </span>
        </button>
      ))}
    </div>
  )
}

export { ThemeSwitcher, type ThemeSwitcherProps }
