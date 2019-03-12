const bycrypt = require("bcrypt");
const config = require("../config.json");
const users = [];

const names = ["tim", "john", "molly", "jan", "jill"];
const passwords = ["test", "test1", "test2", "test3", "test4"];

module.exports = function () {
    for (let i = 0; i < 5; i++) {
        const newUser = {
            id: i+1,
            username: names[i],
            password: bycrypt.hashSync(passwords[i], config.salt)
        };
        users.push(newUser);
    }
    return users;
}