"use client";

import type React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { getTranslation } from "@/lib/i18n";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface ProjectsStepProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

export default function ProjectsStep({
  formData,
  updateFormData,
}: ProjectsStepProps) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = (key: string) => getTranslation(language || "en", key);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    period: "",
    status: "completed",
    roles: "",
    issue: "",
    logo: "",
    link: "",
    technologies: "",
  });

  const addProject = () => {
    if (editingIndex !== null) {
      const updatedProjects = [...formData.projects];
      updatedProjects[editingIndex] = newProject;
      updateFormData("projects", updatedProjects);
      setEditingIndex(null);
    } else {
      updateFormData("projects", [...formData.projects, newProject]);
    }
    setNewProject({
      title: "",
      description: "",
      period: "",
      status: "completed",
      roles: "",
      issue: "",
      logo: "",
      link: "",
      technologies: "",
    });
  };

  const deleteProject = (index: number) => {
    const updatedProjects = formData.projects.filter(
      (_: any, i: number) => i !== index
    );
    updateFormData("projects", updatedProjects);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const logoUrl = URL.createObjectURL(file);
      setNewProject({ ...newProject, logo: logoUrl });
    }
  };

  const editProject = (index: number) => {
    setNewProject(formData.projects[index]);
    setEditingIndex(index);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        {t("form.yourProjects") || "Your Projects"}
      </h2>

      <div className="space-y-3">
        {formData.projects.map((project: any, idx: number) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex items-center gap-4">
              {project.logo && (
                <img
                  src={project.logo}
                  alt={project.title}
                  className="w-10 h-10 rounded-md object-contain"
                />
              )}
              <div>
                <h3 className="font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.period}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editProject(idx)}
                className="px-3 py-1 text-sm bg-accent/20 hover:bg-accent/30 text-accent rounded transition-colors"
              >
                {t("form.edit") || "Edit"}
              </button>
              <button
                onClick={() => deleteProject(idx)}
                className="px-3 py-1 text-sm bg-destructive/20 hover:bg-destructive/30 text-destructive rounded transition-colors"
              >
                {t("form.delete") || "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-foreground">
          {editingIndex !== null
            ? t("form.editProject") || "Edit Project"
            : t("form.addNewProject") || "Add New Project"}
        </h3>

        <Input
          placeholder={t("form.projectTitle") || "Project Title *"}
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />

        <div className="space-y-2" data-color-mode={theme || "light"}>
          <label className="text-sm font-semibold text-foreground">
            {t("form.projectDescription") || "Project Description"}
          </label>
          <MDEditor
            value={newProject.description}
            onChange={(v) =>
              setNewProject({ ...newProject, description: v || "" })
            }
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder={
              t("form.projectPeriod") ||
              "Project Period (e.g., Jan 2024 - Mar 2024)"
            }
            value={newProject.period}
            onChange={(e) =>
              setNewProject({ ...newProject, period: e.target.value })
            }
          />
          <select
            value={newProject.status}
            onChange={(e) =>
              setNewProject({ ...newProject, status: e.target.value })
            }
            className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
          >
            <option value="completed">
              {t("form.completed") || "Completed"}
            </option>
            <option value="in-progress">
              {t("form.inProgress") || "In Progress"}
            </option>
          </select>
        </div>

        <div className="space-y-2" data-color-mode={theme || "light"}>
          <label className="text-sm font-semibold text-foreground">
            {t("form.roles") || "Roles"}
          </label>
          <MDEditor
            value={newProject.roles}
            onChange={(v) =>
              setNewProject({ ...newProject, roles: v || "" })
            }
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          />
        </div>

        <div className="space-y-2" data-color-mode={theme || "light"}>
          <label className="text-sm font-semibold text-foreground">
            {t("form.issue") || "Issue"}
          </label>
          <MDEditor
            value={newProject.issue}
            onChange={(v) => setNewProject({ ...newProject, issue: v || "" })}
            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          />
        </div>

        <Input
          placeholder={
            t("form.technologiesUsed") || "Technologies used (comma separated)"
          }
          value={newProject.technologies}
          onChange={(e) =>
            setNewProject({ ...newProject, technologies: e.target.value })
          }
        />
        <Input
          placeholder={t("form.projectLink") || "Project Link"}
          value={newProject.link}
          onChange={(e) =>
            setNewProject({ ...newProject, link: e.target.value })
          }
        />

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("form.projectLogo") || "Project Logo"}
          </label>
          {newProject.logo && (
            <img
              src={newProject.logo}
              alt="Logo"
              className="w-20 h-20 object-contain rounded-lg mb-2"
            />
          )}
          <label className="inline-block px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-semibold cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Upload className="w-4 h-4 inline mr-2" />
            {t("form.uploadLogo") || "Upload Logo"}
          </label>
        </div>

        <button
          onClick={addProject}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
        >
          {editingIndex !== null
            ? t("form.updateProject") || "Update Project"
            : t("form.addProject") || "+ Add Project"}
        </button>
      </div>
    </div>
  );
}
