import React from "react"
import Image from "next/image"
import Logo from "@assets/logo.png"
import User from "@assets/user.png"
import { ChevronDownIcon, HomeIcon, SearchIcon, MenuIcon } from "@heroicons/react/solid"
import { BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon } from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {
  const { data: session } = useSession()
  return (
    <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
      <Link href="/">
        <div className="relative h-6 w-16 flex-shrink-0 cursor-pointer object-contain sm:h-10 sm:w-20">
          <Image objectFit="contain" src={Logo} layout="fill" priority />
        </div>
      </Link>
      <div className="xl:miw-w-[300px] mx-2 flex items-center sm:mx-7">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex w-full flex-grow items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input type="text" placeholder="Search Reddit" className="w-full flex-grow overflow-x-hidden text-ellipsis bg-transparent outline-none" />
        <button type="submit" hidden />
      </form>
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-2 flex items-center sm:ml-5 lg:hidden">
        <MenuIcon className="icon" />
      </div>
      <div
        onClick={() => (session ? signOut() : signIn())}
        className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image objectFit="contain" src={User} layout="fill" alt="" />
        </div>
        <div className="flex-1 whitespace-nowrap text-xs">
          {session && <p className="truncate">{session?.user?.name ?? ""}</p>}
          <p className="text-gray-400">{session ? "Sign Out" : "Sign in"}</p>
        </div>
        <ChevronDownIcon className="text- h-5 flex-shrink-0 text-gray-400" />
      </div>
    </div>
  )
}

export default Header
