import Feed from "@/Feed"
import PostBox from "@/PostBox"
import Header from "@/Header"
import type { NextPage } from "next"
import Head from "next/head"
import favicon from "../public/favicon.webp"

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="my-7 mx-auto max-w-5xl">
        <Head>
          <title>Reddit 2.0 Clone</title>
          <link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
        </Head>
        <PostBox />
        <div className="flex">
          <Feed />
        </div>
      </div>
    </div>
  )
}

export default Home
