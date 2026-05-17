import { FiDownload, FiExternalLink, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiGooglescholar, SiOrcid, SiResearchgate } from "react-icons/si";
import { siteContent } from "../../content/siteContent";
import Section from "../ui/Section";

const contactLinks = [
  { label: "GitHub", href: siteContent.links.github, icon: FiGithub },
  { label: "LinkedIn", href: siteContent.links.linkedin, icon: FiLinkedin },
  { label: "Google Scholar", href: siteContent.links.scholar, icon: SiGooglescholar },
  { label: "ORCID", href: siteContent.links.orcid, icon: SiOrcid },
  { label: "ResearchGate", href: siteContent.links.researchGate, icon: SiResearchgate },
];

export default function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Open a Channel"
      title="For research systems, collaboration, and computational biology conversations."
    >
      <div className="contact-layout">
        <div className="contact-card primary-contact">
          <FiMail aria-hidden="true" />
          <div>
            <span>Professional</span>
            <a href={`mailto:${siteContent.emails.professional}`}>{siteContent.emails.professional}</a>
          </div>
          <div>
            <span>Personal</span>
            <a href={`mailto:${siteContent.emails.personal}`}>{siteContent.emails.personal}</a>
          </div>
        </div>
        <div className="contact-grid">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a className="contact-link" href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
                <Icon aria-hidden="true" />
                <span>{link.label}</span>
                <FiExternalLink aria-hidden="true" />
              </a>
            );
          })}
          <a className="contact-link cv-link" href={siteContent.links.cv} target="_blank" rel="noopener noreferrer">
            <FiDownload aria-hidden="true" />
            <span>Download CV</span>
            <FiExternalLink aria-hidden="true" />
          </a>
        </div>
      </div>
      <footer className="site-footer">
        <span>Bineet Kumar Mohanta</span>
        <span>Computational biology interface, updated for a more living web.</span>
      </footer>
    </Section>
  );
}
