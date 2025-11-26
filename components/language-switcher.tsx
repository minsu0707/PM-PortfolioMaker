"use client"

import { useLanguageContext } from "@/contexts/language-context"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
] as const

export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguageContext()
  const { theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full transition-colors ${
            theme === "dark"
              ? "hover:bg-slate-950 text-slate-400 hover:text-cyan-300"
              : "hover:bg-blue-50 text-slate-700 hover:text-blue-700"
          }`}
        >
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`${theme === "dark" ? "bg-slate-900 border-slate-700" : "bg-white"}`}>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code as any)}
            className={`cursor-pointer transition-colors ${
              language === lang.code
                ? theme === "dark"
                  ? "bg-cyan-600/30 text-cyan-300 font-semibold"
                  : "bg-blue-100 text-blue-700 font-semibold"
                : theme === "dark"
                  ? "text-slate-300 hover:bg-slate-800"
                  : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
