import { createElement } from "react"
import { FaPython ,FaRProject,FaReact , FaRust ,FaJava,FaHtml5} from "react-icons/fa"
import {GiCamel} from "react-icons/gi"
import {SiJavascript} from "react-icons/si"
import { AiFillDatabase } from "react-icons/ai";


import { ImFacebook, ImInstagram, ImLinkedin2, ImYoutube, ImTwitter, ImGithub } from "react-icons/im"
import { SiGooglescholar,SiLoop,SiResearchgate,SiOrcid,SiMoleculer,SiLatex ,SiAdobeillustrator,SiAdobeindesign,SiAdobephotoshop,SiAdobeaftereffects,SiAdobeaudition,SiAdobepremierepro} from 'react-icons/si'
import {GiDna2,GiDna1,GiMolecule,GiAtom} from "react-icons/gi"
import {MdBiotech} from "react-icons/md"

export const skills = [
    {
        logo: createElement(FaPython, { className: "text-4xl " }),
        name: "Python",
        conf: "90%"
    },
    {
        logo: createElement(FaRProject, { className: "text-4xl " }) ,
        name: "R",
        conf: "75%"
    },
    {
        logo: createElement(FaReact, { className: "text-4xl " }) ,
        name: "React",
        conf: "60%"
    },
    {
        logo: createElement(FaRust, { className: "text-4xl " }) ,
        name: "Rust",
        conf: "50%"
    },
    {
        logo: createElement(GiCamel, { className: "text-4xl" }) ,
        name: "Perl",
        conf: "70%"
    },
    {
        logo: createElement(FaJava, { className: "text-4xl" }) ,
        name: "Java",
        conf: "40%"
    },

    {
        logo: createElement(SiJavascript, { className: "text-4xl" }) ,
        name: "Java Srcipt",
        conf: "65%"
    },
    {
        logo: createElement(FaHtml5, { className: "text-4xl" }) ,
        name: "HTML",
        conf: "65%"
    }
]


export const bioinformaticsSkills = [
    {
        logo: createElement(SiMoleculer, { className: "text-4xl " }),
        name: "Network Biology",
        conf: "70%"
    },
    {
        logo: createElement(GiDna2, { className: "text-4xl " }) ,
        name: "NGS",
        conf: "60%"
    },
    {
        logo: createElement(GiDna1, { className: "text-4xl " }) ,
        name: "Genome Assembly and Annotation",
        conf: "90%"
    },
    {
        logo: createElement(SiMoleculer, { className: "text-4xl " }) ,
        name: "Metabolic Network Modeling",
        conf: "75%"
    },
    {
        logo: createElement(AiFillDatabase, { className: "text-4xl " }) ,
        name: "Database Management & SQL",
        conf: "10%"
    },

]

export const cbSkills = [
    {
        logo: createElement(GiMolecule, { className: "text-4xl " }),
        name: "MD Simulation",
        conf: "80%"
    },
    {
        logo: createElement(MdBiotech, { className: "text-4xl " }) ,
        name: "Docking",
        conf: "75%"
    },
    {
        logo: createElement(FaReact, { className: "text-4xl " }) ,
        name: "QSAR",
        conf: "60%"
    },
    {
        logo: createElement(GiAtom, { className: "text-4xl " }) ,
        name: "Cheminformatics",
        conf: "74%"
    },

]

export const key_skills = [
    {
        name: "AI",
        group: "Intelligence"
    },
    {
        name: "ML",
        group: "Intelligence"
    },
    {
        name: "HGNN",
        group: "Graph AI"
    },
    {
        name: "Mathematical Modelling",
        group: "Modelling"
    },
    {
        name: "Programming",
        group: "Engineering"
    },
    {
        name: "Python",
        group: "Engineering"
    },
    {
        name: "Network Biology",
        group: "Graph AI"
    },
    {
        name: "Computational Biology",
        group: "Life Science"
    },

    {
        name: "Drug Synergy Prediction",
        group: "Translation"
    },
    
    {
        name: "Workflow Automation",
        group: "Engineering"
    },
    {
        name: "Graph Analytics",
        group: "Graph AI"
    },

]

export const currentResearchFocus = {
    title: "Current Research Focus",
    detail: "Development of hetero-GNNs for high-fidelity drug synergy prediction"
}

export const otherSkills = [
    {
        logo: createElement(SiLatex, { className: "text-4xl " }),
        name: "Latex",
        conf: "90%"
    },
    {
        logo: createElement(SiAdobeillustrator, { className: "text-4xl " }) ,
        name: "Illustrator",
        conf: "80%"
    },
    {
        logo: createElement(SiAdobeindesign, { className: "text-4xl " }) ,
        name: "InDesign",
        conf: "65%"
    },
    {
        logo: createElement(SiAdobephotoshop, { className: "text-4xl " }) ,
        name: "Photoshop",
        conf: "95%"
    },
    {
        logo: createElement(SiAdobeaftereffects, { className: "text-4xl" }) ,
        name: "After Effects",
        conf: "75%"
    },
    {
        logo: createElement(SiAdobeaudition, { className: "text-4xl" }) ,
        name: "Audition",
        conf: "80%"
    },

    {
        logo: createElement(SiAdobepremierepro, { className: "text-4xl" }) ,
        name: "Premier",
        conf: "84%"
    }
]

export const socialDetails = [
    {
        logo: createElement(ImFacebook),
        name: "Facebook",
        link: "https://www.facebook.com/bineetX/"
    },
    {
        logo: createElement(ImInstagram),
        name: "Instagram",
        link: "https://www.instagram.com/mr_bineet/"
    },
    {
        logo: createElement(ImLinkedin2),
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/bineetx/"
    },
    {
        logo: createElement(ImYoutube),
        name: "YouTube",
        link: "https://www.youtube.com/c/BioinformaticaYT"
    },
    {
        logo: createElement(ImTwitter),
        name: "Twitter",
        link: "https://twitter.com/mr_bineet"
    },
    {
        logo: createElement(ImGithub),
        name: "Github",
        link: "https://github.com/BineetX"
    },
]

export const academicDetails = [
    {
        logo: createElement(SiGooglescholar),
        name: "Google Scholar",
        link: "https://scholar.google.com/citations?hl=en&user=9FZtto0AAAAJ"
    },
    {
        logo: createElement(SiOrcid),
        name: "Orcid",
        link: "https://orcid.org/my-orcid?orcid=0000-0002-2447-701X"
    },
    {
        logo: createElement(SiLoop),
        name: "Loop",
        link: "https://loop.frontiersin.org/people/1897405/overview"
    },
    {
        logo: createElement(SiResearchgate),
        name: "Research Gate",
        link: "https://www.researchgate.net/profile/Bineet-Kumar-Mohanta"
    },
]

export const publications = [
    {
        id: "jak1-ensemble-docking-2026",
        title: "Exploration of Novel Chemical Spaces to Discover JAK1 Inhibitors: An Ensemble Docking-Guided Deep Learning Approach",
        authors: "Baddipadige Raju, Gera Narendra, Bineet Kumar Mohanta, Anshuman Dixit",
        journal: "ACS Omega",
        year: 2026,
        type: "Article",
        doi: "https://doi.org/10.1021/acsomega.5c10773",
        tags: ["Drug Discovery", "Machine Learning", "Molecular Docking", "JAK1"],
    },
    {
        id: "computational-genomics-chapter-2026",
        title: "Computational Genomics Concept and Its Utilization",
        authors: "Priyanshu Nema, Bineet Kumar Mohanta, Sushil K. Kashaw, Anshuman Dixit",
        journal: "Bioinformatics, Computational Chemistry, and AI in Drug Innovation: Advances and Applications",
        year: 2026,
        type: "Book Chapter",
        doi: "https://www.researchgate.net/profile/Anshuman-Dixit",
        tags: ["Computational Genomics", "Bioinformatics", "AI"],
    },
    {
        id: "gememiom-2024",
        title: "GeMemiOM: the curated database on genes, putative methylation study targets, and microRNA targets for otitis media",
        authors: "Kondyarpu Abhishek, Bineet Kumar Mohanta, Pratima Kumari, Anshuman Dixit, Puppala Venkat Ramchander",
        journal: "Journal of Genetics and Genomics",
        year: 2024,
        type: "Research Communication",
        doi: "https://doi.org/10.1016/j.jgg.2023.07.010",
        tags: ["Database", "Genomics", "Epigenetics", "Otitis Media"],
    },
    {
        id: "oscc-targets-2022",
        title: "Identification of therapeutically potential targets and their ligands for the treatment of OSCC",
        authors: "Pratima Kumari, Sugandh Kumar, Madhusmita Sethy, Shyamlal Bhue, Bineet Kumar Mohanta, Anshuman Dixit",
        journal: "Frontiers in Oncology",
        year: 2022,
        type: "Original Research",
        doi: "https://doi.org/10.3389/fonc.2022.910494",
        tags: ["Cancer", "Network Biology", "Drug Discovery", "Bioinformatics"],
    },
]


export const achievements = [
    {
        title: "Qualified NET-JRF",
        agency: "CSIR, Govt of India",
        year: 2019
    },
    {
        title: "Qualified GATE XL",
        agency: "IIT-Delhi",
        year: 2020
    },
    {
        title: "Participated in the \"Global Immunology Summit\", International",
        agency: "BRIC-Institute of Life Sciences (ILS)",
        year: 2026
    },
    {
        title: "Organised \"Whole Genome Sequencing Analysis Workshop\"",
        agency: "BRIC-Institute of Life Sciences (ILS)",
        year: 2026
    },
    {
        title: "Certificate of Participation for \"Ocean of Opportunity: Marine Bioresources for a Better Tomorrow\"",
        agency: "BRIC-Institute of Life Sciences (ILS)",
        year: 2025
    },
    {
        title: "Participated in the \"1st Computational Biology Conference.\"",
        agency: "Indian Biological Data Center (IBDC), Regional Biotechnology Center, Faridabad",
        year: 2025
    },
    {
        title: "Organised National \"Workshop on Drug Design and Discovery\" as co-convener",
        agency: "Institute of Life Sciences",
        year: 2022
    },
]


export const educations = [
    {
        inst : "Institute of Life Scineces",
        time : "2021-",
        degree : "Ph.D.",
        subject : "Computaional Biology and Bioinformatics",
        other: "",
        location : "Bhubaneswar, Odisha"
    },
    {
        inst : "Central University Of Punjab",
        time : "2018-2020",
        degree : "M.Sc",
        subject : "Bioinformatics",
        other: "",
        location : "Bathinda, Punjab"
    },
    {
        inst : "North Odisha University",
        time : "2015-2018",
        degree : "B.Sc.",
        subject : "Zoology",
        other: "",
        location : "Mayurbhanj, Odisha"
    },
    {
        inst : "Jupiter +2 Science College",
        time : "2010-2012",
        degree : "12th",
        subject : "Science",
        other: "",
        location : "Bhubaneswar, Odisha"
    },

]

