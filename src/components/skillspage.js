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
            <div className="text-center text-3xl my-4">
                SKILLS
            </div>
            <div className="flex md:flex-row flex-col mx-4 rounded-lg overflow-clip mb-4">
                <div onClick={() => setSection("Pskills")} className="grow bg-black/40 lg:mb-0 mb-4 py-4 text-center text-xl font-bold uppercase hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Programming
                </div>
                <div onClick={() => setSection("bioinformaticsSkills")} className="grow bg-black/40 lg:mb-0 mb-4 py-4 text-center text-xl font-bold uppercase hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Bioinformatics
                </div>
                <div onClick={() => setSection("cbSkills")} className="grow bg-black/40 lg:mb-0 mb-4 py-4 text-center text-xl font-bold uppercase hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Computational Biology
                </div>
                <div onClick={() => setSection("otherSkills")} className="grow bg-black/40 lg:mb-0 mb-4 py-4 text-center text-xl font-bold uppercase hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">
                    Others
                </div>
            </div>
            <div className="bg-black/40 flex-wrap  items-center justify-center rounded-2xl mx-4 lg:columns-2 gap-4 py-5">

                {selection.map((val, key) => {
                    const bar_width = val.conf
                    return (
                        <div className="flex bg-black mx-4 py-2 mb-4 px-2 rounded-xl max-h-1/2">

                            <div className=" flex justify-center items-center mr-4">
                                {val.logo}
                            </div>
                            <div className="flex flex-col bg-white/30 grow rounded-lg ">
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
                                }} style={{width:val.conf}} className="items-center grow bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg overflow hover:shadow-lg hover:shadow-green-300/30">
                                    <div className="pl-4 h-full  ml-4 font-bold lg:text-xl hover:text-black ">{val.name}</div>
                                    {/* <div>{val.conf}</div> */}
                                </motion.div>
                            </div>
                        </div>

                    )
                })}

            </div>
            <div className=" text-center text-3xl mt-4">
                INTEREST
            </div>
            <div className="flex bg-black/40  flex-wrap justify-around rounded-2xl mx-4 grow my-6 text-center justify-center items-center ">
                <motion.h1 className="dark:border-b-2 dark:border-purple-600 pb-6">
                I am highly enthusiastic about biology's programmatical, computational, and statistical aspects. I love to solve problems, and being a research scholar in computational biology and bioinformatics enables me to talk to the computers via languages like <span className="text-2xl font-bold">Python, R</span>, etc to command the machines to solve the problems for me. In our lab, we primarily work on the computational aspect of <span className="text-2xl font-bold">cancer biology</span>. We do <span className="text-2xl font-bold">Network Biology</span> studies, machine learning studies, and various other bioinformatics studies. I have a huge interest in <span className="text-2xl font-bold">Machine Learning</span> and <span className="text-2xl font-bold">Big Data Analysis</span> methods that we can use to solve Biological problems. There is a general stereotype, if you are working in bioinformatics you are doing <span className="text-xl font-bold">Structural Analysis, NGS, Docking, MD</span>, etc, But for me, I surely like those but <span className="text-2xl font-bold text-red-600">I Don’t do those</span>.
                </motion.h1>
            </div>
        </div>
    )
}

export default Skills