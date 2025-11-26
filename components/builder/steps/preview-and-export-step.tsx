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

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "", "width=800,height=600")
    if (!printWindow) return

    const portfolioElement = document.getElementById("portfolio-content")
    if (!portfolioElement) return

    const htmlContent = portfolioElement.innerHTML

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.name || "Portfolio"}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; background: #fff; }
          .portfolio-section { margin-bottom: 20px; page-break-inside: avoid; }
          h2 { font-size: 18px; font-weight: bold; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #333; }
          h3 { font-size: 14px; font-weight: bold; margin-top: 10px; margin-bottom: 5px; }
          p { margin: 5px 0; }
          .contact-info { display: flex; gap: 20px; margin-bottom: 10px; flex-wrap: wrap; }
          .contact-item { display: flex; align-items: center; gap: 5px; }
          .project-item { margin-bottom: 15px; }
          .project-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px; }
          .tag { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
          @media print {
            body { margin: 0; }
            .portfolio-section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
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

      <div className="border border-border rounded-lg overflow-hidden bg-white text-black">
        <PortfolioPreview formData={formData} />
      </div>
    </div>
  )
}
