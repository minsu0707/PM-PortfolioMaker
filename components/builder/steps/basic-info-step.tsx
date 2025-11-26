"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { useLanguageContext } from "@/contexts/language-context"
import { getTranslation } from "@/lib/i18n"

interface BasicInfoStepProps {
  formData: any
  updateFormData: (key: string, value: any) => void
}

export default function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  const { language } = useLanguageContext()
  const t = (key: string) => getTranslation(language || "en", key)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData("profileImage", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t("form.basicInfo") || "Basic Information"}</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {formData.profileImage ? (
            <img
              src={formData.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload className="w-12 h-12 text-muted-foreground" />
          )}
        </div>
        <label className="px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold cursor-pointer transition-colors">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          {t("form.uploadPhoto") || "Upload Photo"}
        </label>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("form.fullNameRequired") || "Full Name *"}
        </label>
        <Input
          placeholder={t("form.fullName") || "Your name"}
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Major */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("form.majorFieldRequired") || "Major / Field *"}
        </label>
        <Input
          placeholder={t("form.majorField") || "e.g., Computer Science, Web Design"}
          value={formData.major}
          onChange={(e) => updateFormData("major", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("form.emailRequired") || "Email *"}
          </label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{t("form.github") || "GitHub"}</label>
          <Input
            placeholder="github.com/username"
            value={formData.github}
            onChange={(e) => updateFormData("github", e.target.value)}
          />
        </div>
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">{t("form.linkedin") || "LinkedIn"}</label>
        <Input
          placeholder="linkedin.com/in/username"
          value={formData.linkedin}
          onChange={(e) => updateFormData("linkedin", e.target.value)}
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">{t("form.aboutYou") || "About You"}</label>
        <Textarea
          placeholder={t("form.aboutYou") || "Write a brief introduction about yourself..."}
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
