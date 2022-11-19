import React from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";

function AboutMe() {
    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 400], [-45, 45]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }
    return (
        <div className='text-center flex justify-around items-center flex-col'>
            <div className='text-4xl '>
                Hi, I am
            </div>
            
            <motion.div style={{
                width: 600,
                height: 400,
                display: "flex",
                placeItems: "center",
                placeContent: "center",
                borderRadius: 30,
                perspective: 800
            }}
            onMouseMove={handleMouse} className=' dont-bold text-8xl uppercase shadow-2xl hover:shadow-red-500/60 dark:hover:shadow-green-500'>
                <motion.div className='dark:text-green-500 drop-shadow-lg' style={{

                    rotateX: rotateX,
                    rotateY: rotateY
                }} initial={{ size:0 }}
                animate={{ size:100}} transition={{
                    // type: "spring",
                    // damping: 10,
                    // mass: 0.75,
                    // stiffness: 100,
                    duration:0.4,
                    type:'spring',
                    damping:10,
                    stiffness:100,
                }} >Bineet</motion.div>
        
            </motion.div>
            <div className='text-2xl mx-9'>
                Curerntly working as Junior Research Fellow (Ph.D.) under <span className='text-sky-500 font-bold'>Dr. Anshuman Dixit</span> at Computational Biology and Bioinfromatics Lab at Institute of Life Sciences Bubaneswar.
                I am most skilled in: <span className='text-green-400'>Python and Eating Pizza</span>
            </div>

        </div>
    )
}

export default AboutMe