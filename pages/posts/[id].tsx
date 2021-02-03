import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'

import Layout from '../../components/Layout'
import { Post } from '../../types'

type Props = {
  post: Post
}

const PostPage: FC<Props> = ({ post }) => {
  return (
    <Layout
    title={post.title}
    >
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

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()
    
    return {
      revalidate: 10,
      props: {
        post
      }
    }
  } catch (error) {
    throw new Error(`Error fetching post ${id}: ${error}`)
  }
}
