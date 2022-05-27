import { useMutation, useLazyQuery } from "@apollo/client"
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline"
import { CREATE_POST, CREATE_SUBREDDIT } from "graphql/mutations"
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "graphql/queries"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Avatar from "./Avatar"

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

const PostBox = () => {
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  })

  const [getSubreddit] = useLazyQuery(GET_SUBREDDIT_BY_TOPIC)

  const [createSubreddit] = useMutation(CREATE_SUBREDDIT)

  const onSubmit = handleSubmit(async formData => {
    const image = formData.postImage || ""
    const notification = toast.loading("Creating new post...")

    try {
      const { data } = await getSubreddit({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
        onError: error => console.error(error),
      })
      const subredditExists = data?.getSubredditListByTopic.length > 0
      if (!subredditExists) {
        const { data } = await createSubreddit({
          variables: {
            topic: formData.subreddit,
          },
          onError: e => console.error(e),
          onCompleted: async data => {
            await createPost({
              variables: {
                body: formData.postBody,
                image,
                subreddit_id: data?.insertSubreddit?.id,
                title: formData.postTitle,
                username: session?.user?.name ?? "",
              },
            })
          },
        })
      } else {
        await createPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: data?.getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name ?? "",
          },
        })
      }
      setValue("postBody", "")
      setValue("postImage", "")
      setValue("postTitle", "")
      setValue("subreddit", "")
      toast.success("New post created!", {
        id: notification,
      })
    } catch (error) {
      toast.error("Whoops something went wrong! 😪", {
        id: notification,
      })
      console.error(error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          type="text"
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          placeholder={session ? `Create a post by entering a title` : "Sign in to post"}
          disabled={!session}
        />
        <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-300 ${imageBoxOpen && "text-blue-300"}`} />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input className="p-p2 m-2 flex-1 bg-blue-50 outline-none" {...register("postBody")} type="text" placeholder="Text (optional)" />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="p-p2 m-2 flex-1 bg-blue-50 outline-none"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="i.e. reactjs"
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input className="p-p2 m-2 flex-1 bg-blue-50 outline-none" {...register("postImage")} type="text" placeholder="Optional..." />
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && <p>- A Post Title is required</p>}
              {errors.subreddit?.type === "required" && <p>- A Subreddit is required</p>}
            </div>
          )}
          {!!watch("postTitle") && (
            <button type="submit" className="w-full rounded-full bg-blue-400 p-2 text-white">
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
