const {User_Group} = require("../migrations");
const {Group_Post} = require("../migrations");
const {User_Post} = require("../migrations");
const {Message} = require("../migrations");
const {Dialog} = require("../migrations");
const {User, Comment} = require("../migrations");


class SocketWrapper {


    constructor(io) {
        this.io = io;

        this.io.on('connection', function(socket) {
            console.log('A user connected');

            socket.on('disconnect', function () {
                console.log('A user disconnected');
            });

            socket.on('add_friend',  async (params) => {
                console.log(params);
                let user = await User.findOne({where: {id: params.id}});
                user.friends = [...user.friends, params.friend_id];

                let friend = await User.findOne({where: {id: params.friend_id}});
                friend.friends = [...friend.friends, params.id];
                await user.save();
                await friend.save();
            });

            socket.on('remove_friend',  async (params) => {
                console.log('remove');
                let user = await User.findOne({where: {id: params.id}});
                user.friends = user.friends.filter((friend) => friend !== params.friend_id);
                user.save();
            });

            socket.on('create_chat', async (params) => {
                const dialog = await Dialog.create({
                    title: '',
                    members_ids: [params.id, params.friend_id]
                })
                let user = await User.findOne({where: {id: params.id}});
                user.dialogs = [...user.dialogs, dialog.id];
                await user.save();

                let friend = await User.findOne({where: {id: params.friend_id}});
                friend.dialogs = [...friend.dialogs, dialog.id];
                await friend.save();
                console.log(dialog);
            })

            socket.on('send_message', async (params) =>
            {
                const message = await Message.create({
                    owner_id: params.id,
                    chat_id: params.chat_id,
                    text: params.text
                })
                console.log("Send message")
                socket.broadcast.emit("new_message", message);
                socket.emit("new_message", message);

            })

            socket.on('group_subscribe', async (params) => {
                await User_Group.create({
                    user_id: params.id,
                    group_id: params.group_id
                })
            })

            socket.on('group_unsubscribe', async (params) => {
                let user = await User.findOne({where: {id: params.id}});

                await user.save();
            })

            socket.on('post_create', async (params) => {
                await User_Post.create({
                    title: params.title,
                    content: params.content,
                    owner_id: params.id
                })
            })

            socket.on('group_post_create', async (params) => {
                await Group_Post.create({
                    title: params.title,
                    content: params.content,
                    owner_id: params.id,
                    group_id: params.group_id
                })
            })

            socket.on('comment_create', async (params) => {
                await Comment.create({
                    text: params.text,
                    owner_id: params.id,
                    post_id: params.post_id
                })
            })

            socket.on('modify', async (params) => {
                let user = await User.findOne({where: {id: params.id}});
                user.dialogs = [];
                await user.save();
            })
        });
    }


}

module.exports = SocketWrapper;
