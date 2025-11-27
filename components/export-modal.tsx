"use client";

import { X, Download } from "lucide-react";
import { useEffect, useRef } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
import { Theme } from "@/hooks/use-theme";
import { useLanguageContext } from "@/contexts/language-context";
import { getTranslation } from "@/lib/i18n";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: any;
  type: "pdf" | "print";
  theme?: Theme | null;
}

export default function ExportModal({
  isOpen,
  onClose,
  title,
  formData,
  type,
  theme,
}: ExportModalProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageContext();
  const t = (key: string) => getTranslation(language || "en", key);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        foreignObjectRendering: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      let heightLeft = imgHeight * ratio;
      let position = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight * ratio;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          position,
          imgWidth * ratio,
          imgHeight * ratio
        );
        heightLeft -= pdfHeight;
      }

      pdf.save(`${formData.name || "portfolio"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printWindow = window.open("", "", "width=1000,height=800");
      if (!printWindow) return;

      const htmlContent = previewRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${formData.name || "Portfolio"}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000; background: #fff; }
            @media print {
              body { margin: 0; padding: 20px; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div
            ref={previewRef}
            className="w-full bg-white text-black p-12 space-y-12 rounded-lg shadow-sm"
            data-color-mode={theme || "light"}
          >
            {/* Header */}
            <div className="flex gap-8 pb-8 border-b-2 border-gray-200">
              {formData.profileImage && (
                <img
                  src={formData.profileImage || "/placeholder.svg"}
                  alt={formData.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{formData.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{formData.major}</p>
                <p className="text-gray-700 mb-4">{formData.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {formData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {formData.email}
                    </div>
                  )}
                  {formData.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      {formData.github}
                    </div>
                  )}
                  {formData.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      {formData.linkedin}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            {formData.skills && formData.skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
                  {t("builder.skills") || "Skills"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {formData.certifications && formData.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
                  {t("builder.certs") || "Certifications"}
                </h2>
                <div className="space-y-2">
                  {formData.certifications.map((cert: any, idx: number) => (
                    <div key={idx} className="text-gray-700">
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {formData.awards && formData.awards.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
                  {t("form.awards") || "Awards"}
                </h2>
                <div className="space-y-2">
                  {formData.awards.map((award: any, idx: number) => (
                    <div key={idx} className="text-gray-700">
                      <p className="font-semibold">{award.name}</p>
                      <p className="text-sm text-gray-600">
                        {award.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {formData.projects && formData.projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
                  {t("builder.projects") || "Projects"}
                </h2>
                <div className="space-y-8">
                  {formData.projects.map((project: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-6">
                      <div className="flex items-center gap-4 mb-2">
                        {project.logo && (
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="w-12 h-12 rounded-lg object-contain"
                          />
                        )}
                        <div>
                          <h3 className="text-2xl font-bold">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {project.period} • {project.status}
                          </p>
                        </div>
                      </div>

                      {project.description && (
                        <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                          <MarkdownPreview
                            source={project.description}
                            rehypePlugins={[[rehypeSanitize]]}
                          />
                        </div>
                      )}
                      {project.roles && (
                        <div className="mb-3">
                          <strong className="text-sm">{t("form.roles")}:</strong>
                          <div className="prose prose-sm max-w-none text-gray-700">
                            <MarkdownPreview
                              source={project.roles}
                              rehypePlugins={[[rehypeSanitize]]}
                            />
                          </div>
                        </div>
                      )}
                      {project.issue && (
                        <div className="mb-3">
                          <strong className="text-sm">{t("form.issue")}:</strong>
                          <div className="prose prose-sm max-w-none text-gray-700">
                            <MarkdownPreview
                              source={project.issue}
                              rehypePlugins={[[rehypeSanitize]]}
                            />
                          </div>
                        </div>
                      )}
                      {project.technologies && (
                        <p className="text-sm mb-2">
                          <strong>{t("form.technologiesUsed")}:</strong>{" "}
                          {project.technologies}
                        </p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {project.link}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={type === "pdf" ? handleDownloadPDF : handlePrint}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {type === "pdf" ? "Download PDF" : "Print"}
          </button>
        </div>
      </div>
    </div>
  );
}
