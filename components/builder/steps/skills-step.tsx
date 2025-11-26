"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

interface SkillsStepProps {
  formData: any
  updateFormData: (key: string, value: any) => void
}

export default function SkillsStep({ formData, updateFormData }: SkillsStepProps) {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language || "en", key)

  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    if (skillInput.trim()) {
      updateFormData("skills", [...formData.skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (index: number) => {
    updateFormData(
      "skills",
      formData.skills.filter((_: any, i: number) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t("form.technicalSkills") || "Technical Skills"}</h2>

      {/* Skill Input */}
      <div className="flex gap-2">
        <Input
          placeholder={t("form.technicalSkills") || "Add a skill (e.g., React, TypeScript, Python)"}
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addSkill()
            }
          }}
        />
        <button
          onClick={addSkill}
          className="px-6 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold transition-colors whitespace-nowrap"
        >
          {t("form.addSkill") || "Add"}
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {formData.skills.map((skill: string, idx: number) => (
          <div
            key={idx}
            className="p-3 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-between group hover:bg-accent/20 transition-colors"
          >
            <span className="font-medium text-foreground">{skill}</span>
            <button
              onClick={() => removeSkill(idx)}
              className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {formData.skills.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          {t("form.addYourFirstSkill") || "Add your first skill to get started"}
        </p>
      )}
    </div>
  )
}
