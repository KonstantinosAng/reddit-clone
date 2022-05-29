import Feed from "@/Feed"
import PostBox from "@/PostBox"
import Header from "@/Header"
import type { NextPage } from "next"
import Head from "next/head"
import favicon from "../public/favicon.webp"
import { useQuery } from "@apollo/client"
import { GET_SUBREDDIT_LIST_WITH_LIMIT } from "graphql/queries"
import { Jelly } from "@uiball/loaders"
import SubredditRow from "@/SubredditRow"

const Home: NextPage = () => {
  const { data: topCommunitiesData, loading } = useQuery(GET_SUBREDDIT_LIST_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  return (
    <div className="">
      <Header />
      <div className="my-7 mx-auto max-w-5xl">
        <Head>
          <title>Reddit 2.0 Clone</title>
          <link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
        </Head>
        <PostBox />
        <div className="mx-4 flex">
          <Feed />
          {loading ? (
            <div className="flex h-full w-full items-center justify-center p-10 text-xl">
              <Jelly size={50} color="#FF4501" />
            </div>
          ) : (
            <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
              <div>
                {topCommunitiesData?.getSubredditListWithLimit?.map((subreddit: Subreddit, idx: number) => (
                  <SubredditRow key={subreddit?.id ?? idx} topic={subreddit?.topic ?? "notFound"} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
