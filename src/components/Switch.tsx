import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

export default function SwitchBox() {

  const [darkMode, setDarkMode] = useState(
    window.localStorage.getItem('darkMode')
      ? window.localStorage.getItem('darkMode') === 'light'
        ? false
        : true
      : false
  )

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  return (
    <Switch
      checked={darkMode}
      onChange={toggleDarkMode}
      className={`${darkMode ? 'bg-gray-700' : 'bg-orange-300'}
          relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className='sr-only'>Use setting</span>
      <span
        aria-hidden='true'
        className={`${darkMode ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  )
}
