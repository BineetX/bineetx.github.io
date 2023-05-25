import React from 'react'
import { Sling as Hamburger } from 'hamburger-react'
import { motion } from 'framer-motion'
import Toggle from './toggle/toggle'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { sectionActions } from '../store/sectionSlice'
import Logo from "../image/dp.png"


function SmallMenu() {
    const [isOpen, setOpen] = useState(false)

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
        <div className='flex flex-col h-full z-5 position'>

            <div className='flex items-center justify-between py-3 text-2xl font-bold text-center bg-black'>
                <Hamburger toggled={isOpen} toggle={setOpen}  direction='right' />
                <h1 className='pr-4'>Bineet Kumar Mohanta</h1>
            </div>
            {isOpen && <div className='flex flex-col items-center justify-start h-screen gap-16 pt-20 text-xl font-bold bg-black/80 grow'>
                
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => {dispatch(sectionActions.changename("aboutme")) ;setOpen(false)}} className="">
                        About Me
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => {dispatch(sectionActions.changename("skill"));setOpen(false)}} className="">
                        Skills
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => {dispatch(sectionActions.changename("education"));setOpen(false)}} className="">
                        Education and Expriences
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} onClick={() => {dispatch(sectionActions.changename("contactme"));setOpen(false)}} className="">
                        Contact Me
                    </motion.div>
                    <motion.a href="/assets/bineet_resume.pdf" download="Bineet.pdf" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} className="">
                        Download CV
                    </motion.a>
                    <motion.a  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} initial={{ scale: 0.3, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }} transition={{
                            type: "spring",
                            damping: 10,
                            mass: 0.75,
                            stiffness: 100,
                        }} className="">
                    <Toggle toggled={toggled} onClick={handleThemeSwitch} />
                    </motion.a>
                    
            </div>}
        </div>
    )
}

export default SmallMenu