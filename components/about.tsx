"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 px-4 bg-card/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-foreground">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div ref={ref} className={`space-y-6 ${isVisible ? "animate-slideInLeft" : "opacity-0"}`}>
            <p className="text-lg text-muted leading-relaxed">
              I'm a passionate developer with 5+ years of experience building beautiful, functional web applications. My
              journey started with a curiosity about how things work, and it evolved into a career focused on creating
              exceptional digital experiences.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              I specialize in modern web technologies including React, TypeScript, and Next.js. I believe that great
              design and clean code are not mutually exclusive – they complement each other to create truly remarkable
              products.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "40+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "100%", label: "Dedication" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
