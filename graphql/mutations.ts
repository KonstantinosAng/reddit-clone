import { gql } from "@apollo/client"

const CREATE_POST = gql`
  mutation createPost($body: String!, $image: String!, $subreddit_id: ID!, $title: String!, $username: String!) {
    insertPost(body: $body, image: $image, subreddit_id: $subreddit_id, title: $title, username: $username) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`

const CREATE_SUBREDDIT = gql`
  mutation insertSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      topic
      id
      created_at
    }
  }
`

export { CREATE_POST, CREATE_SUBREDDIT }
