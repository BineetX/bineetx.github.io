import {
  academicDetails,
  achievements,
  bioinformaticsSkills,
  cbSkills,
  educations,
  otherSkills,
  publications,
  skills,
  socialDetails,
} from "../components/informations";

const linkByName = [...socialDetails, ...academicDetails].reduce((links, item) => {
  links[item.name.toLowerCase().replace(/\s+/g, "")] = item.link;
  return links;
}, {});

const educationTimeline = educations.map((item) => ({
  type: "Education",
  period: item.time === "2021-" ? "2021 - present" : item.time,
  title: `${item.degree}${item.subject ? `, ${item.subject}` : ""}`,
  place: `${item.inst}, ${item.location}`,
  detail:
    item.other ||
    `Academic training in ${item.subject || item.degree}, with a focus on biological questions, computational analysis, and research practice.`,
}));

const achievementTimeline = achievements.map((item) => ({
  type: "Achievement",
  period: String(item.year),
  title: item.title,
  place: item.agency,
  detail: `${item.title} - ${item.agency}.`,
}));

const technologyGroups = [
  {
    category: "Programming",
    items: skills.map((item) => item.name.replace("Java Srcipt", "JavaScript")),
    note: "Programming languages and interface tools used for scientific analysis and software building.",
  },
  {
    category: "Bioinformatics",
    items: bioinformaticsSkills.map((item) => item.name),
    note: "Sequencing, expression analysis, network biology, and computational genomics workflows.",
  },
  {
    category: "Computational Biology",
    items: cbSkills.map((item) => item.name),
    note: "Molecular simulation, docking, QSAR, and cheminformatics methods.",
  },
  {
    category: "Scientific Communication",
    items: otherSkills.map((item) => item.name),
    note: "Design, typesetting, and media tools for clear scientific communication.",
  },
];

export const siteContent = {
  name: "Bineet Kumar Mohanta",
  title:
    "Ph.D. scholar in Computational Biology and Bioinformatics at the Institute of Life Sciences, Bhubaneswar.",
  statement:
    "In my Doctoral Research I am developing graph-driven AI systems for drug synergy prediction. I also build scientific softwares, databases, and computational workflows and frameworks that turn complex biological data into scalable research platforms.",
  role: "Ph.D. Scholar | Computational Biologist | Researcher",
  categories: [
    { id: "about", label: "About Me", terminalPath: "/bineet/about.md" },
    { id: "skills", label: "Skills", terminalPath: "/bineet/skills.md" },
    { id: "education", label: "Education & Experience", terminalPath: "/bineet/education.md" },
    { id: "research", label: "Research", terminalPath: "/bineet/research" },
    { id: "contact", label: "Contact Me", terminalPath: "/bineet/contact.md" },
  ],
  about: {
    label: "About Me",
    summary:
      "I am Bineet Kumar Mohanta, working as Senior Reserach Fellow (Ph.D. Scholar) in computational biology and bioinformatics lab under Dr. Anshuman Dixit at the Institute of Life Sciences, Bhubaneswar.",
    focus:
      "My current research focus is on development of Machine Learning models for high-fidelity drug synergy prediction.",
  },
  metadata: [
    "Ph.D. Scholar",
    "Computational Biology",
    "Bioinformatics",
    "NGS Analysis",
    "Molecular Modeling",
    "Programming",
  ],
  highlights: [
    "Ph.D. scholar at the Institute of Life Sciences, Bhubaneswar.",
    "M.Sc. in Bioinformatics from Central University of Punjab.",
    "Experience across Python, R, React, Perl, JavaScript, LaTeX, and scientific design tools.",
    "Research interests include computational biology, bioinformatics workflows, network biology, docking, and molecular simulation.",
  ],
  identityStrip: [
    { label: "Current Position", value: "Senior Research Fellow(Ph.D.)" },
    { label: "Institute", value: "BRIC-Institute of Life Sciences, Bhubaneswar" },
    { label: "Domain", value: "Computational Biology and Bioinformatics" },
    { label: "Specialization", value: "Mathematical Modelling | Programming | Machine Learning" },
  ],
  projects: [
    {
      title: "Network Biology Workflows",
      eyebrow: "research focus",
      description:
        "Computational exploration of biological relationships using network-oriented thinking and bioinformatics data.",
      breakdown: {
        focus: "Biological networks and interpretation.",
        methods: "Python, R, data processing, visualization.",
        value: "Clearer computational views of biological relationships.",
      },
      tags: ["network biology", "bioinformatics", "visualization"],
    },
    {
      title: "NGS and Expression Analysis",
      eyebrow: "bioinformatics workflow",
      description:
        "Experience with sequencing-oriented workflows and expression analysis tools used in biological data interpretation.",
      breakdown: {
        focus: "Differential expression and sequencing data.",
        methods: "DESeq, edgeR, STAR, R, Python.",
        value: "Reproducible analysis and interpretable output.",
      },
      tags: ["NGS", "DESeq", "edgeR", "STAR"],
    },
    {
      title: "Molecular Modeling",
      eyebrow: "computational biology",
      description:
        "Use of computational biology tools for docking, molecular dynamics simulation, QSAR, and cheminformatics analysis.",
      breakdown: {
        focus: "Molecule-level biological questions.",
        methods: "Docking, MD simulation, QSAR.",
        value: "Computational support for molecular interpretation.",
      },
      tags: ["docking", "MD simulation", "QSAR"],
    },
    {
      title: "Research Communication",
      eyebrow: "portfolio and design",
      description:
        "Combining scientific writing, design tools, programming, and web interfaces to communicate research clearly.",
      breakdown: {
        focus: "Scientific communication and presentation.",
        methods: "LaTeX, React, Adobe tools.",
        value: "Professional presentation of technical work.",
      },
      tags: ["LaTeX", "React", "design"],
    },
  ],
  technologies: [
    ...technologyGroups,
    {
      category: "AI / ML",
      items: ["PyTorch", "graph neural networks", "network biology", "prediction frameworks"],
      note: "Modeling patterns for biological structure and context.",
    },
    {
      category: "Data Systems",
      items: ["PostgreSQL", "API design", "search interfaces", "scientific schemas"],
      note: "Structured storage and queryable scientific knowledge systems.",
    },
    {
      category: "Workflow / Infrastructure",
      items: ["Docker", "Snakemake", "HPC / Slurm", "GPU experimentation"],
      note: "Execution environments for reproducible and scalable computation.",
    },
  ],
  timeline: [...educationTimeline, ...achievementTimeline],
  achievements,
  emails: {
    professional: "bineet@ils.res.in",
    personal: "bineetkumarmohanta@gmail.com",
  },
  links: {
    cv: "/assets/bineet_resume.pdf",
    github: linkByName.github,
    linkedin: linkByName.linkedin,
    scholar: linkByName.googlescholar,
    orcid: linkByName.orcid,
    researchGate: linkByName.researchgate,
    youtube: linkByName.youtube,
    twitter: linkByName.twitter,
  },
  socialProfiles: socialDetails.map(({ name, link }) => ({ name, link })),
  academicProfiles: academicDetails.map(({ name, link }) => ({ name, link })),
  publications: publications.map((item) => ({
    ...item,
    link: item.doi,
  })),
};

siteContent.systems = siteContent.projects;
siteContent.philosophy = siteContent.highlights;

export const terminalFiles = {
  "/bineet/README.md": `# Bineet Kumar Mohanta

${siteContent.role}

${siteContent.title}

${siteContent.statement}

Quick commands:
- open about.md
- open skills.md
- open education.md
- ls research
- publications
- contact
- download cv`,
  "/bineet/about.md": `# About Me

${siteContent.about.summary}

${siteContent.about.focus}

Highlights:
${siteContent.highlights.map((item) => `- ${item}`).join("\n")}`,
  "/bineet/skills.md": siteContent.technologies
    .map((group) => `# ${group.category}\n${group.note}\n- ${group.items.join("\n- ")}`)
    .join("\n\n"),
  "/bineet/education.md": siteContent.timeline
    .map((item) => `# ${item.period} :: ${item.type} :: ${item.title}\n${item.place}\n${item.detail}`)
    .join("\n\n"),
  "/bineet/contact.md": `# Contact Me

Professional: ${siteContent.emails.professional}
Personal: ${siteContent.emails.personal}

GitHub: ${siteContent.links.github}
LinkedIn: ${siteContent.links.linkedin}
Google Scholar: ${siteContent.links.scholar}
ORCID: ${siteContent.links.orcid}
ResearchGate: ${siteContent.links.researchGate}
CV: ${siteContent.links.cv}`,
  "/bineet/research.md": `# Research

${siteContent.publications.map((item) => `- ${item.year} | ${item.title} | ${item.journal}`).join("\n")}`,
  "/bineet/publications.md": `# Publications

${siteContent.publications
  .map((item) => `## ${item.year} :: ${item.title}\n${item.authors}\n${item.journal}\n${item.type}\n${item.link}\nTags: ${item.tags.join(" / ")}`)
  .join("\n\n")}`,
  "/bineet/links/scholar.url": siteContent.links.scholar,
  "/bineet/links/github.url": siteContent.links.github,
  "/bineet/links/linkedin.url": siteContent.links.linkedin,
  "/bineet/links/orcid.url": siteContent.links.orcid,
  "/bineet/cv/bineet_resume.pdf": siteContent.links.cv,
};
