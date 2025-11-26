"use client"

import { Download, Printer, Mail } from "lucide-react"
import PortfolioPreview from "@/components/portfolio-preview"
import { useState } from "react"

interface PreviewAndExportStepProps {
  formData: any
}

export default function PreviewAndExportStep({ formData }: PreviewAndExportStepProps) {
  const [emailSent, setEmailSent] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById("portfolio-content")
    if (!element) return

    const html2pdf = (await import("html2pdf.js")).default
    const options = {
      margin: 10,
      filename: `${formData.name || "portfolio"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    }
    html2pdf().set(options).from(element).save()
  }

  const handleSendEmail = async () => {
    try {
      const response = await fetch("/api/send-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          name: formData.name,
          formData: formData,
        }),
      })

      if (response.ok) {
        setEmailSent(true)
        setTimeout(() => setEmailSent(false), 3000)
      }
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Preview & Export</h2>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 py-3 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold transition-colors"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>

        <button
          onClick={handleSendEmail}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
            emailSent ? "bg-green-500/20 text-green-600" : "bg-accent/20 hover:bg-accent/30 text-accent"
          }`}
        >
          <Mail className="w-5 h-5" />
          {emailSent ? "Sent!" : "Send Email"}
        </button>
      </div>

      {/* Portfolio Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-white text-black">
        <PortfolioPreview formData={formData} />
      </div>
    </div>
  )
}
