import ThemeToggle from '@/components/theme'
import Link from 'next/link'

export default function Page() {
    return (
        <>
            <div className="flex items-center justify-between w-full p-2 bg-white dark:bg-black text-black dark:text-white z-10 shadow-lg">
                <Link href="/">raineworks BLOG</Link>
                <ThemeToggle />
            </div>
        </>
    )
}
