import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session} basePath="/api/auth">
        <Toaster />
        <div className="h-screen">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
