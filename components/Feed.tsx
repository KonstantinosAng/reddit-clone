import React from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "graphql/queries"
import Post from "./Post"
import { Jelly } from "@uiball/loaders"

type Props = {
  topic?: string
}

const Feed = ({ topic }: Props) => {
  const { data, loading } = !topic
    ? useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic,
        },
      })

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  }

  return (
    <div className="mt-5 flex w-full flex-col items-center space-y-4">
      {posts?.map(post => (
        <Post key={post?.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
