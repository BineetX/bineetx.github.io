import { siteContent, terminalFiles } from "../../content/siteContent";

export const tree = {
  name: "bineet",
  path: "/bineet",
  children: [
    { name: "README.md", path: "/bineet/README.md" },
    { name: "about.md", path: "/bineet/about.md" },
    { name: "skills.md", path: "/bineet/skills.md" },
    { name: "education.md", path: "/bineet/education.md" },
    { name: "research.md", path: "/bineet/research.md" },
    { name: "publications.md", path: "/bineet/publications.md" },
    { name: "contact.md", path: "/bineet/contact.md" },
    {
      name: "links",
      path: "/bineet/links",
      children: [
        { name: "scholar.url", path: "/bineet/links/scholar.url" },
        { name: "github.url", path: "/bineet/links/github.url" },
        { name: "linkedin.url", path: "/bineet/links/linkedin.url" },
        { name: "orcid.url", path: "/bineet/links/orcid.url" },
      ],
    },
    { name: "cv", path: "/bineet/cv", children: [{ name: "bineet_resume.pdf", path: "/bineet/cv/bineet_resume.pdf" }] },
  ],
};

export function listDirectory(path) {
  const node = findNode(path);
  if (!node?.children) return null;
  return node.children.map((child) => (child.children ? `${child.name}/` : child.name)).join("  ");
}

export function findNode(path, node = tree) {
  if (node.path === path) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNode(path, child);
    if (found) return found;
  }
  return null;
}

export function resolvePath(cwd, target = "") {
  if (!target || target === ".") return cwd;
  if (target.startsWith("/")) return target;
  const parts = `${cwd}/${target}`.split("/");
  const resolved = [];
  parts.forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") resolved.pop();
    else resolved.push(part);
  });
  return `/${resolved.join("/")}`;
}

export function renderTree(node = tree, prefix = "") {
  const lines = [`${prefix}${node.name}${node.children ? "/" : ""}`];
  node.children?.forEach((child, index) => {
    const connector = index === node.children.length - 1 ? "`- " : "|- ";
    lines.push(...renderTree(child, `${prefix}${connector}`));
  });
  return lines.join("\n");
}

export function executeCommand(rawCommand, state, setMode) {
  const command = rawCommand.trim();
  const [name, ...args] = command.split(/\s+/);
  const target = args.join(" ");

  if (!command) return { output: "", type: "muted" };

  switch (name.toLowerCase()) {
    case "help":
      return {
        output:
          "help, whoami, pwd, ls, ls research, tree, cd <folder>, cat <file>, open <file>, clear, date, links, contact, publications, fetch cv, download cv, theme dark|light|terminal, about, skills, education, research, exit, logout, echo <text>",
      };
    case "whoami":
      return { output: `${siteContent.name}\n${siteContent.role}\n${siteContent.title}` };
    case "pwd":
      return { output: state.cwd };
    case "ls": {
      const path = resolvePath(state.cwd, target);
      const output = listDirectory(path);
      return output ? { output } : { output: `ls: cannot access ${target || state.cwd}`, type: "error" };
    }
    case "tree":
      return { output: renderTree() };
    case "cd": {
      const path = resolvePath(state.cwd, target || "/bineet");
      const node = findNode(path);
      if (!node?.children) return { output: `cd: not a directory: ${target}`, type: "error" };
      return { output: `cwd -> ${path}`, cwd: path, type: "success" };
    }
    case "cat":
    case "open": {
      const path = resolvePath(state.cwd, target);
      const output = terminalFiles[path];
      if (!output) return { output: `${name}: no such file: ${target}`, type: "error" };
      return { output, openFile: path };
    }
    case "clear":
      return { clear: true };
    case "date":
      return { output: new Date().toString() };
    case "links":
      return {
        output: [
          ...siteContent.socialProfiles.map((item) => `${item.name}: ${item.link}`),
          ...siteContent.academicProfiles.map((item) => `${item.name}: ${item.link}`),
          `CV: ${siteContent.links.cv}`,
        ].join("\n"),
      };
    case "contact":
      return {
        output: `professional: ${siteContent.emails.professional}\npersonal: ${siteContent.emails.personal}\ncv: ${siteContent.links.cv}`,
      };
    case "fetch":
    case "download":
      if (target === "cv") {
        window.open(siteContent.links.cv, "_blank", "noopener,noreferrer");
        return { output: "CV request dispatched: /assets/bineet_resume.pdf", type: "success" };
      }
      return { output: `${name}: expected "cv"`, type: "error" };
    case "theme":
      if (["dark", "light", "terminal"].includes(target)) {
        setMode(target);
        return { output: `theme -> ${target}`, type: "success" };
      }
      return { output: "theme: choose dark, light, or terminal (Bioinformatician, Researcher, or Developer)", type: "error" };
    case "home":
      return { output: terminalFiles["/bineet/README.md"], openFile: "/bineet/README.md", type: "success" };
    case "about":
      return { output: terminalFiles["/bineet/about.md"], openFile: "/bineet/about.md", type: "success" };
    case "skills":
      return { output: terminalFiles["/bineet/skills.md"], openFile: "/bineet/skills.md", type: "success" };
    case "education":
      return { output: terminalFiles["/bineet/education.md"], openFile: "/bineet/education.md", type: "success" };
    case "research":
      return {
        output: terminalFiles["/bineet/research.md"],
        openFile: "/bineet/research.md",
        type: "success",
      };
    case "publications":
    case "publication":
    case "pubs":
      return {
        output: terminalFiles["/bineet/publications.md"],
        openFile: "/bineet/publications.md",
        type: "success",
      };
    case "exit":
    case "logout":
      window.dispatchEvent(new CustomEvent("portfolio:exit"));
      return { output: "session closed -> landing page", type: "success" };
    case "echo":
      return { output: target };
    case "sudo":
      return target === "hire-bineet"
        ? { output: "permission granted: open a channel, then build something rigorous.", type: "success" }
        : { output: "sudo: this workstation prefers thoughtful collaboration.", type: "error" };
    case "vim":
      return target === "cv"
        ? { output: "vim cv: read-only buffer. Try download cv.", type: "muted" }
        : { output: "vim: no file loaded", type: "error" };
    case "ping":
      return target === "biology"
        ? { output: "biology is alive: signal returned with noise, context, and wonder.", type: "success" }
        : { output: `ping: unknown host ${target}`, type: "error" };
    case "run":
      return target === "profile"
        ? { output: siteContent.highlights.join("\n"), type: "success" }
        : { output: "run: available script is profile", type: "error" };
    case "grep":
      return target === "meaning life"
        ? { output: "meaning: found between molecules, models, and the questions we dare to formalize.", type: "success" }
        : { output: "grep: pattern not indexed. Try grep meaning life.", type: "error" };
    default:
      return { output: `${name}: command not found. Type help.`, type: "error" };
  }
}
