import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, ShareIcon } from "@heroicons/react/outline"
import { ArrowDownIcon, ArrowUpIcon, GiftIcon } from "@heroicons/react/solid"
import React, { useState } from "react"
import TimeAgo from "react-timeago"
import Link from "next/link"
import { Jelly } from "@uiball/loaders"
import Avatar from "./Avatar"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_VOTE } from "graphql/mutations"
import { GET_ALL_VOTES_BY_POST_ID } from "graphql/queries"

type Props = {
  post: Post
  disableHover?: boolean
}

const Post = ({ post, disableHover }: Props) => {
  const [vote, setVote] = useState<boolean>()
  const { data: session } = useSession()

  const [insertVote] = useMutation(CREATE_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "GetAllVotesByPostId"],
  })

  const { data: votesData, loading: votesLoading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
    onCompleted: updatedVotesData => {
      const votes: Vote[] = updatedVotesData?.getAllVotesByPostId
      const v = votes?.find(vote => vote?.username === session?.user?.name)?.upvote
      setVote(v)
    },
  })

  const upVote = async (isUpvote: boolean) => {
    const notification = toast.loading("Inserting Vote")
    if (!session) {
      toast.error("You need to sign in to upvote", {
        id: notification,
      })
      return
    }
    if (vote && isUpvote) {
      toast.error("You have already up voted this post", { id: notification })
      return
    }
    if (vote === false && !isUpvote) {
      toast.error("You have already down voted this post", { id: notification })
      return
    }

    await insertVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
      onCompleted: () => {
        toast.success(`You have ${isUpvote ? "up" : "down"} voted this post successfully`, { id: notification })
      },
      onError: e => {
        toast.error(`Something went wrong when casting vote: ${e}`, { id: notification })
      },
    })
  }

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getAllVotesByPostId
    if (votes?.length === 0) return 0
    let sum = 0
    votes?.map(vote => (vote?.upvote ? (sum += 1) : (sum -= 1)))
    return sum
  }

  if (!post || votesLoading)
    return (
      <div className="flex h-full w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )

  return (
    <Link href={post?.id ? `/post/${post.id}` : "/lost"}>
      <div
        className={`flex w-full cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border ${
          !disableHover && "hover:border-gray-600"
        }`}
      >
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          {/* Votes */}
          <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-red-400 ${vote && "text-red-400"}`} />
          <p className="text-xs font-bold text-black">{displayVotes(votesData)}</p>
          <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && "text-blue-400"}`} />
        </div>
        <div className="w-full p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.subreddit[0]?.topic ?? "dummy"} />
            <p className="text-xs text-gray-400">
              <Link href={post?.subreddit[0]?.topic ? `/subreddit/${post.subreddit[0].topic}` : "/lost"}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">r/{post?.subreddit[0]?.topic ?? "-"}</span>
              </Link>
              &bull; Posted by u/{post?.username ?? "-"} <TimeAgo date={post?.created_at} />
            </p>
          </div>
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post?.title ?? "-"}</h2>
            <p className="mt-2 text-sm font-light">{post?.body ?? "-"}</p>
          </div>
          <img className="w-full" src={post?.image} alt="" />
          <div className="flex flex-wrap space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatIcon className="h-6 w-6" />
              <p className="">{post?.comments?.length ?? 0} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
