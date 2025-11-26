"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Let's Work Together</h2>
          <p className="text-lg text-muted">
            Have a project in mind? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 border border-border rounded-lg p-8">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted focus:border-primary focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted focus:border-primary focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 flex justify-center gap-6">
          {[
            { label: "Email", value: "hello@example.com" },
            { label: "LinkedIn", value: "@yourprofile" },
            { label: "GitHub", value: "@yourprofile" },
          ].map((contact) => (
            <div key={contact.label} className="text-center">
              <p className="text-sm text-muted mb-1">{contact.label}</p>
              <p className="text-foreground font-medium">{contact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
