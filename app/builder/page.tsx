"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Download, Printer } from "lucide-react"
import { useLanguageContext } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"
import BasicInfoStep from "@/components/builder/steps/basic-info-step"
import ProjectsStep from "@/components/builder/steps/projects-step"
import SkillsStep from "@/components/builder/steps/skills-step"
import CertificationsStep from "@/components/builder/steps/certifications-step"
import PortfolioPreview from "@/components/portfolio-preview"

const INITIAL_FORM_DATA = {
  name: "",
  major: "",
  profileImage: "",
  email: "",
  github: "",
  linkedin: "",
  bio: "",
  projects: [],
  skills: [],
  certifications: [],
  awards: [],
}

export default function BuilderPage() {
  const { language } = useLanguageContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isMounted, setIsMounted] = useState(false)

  const t = (key: string) => getTranslation(language || "en", key)

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioFormData")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error loading saved data:", e)
      }
    }
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const autoSaveInterval = setInterval(() => {
      localStorage.setItem("portfolioFormData", JSON.stringify(formData))

      // Save to drafts list for gallery
      const drafts = JSON.parse(localStorage.getItem("portfolioDrafts") || "[]")
      const existingDraftIndex = drafts.findIndex((d: any) => d.id === "current-draft")

      const draftEntry = {
        id: "current-draft",
        name: formData.name || "Untitled Portfolio",
        email: formData.email,
        lastSaved: new Date().toISOString(),
        data: formData,
      }

      if (existingDraftIndex >= 0) {
        drafts[existingDraftIndex] = draftEntry
      } else {
        drafts.push(draftEntry)
      }

      localStorage.setItem("portfolioDrafts", JSON.stringify(drafts))
    }, 2000)

    return () => clearInterval(autoSaveInterval)
  }, [formData, isMounted])

  const translatedSteps = [
    {
      id: 1,
      title: t("builder.basicInfo") || "Basic Info",
      description: t("builder.basicInfoDesc") || "Your profile and contact info",
    },
    {
      id: 2,
      title: t("builder.projects") || "Projects",
      description: t("builder.projectsDesc") || "Showcase your work",
    },
    { id: 3, title: t("builder.skills") || "Skills", description: t("builder.skillsDesc") || "Technical skills" },
    {
      id: 4,
      title: t("builder.certs") || "Certifications",
      description: t("builder.certsDesc") || "Certificates & Awards",
    },
  ]

  const handleNext = () => {
    if (currentStep < translatedSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById("portfolio-preview-content")
    if (!element) return

    try {
      const html2pdf = (await import("html2pdf.js")).default
      const options = {
        margin: 10,
        filename: `${formData.name || "portfolio"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      }
      html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handlePrint = () => {
    const element = document.getElementById("portfolio-preview-content")
    if (!element) return

    const printWindow = window.open("", "", "height=600,width=800")
    if (printWindow) {
      printWindow.document.write(element.innerHTML)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <ProjectsStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <SkillsStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <CertificationsStep formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("form.buildYourPortfolio") || "Build Your Portfolio"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("form.stepOf") || "Step"} {currentStep} {t("form.of") || "of"} 4
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={!formData.name}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg font-semibold transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={handlePrint}
              disabled={!formData.name}
              className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 disabled:opacity-50 disabled:cursor-not-allowed text-accent rounded-lg font-semibold transition-colors text-sm"
            >
              <Printer className="w-4 h-4" />
              {t("builder.print") || "Print"}
            </button>
            <Link href="/" className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm">
              ← {t("nav.home") || "Home"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left: Form */}
        <div className="w-1/2 overflow-y-auto border-r border-border p-8">
          <div className="max-w-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex gap-2">
                {translatedSteps.map((step, idx) => {
                  if (idx < 4) {
                    return (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(step.id)}
                        className={`flex-1 py-2 px-3 rounded-lg transition-all text-sm ${
                          step.id <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        } ${step.id === currentStep ? "ring-2 ring-accent" : ""}`}
                      >
                        <div className="font-semibold text-xs">{step.title}</div>
                      </button>
                    )
                  }
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-card rounded-xl border border-border p-6 mb-8">{renderStep()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : "bg-border hover:bg-accent/20 text-foreground"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {t("form.previous") || "Previous"}
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === 4}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 4
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {t("form.next") || "Next"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Real-time Preview */}
        <div className="w-1/2 overflow-y-auto bg-muted/30">
          <div className="sticky top-0 bg-card/80 backdrop-blur border-b border-border px-6 py-3">
            <h3 className="font-semibold text-foreground text-sm">{t("form.livePreview") || "Live Preview"}</h3>
          </div>
          <div className="p-6">
            <div id="portfolio-preview-content" className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
              <PortfolioPreview formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
