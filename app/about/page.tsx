"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import { CheckCircle, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !language) return null;

  const t = (key: string) => getTranslation(language, key);

  const benefits = [
    t("about.benefit1") || "Easy to use interface",
    t("about.benefit2") || "Multiple export options",
    t("about.benefit3") || "Multi-language support",
    t("about.benefit4") || "Beautiful templates",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
        <p className="text-muted-foreground text-lg mb-12">
          Learn more about PortfolioMaker
        </p>

        {/* Mission Section */}
        {/* <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("about.mission") || "Our Mission"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("about.missionDesc") ||
              "We help professionals create stunning portfolios effortlessly."}
          </p>

          <h3 className="text-xl font-bold text-foreground mb-4">
            {t("about.features") || "Key Features"}
          </h3>
          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Creator Section */}
        <div className="bg-card rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Creator</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                민수 최 (Minsu Choi)
              </h3>
              <p className="text-muted-foreground mb-4">
                우아한 솔루션과 아름다운 사용자 경험을 만드는 데 열정을 가진
                프론트엔드 개발자입니다.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <Link
                  href="mailto:mando4137@gmail.com"
                  className="text-blue-600 dark:text-cyan-400 hover:underline transition-colors"
                >
                  mando4137@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-accent flex-shrink-0" />
                <Link
                  href="https://github.com/minsu0707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-cyan-400 hover:underline transition-colors"
                >
                  github.com/minsu0707
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-accent flex-shrink-0" />
                <Link
                  href="https://www.linkedin.com/in/%EB%AF%BC%EC%88%98-%EC%B5%9C-562555331/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-cyan-400 hover:underline transition-colors"
                >
                  LinkedIn Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
