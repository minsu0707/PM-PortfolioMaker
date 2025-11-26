"use client"

import { useRef, useEffect, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export default function Projects() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
      tags: ["React", "Next.js", "Stripe", "PostgreSQL"],
      image: "/ecommerce-platform-concept.png",
      link: "#",
    },
    {
      id: 2,
      title: "AI Chat Application",
      description: "Intelligent chatbot with natural language processing and real-time conversation capabilities.",
      tags: ["TypeScript", "AI/ML", "Socket.io", "React"],
      image: "/ai-chat-app.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Interactive data visualization dashboard with real-time metrics and custom reporting.",
      tags: ["D3.js", "React", "Node.js", "MongoDB"],
      image: "/analytics-dashboard.png",
      link: "#",
    },
    {
      id: 4,
      title: "Mobile App",
      description: "Cross-platform mobile application with offline support and push notifications.",
      tags: ["React Native", "Firebase", "TypeScript"],
      image: "/mobile-app-showcase.png",
      link: "#",
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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-foreground">Featured Projects</h2>

        <div ref={ref} className={`grid md:grid-cols-2 gap-8 ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}>
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="group relative overflow-hidden rounded-lg border border-border bg-card/50 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="aspect-video overflow-hidden bg-card">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <p className="text-muted mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/0 to-primary/10 pointer-events-none"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
