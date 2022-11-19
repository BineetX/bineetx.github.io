import React from "react"
import { educations } from './informations'
import { motion } from "framer-motion"


function Education() {
    return (
        <div className="flex flex-col w-full ">
            <div className="border-l-4 border-purple-600 mx-4 my-4 flex flex-col h-full">
                {educations.map((val, key) => {
                    const bar_width = val.conf
                    return (
                        <div className="grow flex gap-4">
                            <div class="bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" class="text-white w-3 h-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                                </svg>
                            </div>
                            <div className="grow justify-center flex bg-black/40 dark:border rounded-xl flex-col pl-5 my-4 py-4">
                                <h1 className="md:text-2xl text-lg font-bold">
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
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Education