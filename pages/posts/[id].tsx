import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import {v4} from "uuid"

import Layout from '../../components/Layout'
import { Post } from '../../types'

type Props = {
  post: Post,
  gspId: string
}

const PostPage: FC<Props> = ({ post, gspId }) => {
  return (
    <Layout
    title={post.title}
    >
      <h2>gspId: {gspId}</h2>
      <dl>
        <dt>
          id
        </dt>
        <dd>
          {post.id}
        </dd>
        <dt>
          title
        </dt>
        <dd>
          {post.title}
        </dd>
        <dt>
          body
        </dt>
        <dd>
          {post.body}
        </dd>
        <dt>
          userId
        </dt>
        <dd>
          {post.userId}
        </dd>
      </dl>
    </Layout>
  )
}
export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }
  const gspId = v4() // Unique id for this executuon of GSP

  try {
    console.time(`${id} - ${gspId}`)
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()
    
    return {
      revalidate: 10,
      props: {
        post,
        gspId
      }
    }
  } catch (error) {
    throw new Error(`Error fetching post ${id}: ${error}`)
  } finally {
    console.timeEnd(`${id} - ${gspId}`)
  }
}
