import React from "react";
import { Typewriter, useTypewriter } from 'react-simple-typewriter'
import Logo from "../image/dp.png"
import LetsGo from "../components/letsgo";
import { useDispatch, } from "react-redux"
import {selectedActions} from "../store/selectedslice"

function Landing() {


    const dispatch = useDispatch()
    const handlePageSwitch = () => {
        dispatch(selectedActions.changename("details"))

    }

    return (
        <div className="bg-gradient-to-r from-sky-900 via-black to-sky-900 grow h-screen w-screen text-center items-center flex justify-center flex-col">
            {/* <h1>
                HI <span className="font-bold text-2xl text-red-800">BINEET</span>, This is going to be your cv . But for now adios.
            </h1>
            <p>
                So the page is under construction
            </p> */}
            <div className="font-bold text-4xl pb-4">

                <img src={Logo} className="h-80" />
            </div>
            <div>
                <h1 className="font-bold text-gray-300 text-6xl">
                    <Typewriter
                        words={["Hii there!!","I am BINEET", "Working as a Ph.D. scholar at ILS", "I do Bioinformatics", "I do Computational Biology","< I love Programming />"]}
                        loop={true}
                        cursor
                        cursorStyle="|"

                    />
                </h1>
            </div>
            <div className="text-white font-bold pt-20">
                {/* <div className="border py-2 px-6 rounded-3xl text-2xl">
                    Let's Go
                </div> */}

            </div>
            <div onClick={handlePageSwitch}>
                <LetsGo/>
            </div>
        </div>
    )
}


export default Landing