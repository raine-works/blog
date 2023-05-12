'use client'

import { useAppContext } from '../context/app.context'
import { FaRegSun, FaMoon } from 'react-icons/fa'

export default function Page(props: { className?: string }) {
    const context = useAppContext()

    return (
        <>
            <div className={props.className}>
                <button
                    className="w-8 h-8 flex justify-center items-center text-lg rounded-lg bg-light-gray dark:bg-dark-gray text-black dark:text-white hover:opacity-80"
                    onClick={() =>
                        context.theme.setIsDark(!context.theme.isDark)
                    }
                >
                    {context.theme.isDark ? <FaRegSun /> : <FaMoon />}
                </button>
            </div>
        </>
    )
}
