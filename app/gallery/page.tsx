"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

interface Draft {
  id: string;
  name: string;
  email: string;
  lastSaved: string;
  data: any;
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [mounted, setMounted] = useState(false);

  const t = (key: string) => getTranslation(language || "en", key);

  useEffect(() => {
    const savedDrafts = localStorage.getItem("portfolioDrafts");
    if (savedDrafts) {
      try {
        setDrafts(JSON.parse(savedDrafts));
      } catch (e) {
        console.error("Error loading drafts:", e);
      }
    }
    setMounted(true);
  }, []);

  const handleLoadDraft = (draft: Draft) => {
    localStorage.setItem("portfolioFormData", JSON.stringify(draft.data));
    window.location.href = "/builder";
  };

  const handleDeleteDraft = (id: string) => {
    const updatedDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem("portfolioDrafts", JSON.stringify(updatedDrafts));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      language === "ko"
        ? "ko-KR"
        : language === "ja"
        ? "ja-JP"
        : language === "zh"
        ? "zh-CN"
        : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t("gallery.drafts") || "Drafts"}
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          {t("gallery.draftsSaved") || "Auto-saved portfolio drafts"}
        </p>

        {drafts.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-6">
              {t("gallery.noDrafts") ||
                "No saved drafts yet. Start creating your portfolio!"}
            </p>
            <Link
              href="/builder"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              {t("nav.builder") || "Build Portfolio"}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-card rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                  {draft.name || t("gallery.untitled") || "Untitled"}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {draft.email}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {t("gallery.lastSaved") || "Last saved:"}{" "}
                  {formatDate(draft.lastSaved)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoadDraft(draft)}
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors text-sm"
                  >
                    {t("gallery.continueDraft") || "Continue Editing"}
                  </button>
                  <button
                    onClick={() => handleDeleteDraft(draft.id)}
                    className="px-3 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
