"use client"

import { useRef, useEffect, useState } from "react"

interface Skill {
  category: string
  items: string[]
}

export default function Skills() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const skills: Skill[] = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "Vercel", "GitHub"],
    },
  ]

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
    <section id="skills" className="py-20 px-4 bg-card/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-foreground">Skills & Expertise</h2>

        <div ref={ref} className={`grid md:grid-cols-3 gap-8 ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">{skillGroup.category}</h3>
              <ul className="space-y-3">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-muted">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
