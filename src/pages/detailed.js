import React from "react";
import Logo from "../image/dp.png"
import Skills from "../components/skillspage";
import { useState,useEffect } from 'react'
import AboutMe from "../components/aboutMe";
import ContactMe from "../components/contact";
import Education from "../components/education";
import {motion} from 'framer-motion'
import Toggle from "../components/toggle/toggle";


function DetailedPage() {

    const [selectedView, setSelecetdView] = useState("skill")
    const [theme,setTheme] =useState("dark")
    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setToggled((s) => !s);
    
    }
    const [navbar, setNavbar] = useState(false);

    const [toggled, setToggled] = React.useState(false);

    let selectionView
    if (selectedView === "skill") {
        selectionView = <Skills />
    } else if (selectedView === "aboutme") {
        selectionView = <AboutMe />
    } else if (selectedView === "contactme") {
        selectionView = <ContactMe/>
    } else if (selectedView === "education") {
        selectionView = <Education/>
    }


    useEffect(() => {
        if (theme === 'light') {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [theme])


    return (
        <div className="bg-gradient-to-r dark:bg-gradient-to-r from-violet-500 dark:from-black via-pink-500 dark:via-black to-indigo-500 dark:to-black text-white lg:min-h-screen  md:min-h-screen w-screen md:grid md:grid-cols-10 flex flex-col">
            <div className="lg:col-start-2 md:col-start-1 lg:col-span-2 md:col-span-3 md:my-8 md:mx-4 md:grid md:grid-rows-6">
                <div className="row-span-2 bg-black/40 rounded-xl backdrop-blur-sm mb-2 shadow-2xl flex justify-center items-end">
                    <img  src={Logo} className="h-60 " />

                </div>
                <div className="row-span-4 flex flex-col justify-around backdrop-blur-sm mt-2 rounded-lg bg-black/40 shadow-2xl  ">
                    
                    
                    <div className="flex flex-col grow mt-4 mb-2 mx-1 bg-black/20 rounded-lg">
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                                    type: "spring",
                                    damping: 10,
                                    mass: 0.75,
                                    stiffness: 100,
                                }}  onClick={() => setSelecetdView("aboutme")} className="hover:shadow-sky-500/30 bg-black/50 grow rounded-xl mx-2 my-1 items-center text-center shadow-xl grows-center flex justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                            About Me
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                                    type: "spring",
                                    damping: 10,
                                    mass: 0.75,
                                    stiffness: 100,
                                }} onClick={() => setSelecetdView("skill")} className="hover:shadow-sky-500/30 bg-black/50  grow rounded-xl mx-2 my-1 items-center text-center shadow-xl grows-center flex justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                            Skills
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                                    type: "spring",
                                    damping: 10,
                                    mass: 0.75,
                                    stiffness: 100,
                                }} onClick={() => setSelecetdView("education")} className="hover:shadow-sky-500/30 bg-black/50 px-2 rounded-xl mx-2 text-center shadow-xl grow items-center flex justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black my-1 hover:font-bold">
                            Education and Expriences
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}  initial={{ scale: 0.3, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                                    type: "spring",
                                    damping: 10,
                                    mass: 0.75,
                                    stiffness: 100,
                                }} onClick={() => setSelecetdView("contactme")} className="hover:shadow-sky-500/30 bg-black/50 px-2 rounded-xl my-1 mx-2 text-center shadow-xl grow items-center flex justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                            Contact Me
                        </motion.div>
                        <motion.a href="/assets/bineet_resume.pdf" download="Bineet.pdf" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                                    type: "spring",
                                    damping: 10,
                                    mass: 0.75,
                                    stiffness: 100,
                                }} className="hover:shadow-sky-500/30 bg-black/50 px-2 rounded-xl mx-2  text-center shadow-xl my-1 grow items-center flex justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                            Download CV
                        </motion.a>
                    </div>
                    <div className=" drak:bg-black h-1/6 flex flex-col justify-center items-center text-3xl font-bold backdrop-blur-xl rounded-xl my-1">
                         
                         <Toggle toggled={toggled} onClick={handleThemeSwitch}/>
                         {/* <h1>{theme}</h1> */}
                    </div>


                </div>

            </div>
            <div className="flex lg:col-span-6 md:col-span-7 bg-black/40 bg-blur-lg my-8 mx-4 backdrop-blur-sm rounded-xl shadow-2xl">

                {selectionView}
            </div>
        </div>
    )
}
export default DetailedPage