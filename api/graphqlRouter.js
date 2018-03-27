const { createApolloFetch } = require('apollo-fetch')
const { sortBy, zipObject } = require('lodash')

const apolloFetch = createApolloFetch({ uri: 'http://localhost:3000/graphql' })

//get data for templates
const getUserData = () => {
    const query = `
    query users
    {
      users {
        id
        name {
          firstName
          lastName
        }
        postCount
        commentCount
      }

    }
  `
    const result = apolloFetch({ query }).then(res => { return res.data });
    return result
}

const getUserById = (userId) => {
    const query = `
    query users($userId: ID!)
      {
        user(id: $userId) {
          id
          name {
            firstName
            lastName
          }
          email
          username
          address {  
            street
            suite
          }
          posts {
            title
            body
            comments {
              name
              email
              body
            }
          }
        }
      }
  `
    const variables = { userId: userId }
    const result = apolloFetch({ query, variables }).then(res => { return res.data })
    return result
}

export { getUserData, getUserById }