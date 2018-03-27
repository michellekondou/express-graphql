require("source-map-support").install();
exports.id = 0;
exports.modules = {

/***/ "./api/restRouter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return userPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return postComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return countPostsPerUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return countCommentsPerUser; });
var _require = __webpack_require__("lodash"),
    sortBy = _require.sortBy,
    split = _require.split,
    zipObject = _require.zipObject;

// data


var endpoint = 'http://jsonplaceholder.typicode.com';
var toJSON = function toJSON(res) {
    return res.json();
};

var namePrefix = /(Mr|MR|Ms|Miss|Mrs|Dr|Sir)(\.?)\s/;
//resolver functions
var users = function users() {
    return fetch(endpoint + '/users').then(toJSON).then(function (data) {
        data.forEach(function (t) {
            var match = namePrefix.exec(t.name);
            match !== null ? t.name = t.name.replace(match[0], "") : t.name = t.name;
            t.name = split(t.name, ' ');
            t.name = zipObject(['firstName', 'lastName'], [t.name[0], t.name[1]]);
        });
        return sortBy(data, function (el) {
            return el.name.lastName;
        });
    });
};

var user = function user(users, _ref) {
    var id = _ref.id;
    return fetch(endpoint + '/users/' + id).then(toJSON).then(function (data) {
        var match = namePrefix.exec(data.name);
        match !== null ? data.name = data.name.replace(match[0], "") : data.name = data.name;
        data.name = split(data.name, ' ');
        data.name = zipObject(['firstName', 'lastName'], [data.name[0], data.name[1]]);
        return data;
    });
};

var userPosts = function userPosts(_ref2) {
    var id = _ref2.id;
    return fetch(endpoint + '/users/' + id + '/posts').then(toJSON);
};

var postComments = function postComments(_ref3) {
    var id = _ref3.id;
    return fetch(endpoint + '/posts/' + id + '/comments').then(toJSON);
};

var countPostsPerUser = function countPostsPerUser(args) {
    var id = args.id;

    return fetch(endpoint + '/users/' + id + '/posts').then(toJSON).then(function (data) {
        return data.length;
    });
};

var countCommentsPerUser = function countCommentsPerUser(args) {
    var id = args.id;

    return fetch(endpoint + '/users/' + id + '/posts').then(toJSON).then(function (data) {
        var userPostIds = data.map(function (obj) {
            return obj.id;
        });
        var formatPostIds = userPostIds.map(function (id) {
            return 'postId=' + id;
        });
        var result = formatPostIds.join('&');

        return fetch(endpoint + '/comments?' + result).then(toJSON).then(function (data) {
            return data.length;
        });
    });
};



/***/ })

};
//# sourceMappingURL=0.3a555a5891384fa979a2.hot-update.js.map