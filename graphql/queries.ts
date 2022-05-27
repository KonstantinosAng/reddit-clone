import { gql } from "@apollo/client"

const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditListByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

const GET_ALL_POSTS = gql`
  query GetPostList {
    getPostList {
      title
      username
      id
      created_at
      image
      subreddit_id
      body
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`

export { GET_SUBREDDIT_BY_TOPIC, GET_ALL_POSTS }
