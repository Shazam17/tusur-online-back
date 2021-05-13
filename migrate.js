const {User, Group, Group_Post} = require("./migrations");

Group_Post.sync({alter: true});
User.sync({alter: true});
Group.sync({force: true});
