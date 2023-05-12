'use client'

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'

interface Theme {
    isDark: boolean
    setIsDark: Dispatch<SetStateAction<boolean>>
}

interface Speech {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    author: string
    setAuthor: Dispatch<SetStateAction<string>>
    slug: string
    setSlug: Dispatch<SetStateAction<string>>
    speaking: boolean
    setSpeaking: Dispatch<SetStateAction<boolean>>
    paused: boolean
    setPaused: Dispatch<SetStateAction<boolean>>
}

interface AppContextInterface {
    theme: Theme
    speech: Speech
}

const AppContext = createContext<AppContextInterface>({
    theme: {
        isDark: false,
        setIsDark: () => false
    },
    speech: {
        title: '',
        setTitle: () => '',
        author: '',
        setAuthor: () => '',
        slug: '',
        setSlug: () => '',
        speaking: false,
        setSpeaking: () => false,
        paused: false,
        setPaused: () => false
    }
})

export const AppContextProvider = (props: { children: any }) => {
    const [isDark, setIsDark] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [speaking, setSpeaking] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)

    useEffect(() => {
        const classes = document.body.classList
        if (isDark) {
            classes.add('dark')
        } else {
            classes.remove('dark')
        }
    })

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true)
        } else {
            setIsDark(false)
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                theme: {
                    isDark,
                    setIsDark
                },
                speech: {
                    title,
                    setTitle,
                    author,
                    setAuthor,
                    slug,
                    setSlug,
                    speaking,
                    setSpeaking,
                    paused,
                    setPaused
                }
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
