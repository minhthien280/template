import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const team_members = ['jessie', 'calvin', 'thomas']
  const authors = allAuthors.filter((p) => team_members.includes(p.slug))
  const mainContent = authors.map((author) => coreContent(author))

  return (
    <>
      <AuthorLayout content={mainContent} />
    </>
  )
}
