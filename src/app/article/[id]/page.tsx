import {
    directus,
    Article,
    Author,
    ArticleCategory,
    Category
} from '@/utils/directus'
import { redirect } from 'next/navigation'
import { FaAngleLeft, FaCalendar, FaUser, FaRobot } from 'react-icons/fa'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Speech from '@/components/speech'
import Share from '@/components/share'
import Link from 'next/link'

dayjs.extend(advancedFormat)

export default async function Page(props: { params: { id: string } }) {
    try {
        const article = await Article.readOne(props.params.id, {})
        const author = await Author.readOne(article?.author_id!)
        const banner = await directus.files.readOne(article?.banner!)
        const category_ids = (
            await ArticleCategory.readByQuery({
                filter: { article_id: article?.id }
            })
        ).data?.map((item: any) => item.category_id) as string[]
        const categories = await Category.readByQuery({
            filter: { id: { _in: category_ids } }
        })
        if (article?.status !== 'published') redirect('/404')

        return (
            <>
                <main className="bg-white dark:bg-black min-h-screen">
                    <section className="mx-auto w-full md:px-20 md:py-6 max-w-7xl">
                        <div className="w-full h-[500px] md:rounded-lg max-md:h-[400px] overflow-hidden relative">
                            <Link
                                className="text-2xl cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg absolute top-2 left-2 z-10 bg-light-gray dark:bg-dark-gray text-black dark:text-white hover:opacity-80"
                                href="/"
                            >
                                <FaAngleLeft className="pr-0.5" />
                            </Link>

                            <Share
                                title={article.title}
                                className="text-md cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg absolute top-2 right-2 z-10 bg-light-gray dark:bg-dark-gray text-black dark:text-white hover:opacity-80"
                            />
                            <div className="bg-gradient-to-b from-transparent to-black absolute w-full h-full p-6 md:p-12 flex flex-col justify-end text-white">
                                <div className="flex items-center mb-4">
                                    <Speech
                                        id={article.id}
                                        title={article.title}
                                        author={author?.full_name!}
                                        content={article.body}
                                        className="text-white mr-2"
                                    />
                                    <h1 className="text-3xl uppercase">
                                        {article?.title}
                                    </h1>
                                </div>
                                <span className="flex items-center mb-2">
                                    {author?.is_ai ? (
                                        <FaRobot className="mr-2" />
                                    ) : (
                                        <FaUser className="mr-2" />
                                    )}
                                    <h3>{author?.full_name}</h3>
                                </span>
                                <span className="flex items-center mb-2">
                                    <FaCalendar className="mr-2" />
                                    <h4>
                                        {dayjs(article.date_created).format(
                                            'MMMM Do, YYYY'
                                        )}
                                    </h4>
                                </span>
                                <div className="flex items-center flex-wrap mt-2">
                                    {categories.data?.map((item, key) => {
                                        return (
                                            <span
                                                style={{
                                                    backgroundColor: item.color
                                                }}
                                                className="mr-2 rounded-full px-2 py-1 text-sm mb-2"
                                                key={key}
                                            >
                                                {item.title}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                            <Image
                                className="w-full h-full object-cover bg-gradient-to-b from-black to-transparent"
                                src={`${process.env.CMS_URL}/assets/${banner?.id}`}
                                blurDataURL={`${process.env.CMS_URL}/assets/${banner?.id}`}
                                alt={article?.title!}
                                height={banner?.height!}
                                width={banner?.width!}
                                priority={true}
                                quality="100"
                                placeholder="blur"
                            />
                        </div>

                        <article className="p-6">
                            <ReactMarkdown className="mx-auto prose prose-stone dark:prose-invert prose-headings:text-primary marker:text-primary marker:font-bold">
                                {article.body}
                            </ReactMarkdown>
                        </article>
                    </section>
                </main>
            </>
        )
    } catch (err) {
        redirect('/404')
    }
}
