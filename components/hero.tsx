"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {isVisible && (
          <>
            <div className="animate-fadeInUp mb-6">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                Welcome to my portfolio
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              Creative Developer & Designer
            </h1>

            <p
              className="text-xl md:text-2xl text-muted mb-8 leading-relaxed animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              I craft beautiful, functional digital experiences with cutting-edge technology and thoughtful design
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
