import { useEffect, useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

type Theme = 'light' | 'dark'

const read = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

/** Sun/moon button. Starts from the device setting, then remembers the visitor's choice. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(read)

  // While the visitor has not chosen, follow changes of the device setting
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return
      } catch {
        // storage unavailable: keep following the device
      }
      const next: Theme = e.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage unavailable: the choice just lasts for this visit
    }
  }

  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-tint text-fg transition hover:bg-tint-2"
    >
      {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
    </button>
  )
}
