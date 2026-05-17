export const sections = [
  { id: "about", label: "About Me" },
  { id: "technology", label: "Skills" },
  { id: "timeline", label: "Education & Experience" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact Me" },
];

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
