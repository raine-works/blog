import { Directus } from '@directus/sdk'
import { UUID } from 'crypto'

type Author = {
    id: UUID
    date_created: Date
    date_updated: Date
    status: 'inactive' | 'active'
    full_name: string
    is_ai: boolean
}

type Article = {
    id: UUID
    date_created: Date
    date_updated: Date
    status: 'draft' | 'published' | 'archived'
    author_id: UUID
    title: string
    categories: string[]
    body: string
    banner: UUID
}

type ArticleCategory = {
    id: string
    aricle_id: string
    category_id: string
}

type Category = {
    id: string
    title: string
    color: string
}

type Blog = {
    author: Author
    article: Article
    articleCategory: ArticleCategory
    category: Category
}

export const directus = new Directus<Blog>(process.env.CMS_URL!)
export const Author = directus.items('author')
export const Article = directus.items('article')
export const ArticleCategory = directus.items('article_category')
export const Category = directus.items('category')
