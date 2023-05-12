'use client'

import { FaPlay, FaStop } from 'react-icons/fa'
import { useAppContext } from '@/context/app.context'
import anime from 'animejs'

interface Props {
    id: string
    title: string
    author: string
    content: string
    className?: string
}

export default function Page(props: Props) {
    const context = useAppContext()

    try {
        const play = async () => {
            const speech = new SpeechSynthesisUtterance()
            speech.text = `${props.title}. By ${props.author}. ${props.content}`
            speech.lang = 'en-US'
            speechSynthesis.speak(speech)
            context.speech.setTitle(props.title)
            context.speech.setAuthor(props.author)
            context.speech.setSlug(`/article/${props.id}`)
            context.speech.setSpeaking(true)
            speech.addEventListener('end', () => {
                context.speech.setSpeaking(false)
                speechSynthesis.cancel()
            })
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

        return (
            <>
                <div className={props.className}>
                    {context.speech.speaking ? (
                        <button
                            onClick={dismiss}
                            className="p-2 rounded-full border-2 border-white hover:opacity-80"
                        >
                            <FaStop />
                        </button>
                    ) : (
                        <button
                            onClick={play}
                            className="p-2 rounded-full border-2 border-white hover:opacity-80"
                        >
                            <FaPlay />
                        </button>
                    )}
                </div>
            </>
        )
    } catch (err) {
        console.error(err)
        return <></>
    }
}
