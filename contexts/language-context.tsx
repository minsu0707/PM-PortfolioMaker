"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isMounted, setIsMounted] = useState(false)

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
    setIsMounted(true)
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {isMounted ? children : null}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguageContext must be used within LanguageProvider")
  }
  return context
}
