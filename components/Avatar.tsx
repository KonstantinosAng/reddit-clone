import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"

type Props = {
  seed?: string
  large?: boolean
  className?: string
}

const Avatar = ({ seed, large, className }: Props) => {
  const { data: session } = useSession()
  return (
    <div
      className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gray-300 bg-white ${large && "h-20 w-20"} ${
        className ?? ""
      }`}
    >
      <Image layout="fill" src={`https://avatars.dicebear.com/api/open-peeps/${seed ?? session?.user?.name ?? "placeholder"}.svg`} />
    </div>
  )
}

export default Avatar
