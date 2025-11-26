"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggler } from "@/components/theme-toggler"

export function Header() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const { theme } = useNextTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !language) return null

  const t = (key: string) => getTranslation(language, key)

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/builder", label: t("builder") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        theme === "dark" ? "bg-slate-950/80 border-b border-slate-800/50" : "bg-white/80 border-b border-slate-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={`text-2xl font-bold bg-gradient-to-r ${
                theme === "dark"
                  ? "from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                  : "from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              }`}
            >
              PM
            </div>
            <span
              className={`hidden sm:inline text-sm font-semibold transition-colors group-hover:text-blue-600 ${
                theme === "dark"
                  ? "text-slate-200 group-hover:text-cyan-400"
                  : "text-slate-900 group-hover:text-blue-600"
              }`}
            >
              PortfolioMaker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                  isActive(link.href)
                    ? theme === "dark"
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-blue-50 text-blue-600 border border-blue-200"
                    : theme === "dark"
                      ? "text-slate-300 hover:text-cyan-400 hover:bg-slate-900/50"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggler />
            <Link
              href="/builder"
              className={`hidden sm:inline-block px-6 py-2 rounded-full hover:shadow-lg transition-all font-semibold text-sm ${
                theme === "dark"
                  ? "bg-cyan-500 text-white hover:bg-cyan-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {t("start")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                theme === "dark" ? "hover:bg-slate-900/50 text-slate-300" : "hover:bg-slate-100 text-slate-600"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className={`md:hidden pb-4 space-y-2 ${theme === "dark" ? "bg-slate-900/50" : "bg-slate-50"} rounded-b-lg`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive(link.href)
                    ? theme === "dark"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-blue-50 text-blue-600"
                    : theme === "dark"
                      ? "text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg hover:shadow-lg transition-all font-semibold text-center mt-4 ${
                theme === "dark"
                  ? "bg-cyan-500 text-white hover:bg-cyan-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {t("start")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
