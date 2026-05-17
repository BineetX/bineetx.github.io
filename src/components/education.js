import React from "react"
import { achievements, educations } from './informations'
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
            <section className="mx-4 my-8 overflow-hidden rounded-xl border border-purple-500/30 bg-black/30">
                <div className="flex flex-col gap-1 border-b border-purple-500/30 px-5 py-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-purple-300">Achievements</p>
                        <h2 className="md:text-2xl text-xl font-bold">Awards, qualifications, and scientific events</h2>
                    </div>
                    <span className="text-sm text-purple-200">{achievements.length} entries</span>
                </div>
                <div className="divide-y divide-purple-500/20">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={`${item.year}-${item.title}`}
                            className="grid gap-3 px-5 py-4 md:grid-cols-[72px_minmax(0,1fr)_120px] md:items-center"
                            whileHover={{ x: 6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        >
                            <span className="font-bold text-purple-300">#{String(index + 1).padStart(2, "0")}</span>
                            <div>
                                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                                <p className="mt-1 text-sm text-slate-300">{item.agency}</p>
                            </div>
                            <time className="font-bold text-purple-200 md:text-right">{item.year}</time>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Education
