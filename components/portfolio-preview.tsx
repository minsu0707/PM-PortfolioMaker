import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import rehypeSanitize from "rehype-sanitize";
import { Theme } from "@/hooks/use-theme";
import { useLanguageContext } from "@/contexts/language-context";
import { getTranslation } from "@/lib/i18n";

interface PortfolioPreviewProps {
  formData: any;
  theme?: Theme | null;
}

export default function PortfolioPreview({
  formData,
  theme,
}: PortfolioPreviewProps) {
  const { language } = useLanguageContext();
  const t = (key: string) => getTranslation(language || "en", key);

  return (
    <div
      id="portfolio-content"
      className="w-full bg-white text-black p-12 space-y-12"
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

          {/* Contact Info */}
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
      {formData.skills.length > 0 && (
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
      {formData.certifications.length > 0 && (
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
      {formData.awards.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
            {t("form.awards") || "Awards"}
          </h2>
          <div className="space-y-2">
            {formData.awards.map((award: any, idx: number) => (
              <div key={idx} className="text-gray-700">
                <p className="font-semibold">{award.name}</p>
                <p className="text-sm text-gray-600">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {formData.projects.length > 0 && (
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
                    <h3 className="text-2xl font-bold">{project.title}</h3>
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
  );
}
