import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
// import LinePlot from './D3Components/D3Chart'
// import getDataFromFlask from './fetchData'
import LinePlot1 from './LineChart_clientfetch'
import { SWLine } from './SW_dataFetch'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  //getDataFromFlask,
  LinePlot1,
  SWLine,
}
