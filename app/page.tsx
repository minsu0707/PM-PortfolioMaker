"use client"

import Link from "next/link"
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react"
import { useLanguageContext } from "@/contexts/language-context"
import { useTheme } from "@/hooks/use-theme"
import { getTranslation } from "@/lib/i18n"

export default function Home() {
  const { language } = useLanguageContext()
  const { theme } = useTheme()

  const t = (key: string) => getTranslation(language, key)

  const features = [
    {
      icon: Zap,
      title: t("features.pdf.title"),
      description: t("features.pdf.desc"),
    },
    {
      icon: Shield,
      title: t("features.print.title"),
      description: t("features.print.desc"),
    },
    {
      icon: Rocket,
      title: t("features.email.title"),
      description: t("features.email.desc"),
    },
  ]

  const stats = [
    { number: "10K+", label: t("stats.portfolios") },
    { number: "98%", label: t("stats.satisfaction") },
    { number: "2min", label: t("stats.time") },
    { number: "100%", label: t("stats.free") },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-white via-blue-50/30 to-white"
      }`}
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div
            className={`inline-block px-4 py-2 rounded-full border ${
              theme === "dark"
                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                : "bg-blue-100/60 border-blue-300/50 text-blue-700"
            }`}
          >
            <span className="text-sm font-medium">{t("hero.badge")}</span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-black text-balance leading-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {t("hero.title")}
          </h1>

          <p
            className={`text-lg md:text-xl text-balance max-w-2xl mx-auto ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/builder"
              className={`group px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                theme === "dark"
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {t("hero.cta1")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className={`px-8 py-4 rounded-full font-semibold transition-all border ${
                theme === "dark"
                  ? "border-slate-700 hover:bg-slate-800/50 text-slate-300"
                  : "border-slate-300 hover:bg-slate-100 text-slate-700"
              }`}
            >
              {t("hero.cta2")}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "dark" ? "border-t border-slate-800" : "border-t border-blue-100/50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-black text-center mb-16 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            {t("features.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border transition-all hover:scale-105 ${
                    theme === "dark"
                      ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/50"
                      : "bg-white/60 border-blue-100 hover:border-blue-300"
                  } backdrop-blur-sm`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      theme === "dark" ? "bg-cyan-500/20 text-cyan-400" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "dark"
            ? "bg-gradient-to-b from-transparent to-slate-900/30"
            : "bg-gradient-to-b from-transparent to-blue-50/30"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className={`text-4xl md:text-5xl font-black ${theme === "dark" ? "text-cyan-400" : "text-blue-600"}`}
                >
                  {stat.number}
                </div>
                <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mx-auto rounded-3xl p-12 text-center border ${
            theme === "dark"
              ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
              : "bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200"
          }`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {t("cta.title")}
          </h2>
          <p className={`mb-8 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{t("cta.description")}</p>
          <Link
            href="/builder"
            className={`inline-block px-8 py-3 rounded-full font-semibold transition-all ${
              theme === "dark"
                ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  )
}
