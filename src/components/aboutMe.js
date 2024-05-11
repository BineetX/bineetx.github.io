import React from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion";
import ComputersCanvas from './computer';

function AboutMe() {

    return (
        <div className='flex flex-col items-center justify-center min-h-full text-center bg-black grow rounded-xl'>
    
            

            <ComputersCanvas/>
            <div className=' text-md md:text-2xl mx-9'>
                
                Currently working as Senior Research Fellow (Ph.D.) under <span className='font-bold text-sky-500'>Dr. Anshuman Dixit</span> at Computational Biology and Bioinfromatics Lab at Institute of Life Sciences Bubaneswar.
                I am most skilled in: <span className='text-green-400'>Python and Eating Pizza</span>
            </div> 

            <div className='py-6 text-white'>
                Created by Bineet Kumar Mohanta
            </div>

        </div>
    )
}

export default AboutMe