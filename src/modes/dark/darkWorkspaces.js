import { FiActivity, FiBookOpen, FiCode, FiDownload, FiMail, FiUser } from "react-icons/fi";
import { siteContent } from "../../content/siteContent";

export const darkWorkspaces = [
  {
    id: "about",
    label: "About Me",
    icon: FiUser,
    title: siteContent.name,
    kicker: siteContent.role,
    statement: siteContent.about.summary,
    telemetry: ["SECTION: ABOUT ME", "CURRENT: PH.D. SCHOLAR", "INSTITUTE: ILS BHUBANESWAR"],
    tags: siteContent.metadata,
    related: siteContent.highlights,
  },
  {
    id: "skills",
    label: "Skills",
    icon: FiCode,
    title: "Skills for bioinformatics, analysis, and research communication",
    kicker: "Programming, bioinformatics, computational biology, and design tools",
    statement:
      "A practical skill set built around scientific analysis: coding, NGS workflows, molecular modeling, statistics-oriented tools, and clear visual communication.",
    telemetry: ["SECTION: SKILLS", "TOOLS: PYTHON / R / REACT", "FOCUS: RESEARCH WORKFLOWS"],
    tags: siteContent.technologies.map((group) => group.category),
    related: siteContent.technologies.flatMap((group) => group.items).slice(0, 8),
  },
  {
    id: "education",
    label: "Education",
    icon: FiBookOpen,
    title: "Education and experience",
    kicker: "Academic training and current research formation",
    statement:
      "The path moves from biological foundations to formal bioinformatics training and current doctoral research in computational biology.",
    telemetry: ["SECTION: EDUCATION", "STATUS: PH.D. ONGOING", "FIELD: COMPUTATIONAL BIOLOGY"],
    tags: ["Ph.D.", "M.Sc. Bioinformatics", "B.Sc. Zoology", "Research experience"],
    related: siteContent.timeline.map((item) => item.title),
  },
  {
    id: "research",
    label: "Research",
    icon: FiActivity,
    title: "Research outputs and publications",
    kicker: "Publication record from informations.js",
    statement:
      "Research entries are sourced from the publication list and can be updated from the central portfolio information file.",
    telemetry: ["SECTION: RESEARCH", `PUBLICATIONS: ${siteContent.publications.length}`, "SOURCE: INFORMATIONS.JS"],
    tags: [...new Set(siteContent.publications.flatMap((item) => item.tags))].slice(0, 8),
    related: siteContent.publications.map((item) => item.title),
  },
  {
    id: "contact",
    label: "Contact Me",
    icon: FiMail,
    title: "Contact me or download my CV",
    kicker: "Email, academic profiles, code, and CV",
    statement:
      "Use the links here for academic profiles, code, CV, or direct email related to computational biology and bioinformatics work.",
    telemetry: ["SECTION: CONTACT", "EMAIL: AVAILABLE", "CV: DOWNLOADABLE"],
    tags: ["Email", "GitHub", "LinkedIn", "Google Scholar", "ORCID", "CV"],
    related: [siteContent.emails.professional, siteContent.links.github, siteContent.links.scholar],
    iconAction: FiDownload,
  },
];
