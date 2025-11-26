"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

interface CertificationsStepProps {
  formData: any
  updateFormData: (key: string, value: any) => void
}

export default function CertificationsStep({ formData, updateFormData }: CertificationsStepProps) {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language || "en", key)

  const [newCert, setNewCert] = useState({ name: "", issuer: "", date: "" })
  const [newAward, setNewAward] = useState({ name: "", description: "", date: "" })

  const addCertification = () => {
    if (newCert.name.trim()) {
      updateFormData("certifications", [...formData.certifications, newCert])
      setNewCert({ name: "", issuer: "", date: "" })
    }
  }

  const addAward = () => {
    if (newAward.name.trim()) {
      updateFormData("awards", [...formData.awards, newAward])
      setNewAward({ name: "", description: "", date: "" })
    }
  }

  const deleteCert = (index: number) => {
    updateFormData(
      "certifications",
      formData.certifications.filter((_: any, i: number) => i !== index),
    )
  }

  const deleteAward = (index: number) => {
    updateFormData(
      "awards",
      formData.awards.filter((_: any, i: number) => i !== index),
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">
        {t("form.certificationsAwards") || "Certifications & Awards"}
      </h2>

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{t("form.certifications") || "Certifications"}</h3>

        <div className="space-y-3">
          {formData.certifications.map((cert: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
            >
              <div>
                <p className="font-semibold text-foreground">{cert.name}</p>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
              <button onClick={() => deleteCert(idx)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-dashed border-border">
          <Input
            placeholder={t("form.certificationName") || "Certification Name *"}
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
          />
          <Input
            placeholder={t("form.issuingOrganization") || "Issuing Organization"}
            value={newCert.issuer}
            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
          />
          <Input type="date" value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })} />
          <button
            onClick={addCertification}
            className="w-full py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold transition-colors"
          >
            {t("form.addCertification") || "+ Add Certification"}
          </button>
        </div>
      </div>

      {/* Awards */}
      <div className="space-y-4 border-t border-border pt-8">
        <h3 className="text-lg font-semibold text-foreground">{t("form.awards") || "Awards & Recognition"}</h3>

        <div className="space-y-3">
          {formData.awards.map((award: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
            >
              <div>
                <p className="font-semibold text-foreground">{award.name}</p>
                <p className="text-sm text-muted-foreground">{award.description}</p>
              </div>
              <button onClick={() => deleteAward(idx)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-dashed border-border">
          <Input
            placeholder={t("form.awardName") || "Award Name *"}
            value={newAward.name}
            onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
          />
          <Input
            placeholder={t("form.description") || "Description"}
            value={newAward.description}
            onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
          />
          <Input
            type="date"
            value={newAward.date}
            onChange={(e) => setNewAward({ ...newAward, date: e.target.value })}
          />
          <button
            onClick={addAward}
            className="w-full py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold transition-colors"
          >
            {t("form.addAward") || "+ Add Award"}
          </button>
        </div>
      </div>
    </div>
  )
}
