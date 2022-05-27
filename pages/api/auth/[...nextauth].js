import NextAuth from "next-auth"
import RedditProvider from "next-auth/providers/reddit"

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_REDDIT_CLIENT_SECRET,
    }),
  ],
})
