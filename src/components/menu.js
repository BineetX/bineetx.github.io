import React from 'react'
import { motion } from 'framer-motion'
import Toggle from './toggle/toggle'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { sectionActions } from '../store/sectionSlice'
import Logo from "../image/dp.png"



function Menu() {
    const dispatch = useDispatch()

    const [theme, setTheme] = useState("dark")
    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setToggled((s) => !s);

    }
    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])


    const [toggled, setToggled] = useState(false);
    const [menu,setMenu] = useState(false)

    return (
        <div className="grid min-h-full md:py-8 grid-row-10">
            {/* <div onClick={()=> setMenu(!menu)} className="absolute z-10 text-white grow md:hidden bfont-bold top-6 left-10">Menu</div> */}
        
            <div className={`row-span-2 bg-black/40 rounded-xl backdrop-blur-sm mb-2 shadow-2xl flex justify-center items-end`}>
                
                <img src={Logo} className="h-60 " />

            </div>
            
            <div className={`row-span-4 flex flex-col justify-around backdrop-blur-sm mt-2 rounded-lg bg-black/40 shadow-2xl `}>


                <div className="flex flex-col mx-1 mt-4 mb-2 rounded-lg grow bg-black/20 ">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => dispatch(sectionActions.changename("aboutme"))} className="flex items-center justify-center mx-2 my-1 text-center shadow-xl hover:shadow-sky-500/30 bg-black/50 grow rounded-xl grows-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                        About Me
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => dispatch(sectionActions.changename("skill"))} className="flex items-center justify-center mx-2 my-1 text-center shadow-xl hover:shadow-sky-500/30 bg-black/50 grow rounded-xl grows-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                        Skills
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => dispatch(sectionActions.changename("education"))} className="flex items-center justify-center px-2 mx-2 my-1 text-center shadow-xl hover:shadow-sky-500/30 bg-black/50 rounded-xl grow hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                        Education and Expriences
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => dispatch(sectionActions.changename("contactme"))} className="flex items-center justify-center px-2 mx-2 my-1 text-center shadow-xl hover:shadow-sky-500/30 bg-black/50 rounded-xl grow hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                        Contact Me
                    </motion.div>
                    <motion.a href="/assets/bineet_resume.pdf" download="Bineet.pdf" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} className="flex items-center justify-center px-2 mx-2 my-1 text-center shadow-xl hover:shadow-sky-500/30 bg-black/50 rounded-xl grow hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:font-bold">
                        Download CV
                    </motion.a>
                </div>
                <div className="flex flex-col items-center justify-center my-1 text-3xl font-bold drak:bg-black h-1/6 backdrop-blur-xl rounded-xl md:container">
                    
                    <Toggle toggled={toggled} onClick={handleThemeSwitch} />
                </div>


            </div>


        </div>


    )
}


export default Menu