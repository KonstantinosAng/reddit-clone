import Avatar from "@/Avatar"
import Header from "@/Header"
import Post from "@/Post"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_COMMENT } from "graphql/mutations"
import { GET_POST_BY_POST_ID } from "graphql/queries"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import TimeAgo from "react-timeago"
import { Jelly } from "@uiball/loaders"

type FormData = {
  comment: string
}

const PostPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { postId } = router.query

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  })

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "GetPostByPostId"],
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async formData => {
    if (formData?.comment && formData?.comment.trim() !== "") {
      const notification = toast.loading("Posting your comment...")
      await createComment({
        variables: {
          post_id: postId,
          username: session?.user?.name,
          text: formData?.comment,
        },
      })
      setValue("comment", "")
      toast.success("Comment posted", {
        id: notification,
      })
    }
  }

  const post: Post = data?.getPostByPostId

  return (
    <div>
      <Header />
      <div className="mx-auto my-7 max-w-5xl">
        <Post post={post} disableHover />
        {post && (
          <>
            <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
              <p className="text-sm">
                Comment as <span className="text-red-500">{session?.user?.name ?? "-"}</span>
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                <textarea
                  {...register("comment")}
                  disabled={!session}
                  placeholder={session ? "What are your thoughts?" : "Please sign in to comment"}
                  className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                />
                <button type="submit" className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200">
                  Comment
                </button>
              </form>
            </div>
            <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
              <hr className="py-2" />
              {post?.comments?.map((comment, idx) => (
                <div key={comment?.id ?? idx} className="relative flex items-center space-x-2 space-y-5">
                  {idx !== post?.comments?.length - 1 && <hr className="absolute top-10 left-7 z-0 h-16 border" />}
                  {idx === post?.comments?.length - 1 && <hr className="absolute top-10 left-7 z-0 hidden h-16 border" />}
                  <div className="z-50">
                    <Avatar seed={comment?.username ?? "-"} />
                  </div>
                  <div className="flex flex-col">
                    <p className="py-2 text-sm text-gray-400">
                      <span className="font-semibold text-gray-600">{comment?.username ?? "-"}</span> &bull; <TimeAgo date={comment?.created_at} />
                    </p>
                    <p>{comment?.text ?? "-"}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostPage
