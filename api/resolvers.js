import { users, user, userPosts, postComments, countPostsPerUser, countCommentsPerUser } from './controllers'

const resolvers = {
    Query: {
        users,
        user
    },
    User: {
        posts: userPosts,
        postCount: countPostsPerUser,
        commentCount: countCommentsPerUser
    },
    Post: {
        comments: postComments
    }
}

export default resolvers