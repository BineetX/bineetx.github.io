import React from "react";
import { skills,bioinformaticsSkills,cbSkills,otherSkills } from "./informations";
import { useState } from 'react'
import {motion} from 'framer-motion'

function Skills() {
    const [section, setSection] = useState("Pskills")


    let selection
    if (section === "Pskills"){
        selection = skills
    } else if (section === "bioinformaticsSkills"){
        selection = bioinformaticsSkills
    } else if (section === "cbSkills"){
        selection = cbSkills
    } else if (section === "otherSkills"){
        selection = otherSkills
    }

    


    return (
        <div className="flex flex-col w-full">
            <div className="my-4 text-3xl text-center">
                SKILLS
            </div>
            <div className="flex flex-col justify-around gap-2 mx-4 mb-4 md:flex-row md:rounded-lg md:mx-4 overflow-clip bg-black/40 ">
                <div onClick={() => setSection("Pskills")} className="flex items-center justify-center h-full py-4 font-bold text-center uppercase tex t-xs md:mb-4 grow lg:mb-0 md:text-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Programming
                </div>
                <div onClick={() => setSection("bioinformaticsSkills")} className="flex items-center justify-center h-full py-4 font-bold text-center uppercase tex t-xs md:mb-4 grow lg:mb-0 md:text-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Bioinformatics
                </div>
                <div onClick={() => setSection("cbSkills")} className="flex items-center justify-center h-full py-4 font-bold text-center uppercase tex t-xs md:mb-4 grow lg:mb-0 md:text-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Computational Biology
                </div>
                <div onClick={() => setSection("otherSkills")} className="flex items-center justify-center h-full py-4 font-bold text-center uppercase tex t-xs md:mb-4 grow lg:mb-0 md:text-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Others
                </div>
            </div>
            <div className="flex-wrap items-center justify-center gap-4 py-5 mx-4 bg-black/40 rounded-2xl lg:columns-2">

                {selection.map((val, key) => {
                    const bar_width = val.conf
                    return (
                        <div className="flex px-2 py-2 mx-4 mb-4 bg-black rounded-xl max-h-1/2">

                            <div className="flex items-center justify-center mr-4 ">
                                {val.logo}
                            </div>
                            <div className="flex flex-col rounded-lg bg-white/30 grow ">
                                <motion.div initial={{ width:0 }}
                                animate={{ width: val.conf}} transition={{
                                    // type: "spring",
                                    // damping: 10,
                                    // mass: 0.75,
                                    // stiffness: 100,
                                    duration:0.4,
                                    type:'spring',
                                    damping:10,
                                    stiffness:100,
                                }} style={{width:val.conf}} className="items-center rounded-lg grow bg-gradient-to-r from-cyan-500 to-blue-500 overflow hover:shadow-lg hover:shadow-green-300/30">
                                    <div className="h-full pl-4 ml-4 font-bold lg:text-xl hover:text-black ">{val.name}</div>
                                    {/* <div>{val.conf}</div> */}
                                </motion.div>
                            </div>
                        </div>

                    )
                })}

            </div>
            <div className="mt-4 text-3xl text-center ">
                INTEREST
            </div>
            <div className="flex flex-wrap items-center justify-center justify-around my-6 text-center md:mx-4 bg-black/40 md:rounded-2xl grow ">
                <motion.h1 className="py-6 md:py-0 md:pb-6 dark:border-b-2 dark:border-purple-600">
                I am highly enthusiastic about biology's programmatical, computational, and statistical aspects. I love to solve problems, and being a research scholar in computational biology and bioinformatics enables me to talk to the computers via languages like <span className="text-2xl font-bold">Python, R</span>, etc to command the machines to solve the problems for me. In our lab, we primarily work on the computational aspect of <span className="text-2xl font-bold">cancer biology</span>. We do <span className="text-2xl font-bold">Network Biology</span> studies, machine learning studies, and various other bioinformatics studies. I have a huge interest in <span className="text-2xl font-bold">Machine Learning</span> and <span className="text-2xl font-bold">Big Data Analysis</span> methods that we can use to solve Biological problems. There is a general stereotype, if you are working in bioinformatics you are doing <span className="text-xl font-bold">Structural Analysis, NGS, Docking, MD</span>, etc, But for me, I surely like those but <span className="text-2xl font-bold text-red-600">I Don’t do those</span>.
                </motion.h1>
            </div>
        </div>
    )
}

export default Skills