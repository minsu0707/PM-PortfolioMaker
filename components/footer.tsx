export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Portfolio</h3>
            <p className="text-sm text-muted">Creating beautiful digital experiences with modern technology.</p>
          </div>

          {[
            {
              title: "Navigation",
              links: ["Home", "About", "Projects", "Contact"],
            },
            {
              title: "Resources",
              links: ["Blog", "Documentation", "Guides", "FAQ"],
            },
            {
              title: "Social",
              links: ["Twitter", "LinkedIn", "GitHub", "Discord"],
            },
          ].map((group, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">&copy; {currentYear} Portfolio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
