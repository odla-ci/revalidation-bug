import { GetStaticProps } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import { v4 } from 'uuid'
import Layout from '../components/Layout'
import { Post } from '../types'

type Props = {
  postItems: Post[]
  gspId: string
}

const IndexPage: FC<Props> = ({postItems, gspId}) => (
  <Layout title="Posts">
    <code>{gspId}</code>
    <ul style={{ display: "grid", gap: "30px" }}>
      {postItems.map(({id, title}) => {
        return <li key={id}>
          <Link href={`/posts/${id}`} passHref>
          <a>{id} - {title} - ({})</a>
          </Link>
        </li>
      })}
    </ul>
  </Layout>
)
export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const gspId = v4() // Unique id for this executuon of GSP

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const postItems = await res.json()

    return {
      revalidate: 10,
      props: {
        postItems,
        gspId
      }
    }
  } catch (error) {
    throw new Error(`Error fetching todo items: ${error}`)
  }
}

