import React from "react";

import Skills from "../components/skillspage";
import { useState, useEffect } from 'react'
import AboutMe from "../components/aboutMe";
import ContactMe from "../components/contact";
import Education from "../components/education";
import Menu from "../components/menu";
import { useSelector } from 'react-redux'
import SmallMenu from "../components/smallMenu";

function DetailedPage() {
    const selectedView = useSelector((state) => state.sectionname.name)
    const [theme, setTheme] = useState("dark")
    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setToggled((s) => !s);

    }
    const [navbar, setNavbar] = useState(false);

    const [toggled, setToggled] = useState(false);

    let selectionView
    if (selectedView === "skill") {
        selectionView = <Skills />
    } else if (selectedView === "aboutme") {
        selectionView = <AboutMe />
    } else if (selectedView === "contactme") {
        selectionView = <ContactMe />
    } else if (selectedView === "education") {
        selectionView = <Education />
    }


    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])


    return (
        <div className="flex flex-col w-screen min-h-screen text-white md:flex-none bg-gradient-to-r dark:bg-gradient-to-r from-violet-500 dark:from-black via-pink-500 dark:via-black to-indigo-500 dark:to-black lg:min-h-screen md:min-h-screen md:grid md:grid-cols-10">
            <div className="fixed z-10 block w-screen col-span-0 md:hidden">
                <SmallMenu />
            </div>
            <div className="hidden col-span-2 col-start-2 md:h-full md:block">
                <Menu />
            </div>

            <div className="flex mt-20 shadow-2xl md:my-8 md:mx-4 grow md:mt-8 lg:col-span-6 md:col-span-7 bg-black/40 bg-blur-lg backdrop-blur-sm rounded-xl">
                {selectionView}
            </div>
        </div>
    )
}
export default DetailedPage