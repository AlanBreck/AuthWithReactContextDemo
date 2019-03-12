const users = require("../utils/users-generator")();
console.log(users);
const User = {
    find: function (condition) {
        return new Promise(function (resolve, reject) {
            const match = users.find(user => user.username === condition.username);
            setTimeout(function () {
                resolve(match);
            }, 1000);
        });
    }
}

module.exports = User;