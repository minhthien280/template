import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const authors = allAuthors.filter(p => ['jessie','calvin','thomas'].includes(p.slug))
  var mainContent: any[] = []
  authors.forEach(author => mainContent.push(coreContent(author)))

  var data = authors.map((author, i) => [author, mainContent[i]]);
  return (
    <>
      <AuthorLayout content={mainContent} />
    </>
  )
}