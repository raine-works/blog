'use client'

import { useAppContext } from '@/context/app.context'
import Link from 'next/link'
import { useEffect } from 'react'
import {
    FaPause,
    FaPlay,
    FaStop,
    FaUser,
    FaExternalLinkAlt
} from 'react-icons/fa'
import anime from 'animejs'

export default function Page() {
    const context = useAppContext()

    const pause = () => {
        speechSynthesis.pause()
        context.speech.setPaused(true)
    }

    const resume = () => {
        speechSynthesis.resume()
        context.speech.setPaused(false)
    }

    const dismiss = () => {
        speechSynthesis.cancel()
        anime({
            targets: '#player',
            translateX: -250,
            opacity: 0,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                context.speech.setSpeaking(false)
            }
        })
    }

    useEffect(() => {
        window.addEventListener('unload', () => {
            speechSynthesis.cancel() // stop playback when page is unloaded
        })

        anime({
            targets: '#player',
            translateX: 250,
            opacity: 1,
            duration: 500,
            easing: 'easeInOutQuad'
        })
    })

    if (context.speech.speaking) {
        return (
            <>
                <div
                    id="player"
                    className="fixed bottom-0 left-[-250px] opacity-0 w-full p-2 flex justify-start z-10"
                >
                    <div className="flex items-center max-md:w-full bg-light-gray dark:bg-dark-gray text-black dark:text-white p-4 rounded-lg shadow-lg">
                        <div className="mr-4 flex items-center">
                            {context.speech.paused ? (
                                <button
                                    className="p-2 rounded-full border-2 border-black dark:border-white text-2xl hover:opacity-80"
                                    onClick={resume}
                                >
                                    <FaPlay className="pl-1" />
                                </button>
                            ) : (
                                <button
                                    className="p-2 rounded-full border-2 border-black dark:border-white text-2xl hover:opacity-80"
                                    onClick={pause}
                                >
                                    <FaPause />
                                </button>
                            )}
                            <button
                                onClick={dismiss}
                                className="p-2 rounded-full border-2 border-black dark:border-white ml-2 text-md hover:opacity-80"
                            >
                                <FaStop />
                            </button>
                        </div>
                        <div className="flex flex-col justify-start grow">
                            <h1>{context.speech.title}</h1>
                            <span className="flex items-center">
                                <FaUser className="mr-2" />
                                <h3>{context.speech.author}</h3>
                            </span>
                        </div>
                        <div className="ml-2 p-2">
                            <Link
                                className="hover:opacity-80"
                                href={context.speech.slug}
                            >
                                <FaExternalLinkAlt />
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return <></>
    }
}
