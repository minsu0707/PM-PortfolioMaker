"use client"

import { useCallback, useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguage] = useState<Language | null>(null)

  useEffect(() => {
    // Check localStorage first, then browser language
    const stored = localStorage.getItem("language") as Language | null
    if (stored) {
      setLanguage(stored)
    } else {
      const browserLang = navigator.language.split("-")[0] as Language
      const supportedLangs: Language[] = ["ko", "en", "ja", "zh"]
      const initialLang: Language = supportedLangs.includes(browserLang) ? browserLang : "en"
      setLanguage(initialLang)
      localStorage.setItem("language", initialLang)
    }
  }, [])

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }, [])

  return { language, changeLanguage }
}
