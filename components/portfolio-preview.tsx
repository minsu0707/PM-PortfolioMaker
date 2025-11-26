import { Mail, Github, Linkedin, ExternalLink } from "lucide-react"

interface PortfolioPreviewProps {
  formData: any
}

export default function PortfolioPreview({ formData }: PortfolioPreviewProps) {
  return (
    <div id="portfolio-content" className="w-full bg-white text-black p-12 space-y-12">
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

      {/* Projects */}
      {formData.projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Projects</h2>
          <div className="space-y-6">
            {formData.projects.map((project: any, idx: number) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.period} • {project.status}
                </p>
                {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}
                {project.responsibilities && (
                  <p className="text-sm mb-2">
                    <strong>Responsibilities:</strong> {project.responsibilities}
                  </p>
                )}
                {project.issues && (
                  <p className="text-sm mb-2">
                    <strong>Challenges:</strong> {project.issues}
                  </p>
                )}
                {project.technologies && (
                  <p className="text-sm mb-2">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                )}
                {project.link && (
                  <a href={project.link} className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                    View Project <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {formData.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill: string, idx: number) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {formData.certifications.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Certifications</h2>
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
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Awards</h2>
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
    </div>
  )
}
