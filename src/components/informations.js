import { FaPython ,FaRProject,FaReact , FaRust ,FaJava,FaHtml5} from "react-icons/fa"
import {GiCamel} from "react-icons/gi"
import {SiJavascript} from "react-icons/si"

import { ImFacebook, ImInstagram, ImLinkedin2, ImYoutube, ImTwitter, ImGithub } from "react-icons/im"
import { SiGooglescholar,SiLoop,SiResearchgate,SiOrcid,SiMoleculer,SiLatex ,SiAdobeillustrator,SiAdobeindesign,SiAdobephotoshop,SiAdobeaftereffects,SiAdobeaudition,SiAdobepremierepro} from 'react-icons/si'
import {GiDna2,GiDna1,GiMolecule,GiAtom} from "react-icons/gi"
import {MdBiotech} from "react-icons/md"

export const skills = [
    {
        logo:  <FaPython className="text-4xl "/>,
        name: "Python",
        conf: "90%"
    },
    {
        logo:  <FaRProject className="text-4xl "/> ,
        name: "R",
        conf: "75%"
    },
    {
        logo:  <FaReact className="text-4xl "/> ,
        name: "React",
        conf: "60%"
    },
    {
        logo:  <FaRust className="text-4xl "/> ,
        name: "Rust",
        conf: "50%"
    },
    {
        logo:  <GiCamel className="text-4xl" /> ,
        name: "Perl",
        conf: "70%"
    },
    {
        logo:  <FaJava className="text-4xl"/> ,
        name: "Java",
        conf: "40%"
    },

    {
        logo:  <SiJavascript className="text-4xl"/> ,
        name: "Java Srcipt",
        conf: "65%"
    },
    {
        logo:  <FaHtml5 className="text-4xl"/> ,
        name: "HTML",
        conf: "65%"
    }
]


export const bioinformaticsSkills = [
    {
        logo:  <SiMoleculer className="text-4xl "/>,
        name: "Network Biology",
        conf: "70%"
    },
    {
        logo:  <GiDna2 className="text-4xl "/> ,
        name: "NGS",
        conf: "60%"
    },
    {
        logo:  <GiDna1 className="text-4xl "/> ,
        name: "DeSeq",
        conf: "90%"
    },
    {
        logo:  <GiDna2 className="text-4xl "/> ,
        name: "Edgar",
        conf: "85%"
    },

]

export const cbSkills = [
    {
        logo:  <GiMolecule className="text-4xl "/>,
        name: "MD Simulation",
        conf: "80%"
    },
    {
        logo:  <MdBiotech className="text-4xl "/> ,
        name: "Docking",
        conf: "75%"
    },
    {
        logo:  <FaReact className="text-4xl "/> ,
        name: "QSAR",
        conf: "60%"
    },
    {
        logo:  <GiAtom className="text-4xl "/> ,
        name: "Cheminformatics",
        conf: "74%"
    },

]
export const otherSkills = [
    {
        logo:  <SiLatex className="text-4xl "/>,
        name: "Latex",
        conf: "90%"
    },
    {
        logo:  <SiAdobeillustrator className="text-4xl "/> ,
        name: "Illustrator",
        conf: "80%"
    },
    {
        logo:  <SiAdobeindesign className="text-4xl "/> ,
        name: "InDesign",
        conf: "65%"
    },
    {
        logo:  <SiAdobephotoshop className="text-4xl "/> ,
        name: "Photoshop",
        conf: "95%"
    },
    {
        logo:  <SiAdobeaftereffects className="text-4xl" /> ,
        name: "After Effects",
        conf: "75%"
    },
    {
        logo:  <SiAdobeaudition className="text-4xl"/> ,
        name: "Audition",
        conf: "80%"
    },

    {
        logo:  <SiAdobepremierepro className="text-4xl"/> ,
        name: "Premier",
        conf: "84%"
    }
]

export const socialDetails = [
    {
        logo:  <ImFacebook/>,
        name: "Facebook",
        link: "https://www.facebook.com/bineetX/"
    },
    {
        logo:  <ImInstagram/>,
        name: "Instagram",
        link: "https://www.instagram.com/mr_bineet/"
    },
    {
        logo:  <ImLinkedin2/>,
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/bineetx/"
    },
    {
        logo:  <ImYoutube/>,
        name: "YouTube",
        link: "https://www.youtube.com/c/BioinformaticaYT"
    },
    {
        logo:  <ImTwitter/>,
        name: "Twitter",
        link: "https://twitter.com/mr_bineet"
    },
    {
        logo:  <ImGithub/>,
        name: "Github",
        link: "https://github.com/BineetX"
    },
]

export const academicDetails = [
    {
        logo:  <SiGooglescholar/>,
        name: "Google Scholar",
        link: "https://scholar.google.com/citations?hl=en&user=9FZtto0AAAAJ"
    },
    {
        logo:  <SiOrcid/>,
        name: "Orcid",
        link: "https://orcid.org/my-orcid?orcid=0000-0002-2447-701X"
    },
    {
        logo:  <SiLoop/>,
        name: "Loop",
        link: "https://loop.frontiersin.org/people/1897405/overview"
    },
    {
        logo:  <SiResearchgate/>,
        name: "Research Gate",
        link: "https://www.researchgate.net/profile/Bineet-Kumar-Mohanta"
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
        time : "2018-2022-",
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