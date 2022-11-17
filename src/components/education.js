import React from "react"
import { educations } from './informations'
import { motion } from "framer-motion"


function Education() {
    return (
        <div className="flex flex-col w-full ">
   
                {educations.map((val, key) => {
                    const bar_width = val.conf
                    return (
                        <div className="grow justify-center flex bg-black/40 dark:border my-4 mx-4 rounded-xl flex-col pl-5 py-4">
                            <h1 className="text-2xl font-bold">
                                {val.inst}
                            </h1>
                            <p>{val.location}</p>
                            <div>
                                <p className="font-bold">{val.degree}</p>
                                <p>{val.time}</p>
                            </div>
                            <p>
                                {val.subject}
                            </p>
                            <div>{val.other}</div>
                        </div>

                    )
                })}

        </div>
    )
}

export default Education