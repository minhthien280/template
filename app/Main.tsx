import siteMetadata from '@/data/siteMetadata'

import { allHomes } from 'contentlayer/generated'
import type { Home } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

export default function Home() {
  const post = allHomes.find((p) => p.slug === 'home') as Home

  return (
    <>
      <div className="dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Fertility Insight
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </div>
    </>
  )
}
