const { sortBy, split, zipObject } = require('lodash');

// data
const endpoint = 'http://jsonplaceholder.typicode.com'
const toJSON = res => res.json();

const namePrefix = /(Mr|MR|Ms|Miss|Mrs|Dr|Sir)(\.?)\s/;
//resolver functions
const users = () => fetch(`${endpoint}/users`).then(toJSON).then(data => {
    data.forEach(t => {
        const match = namePrefix.exec(t.name);
        (match !== null) ? t.name = t.name.replace(match[0], "") : t.name = t.name;
        t.name = split(t.name, ' ');
        t.name = zipObject(['firstName', 'lastName'], [t.name[0], t.name[1]]);
    })
    return sortBy(data, (el) => el.name.lastName)
})

const user = (users, { id }) => fetch(`${endpoint}/users/${id}`).then(toJSON).then(data => {
    const match = namePrefix.exec(data.name);
    (match !== null) ? data.name = data.name.replace(match[0], "") : data.name = data.name;
    data.name = split(data.name, ' ');
    data.name = zipObject(['firstName', 'lastName'], [data.name[0], data.name[1]]);
    return data
})

const userPosts = ({ id }) => fetch(`${endpoint}/users/${id}/posts`).then(toJSON).catch(error => next(error))

const postComments = ({ id }) => fetch(`${endpoint}/posts/${id}/comments`).then(toJSON).catch(error => next(error))

const countPostsPerUser = (args) => {
    const { id } = args
    return fetch(`${endpoint}/users/${id}/posts`)
        .then(toJSON)
        .then(data => {
            return data.length
        })
}

const countCommentsPerUser = (args) => {
    const { id } = args
    return fetch(`${endpoint}/users/${id}/posts`)
        .then(toJSON)
        .then(data => {
            var userPostIds = data.map(obj => obj.id)
            var formatPostIds = userPostIds.map(id => 'postId=' + id)
            var result = formatPostIds.join('&')

            return fetch(`${endpoint}/comments?` + result)
                .then(toJSON)
                .then(data => data.length)
        })
}

export { users, user, userPosts, postComments, countPostsPerUser, countCommentsPerUser }