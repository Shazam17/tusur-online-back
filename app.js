const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const auth = require('./routes/auth');
const chats = require('./routes/chats');
const dialogs = require('./routes/dialogs');
const friends = require('./routes/friends');
const groups = require('./routes/groups');
const posts = require('./routes/posts');
const stories = require('./routes/stories');


const app = express();




app.use(cors())
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/auth', auth);
app.use('/chats', chats);
app.use('/dialogs', dialogs);
app.use('/friends', friends);
app.use('/groups', groups);
app.use('/posts', posts);
app.use('/stories', stories);

module.exports = app;
