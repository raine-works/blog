'use client'

import { FaShareAlt } from 'react-icons/fa'

export default function Page(props: {
    title: string
    url?: string
    className?: string
}) {
    const share = () => {
        navigator.share({
            title: props.title,
            url: props.url ?? document.location.href
        })
    }

    return (
        <>
            <button onClick={share} className={props.className}>
                <FaShareAlt />
            </button>
        </>
    )
}
