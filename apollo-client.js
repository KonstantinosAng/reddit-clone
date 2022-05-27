import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STEP_ZEN_API_ENDPOINT,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEP_ZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
