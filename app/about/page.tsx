import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const team_members = ['jessie', 'calvin', 'thomas', 'andre']
  const authors: Authors[] = []
  //console.log(allAuthors)
  team_members.forEach((member) =>
    authors.push(allAuthors.find((p) => member === p.slug) as Authors)
  )
  const mainContent = authors.map((author) => coreContent(author))

  return <AuthorLayout content={mainContent} />
}
