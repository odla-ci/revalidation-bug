import { GetStaticProps } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import Layout from '../components/Layout'
import { Post } from '../types'

type Props = {
  postItems: Post[]
}

const IndexPage: FC<Props> = ({postItems}) => (
  <Layout title="Posts">
    <ul style={{ display: "grid", gap: "30px" }}>
      {postItems.map(({id, title}) => {
        return <li key={id}>
          <Link href={`/posts/${id}`} passHref>
          <a>{title}</a>
          </Link>
        </li>
      })}
    </ul>
  </Layout>
)
export default IndexPage

export const getStaticProps: GetStaticProps = async () => {

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const postItems = await res.json()

    return {
      props: {
        postItems
      }
    }
  } catch (error) {
    throw new Error(`Error fetching todo items: ${error}`)
  }
}

