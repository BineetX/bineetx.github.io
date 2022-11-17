import React from 'react'
import { socialDetails, academicDetails } from './informations'
import {motion} from 'framer-motion'

function ContactMe() {
    return (
        <div className='text-center flex flex-col justify-around grow my-9'>
            <div>
                <h1 className='text-2xl font-bold mb-3'>Email and Boring Stuff</h1>
                <div className='flex justify-around flex-col bg-black/30 mx-2 rounded-lg'>
                    <div className='py-3 my-3'>
                        <h1 className='font-bold'>Professional</h1>
                        <a className='bg-white/30 flex mx-3 rounded-lg py-1 justify-center mt-3'>bineet@ils.res.in</a>
                    </div>
                    <div className='py-3 my-3'>
                        <h1 className='font-bold'>Personal</h1>
                        <a className='bg-white/30 flex mx-3 rounded-lg py-1 justify-center mt-3'>bineetkumarmohanta@gmail.com</a>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-2xl font-bold mb-3'>Socials</h1>
                <div className='flex justify-around py-4 bg-black/30 mx-3 rounded-lg'>
                    {socialDetails.map((val,key) => {
                        return(
                            <motion.a animate={{ opacity: 1, scale: 1 }}
                            transition={{
                            
                                duration:0.4,
                                type:'spring',
                                damping:10,
                                stiffness:100,

                            }}
                            initial={{ opacity: 0, scale: 0.1 }} href={val.link} className="flex flex-col items-center hover:text-sky-500">
                                <div className='text-2xl '>
                                    {val.logo}
                                </div>
                                <div>
                                    {val.name}
                                </div>

                            </motion.a>
                        )
                    })}

                </div>
            </div>
            <div>
                <h1 className='text-2xl font-bold mb-3'> Academic</h1>
                <div className='flex justify-around py-4 bg-black/30 mx-3 rounded-lg'>
                    {academicDetails.map((val,key) => {
                        return(
                            <motion.a href={val.link} animate={{ opacity: 1, scale: 1 }}
                            transition={{
                            
                                duration:0.4,
                                type:'spring',
                                damping:10,
                                stiffness:100,

                            }}
                            initial={{ opacity: 0, scale: 0.1 }} className="flex flex-col items-center hover:text-sky-500">
                                <div className='text-2xl '>
                                    {val.logo}
                                </div>
                                <div>
                                    {val.name}
                                </div>

                            </motion.a>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default ContactMe