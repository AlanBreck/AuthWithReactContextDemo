// Mocking out a Model that queries a database.

const users = require("../utils/users-generator")();
const User = {
    find: function (params) {
        return new Promise(function (resolve, reject) {
            const fields = Object.keys(params);
            const match = users.find(user => {
                let isMatch = false;
                for (let field of fields) {
                    if (user[field] !== params[field]) return false;
                    else isMatch = true;
                }
                return isMatch;
            });
            setTimeout(function () {
                if (match) resolve(match);
                else reject({ message: "No match." });
            }, 1000);
        });
    }
}

module.exports = User;