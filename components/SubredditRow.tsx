import React from "react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import Avatar from "./Avatar"
import Link from "next/link"

type Props = {
  index: number
  topic: string
}

const SubredditRow = ({ index, topic }: Props) => {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar seed={`/subreddit/${topic ?? "dummy"}`} />
      <p className="flex-1 truncate">r/{topic ?? "dummy"}</p>
      <Link href={`/subreddit/${topic ?? "lost"}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">View</div>
      </Link>
    </div>
  )
}

export default SubredditRow
