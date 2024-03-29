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

const GET_SUBREDDIT_LIST_WITH_LIMIT = gql`
  query GetSubredditListWithLimit($limit: Int!) {
    getSubredditListWithLimit(limit: $limit) {
      id
      created_at
      topic
    }
  }
`

const GET_ALL_VOTES_BY_POST_ID = gql`
  query GetAllVotesByPostId($post_id: ID!) {
    getAllVotesByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      upvote
      username
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

const GET_ALL_POSTS_BY_TOPIC = gql`
  query GetPostListByTopic($topic: String!) {
    getPostListByTopic(topic: $topic) {
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

const GET_POST_BY_POST_ID = gql`
  query GetPostByPostId($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
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

export { GET_SUBREDDIT_BY_TOPIC, GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC, GET_POST_BY_POST_ID, GET_ALL_VOTES_BY_POST_ID, GET_SUBREDDIT_LIST_WITH_LIMIT }
