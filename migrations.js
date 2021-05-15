const { Sequelize, DataTypes } = require('sequelize');

console.log(process.env)
// const sequelize = new Sequelize(`postgres://admin:password@${process.env.DB_HOST}:5432/tusur_new`);
const sequelize = new Sequelize(`postgres://esgtwvxpjwupzk:a32099643255757e1d3e7ac8eb8f9acc33c09c9dc271da9cf2becd0e43c59f43@ec2-18-215-111-67.compute-1.amazonaws.com:5432/d7qls4u22uv817`,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // <<<<<< YOU NEED THIS
            }
        }
    }
);


//'postgres://admin:password@localhost:5432/tusur_new'
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    password: {
        type: DataTypes.STRING
    },
    avatar_url: {
        type: DataTypes.STRING,
    }
});

const Group = sequelize.define('Group', {
   title: {
       type: DataTypes.STRING
   },
    admin_id: {
       type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

const User_Post = sequelize.define('User_Post', {
    title: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Group,
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING
    }
})

const Group_Post = sequelize.define('Group_Post', {
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    }
})

const Dialog = sequelize.define('Dialog', {
    title: {
        type: DataTypes.STRING
    }
});

const Message = sequelize.define('Message', {
    text: {
        type: DataTypes.STRING
    },
    attachment: {
        type: DataTypes.STRING
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    chat_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Dialog,
            key: 'id'
        }
    },
});



const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.STRING
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User_Post,
            key: 'id'
        },
    }
});

const Photo = sequelize.define('Photo', {
    title: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
});


const Story = sequelize.define('Story', {
   photo: {
       type: DataTypes.STRING
   },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
});

const Document = sequelize.define('Document', {
    title: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
});

const User_Group = sequelize.define('User_Group',{
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    group_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    },
})

const User_Dialog = sequelize.define('User_Dialog',{
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    dialog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Dialog,
            key: 'id'
        }
    },
})

const User_Friends = sequelize.define('User_Friends',{
    user_id1: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    user_id2: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
})

async function migrate(){

    User.hasOne(Story)
    User.hasMany(Comment)
    User.hasOne(Message)
    User.hasOne(Group)
    User.hasMany(User_Post)
    User.hasMany(User_Group)
    User.hasMany(User_Dialog)
    User.hasMany(User_Friends)


    Dialog.hasMany(Message)
    Group.hasMany(User_Post)
    User_Post.hasMany(Comment)

    await User.sync({force: true});


    // Group.hasOne(User)
    await Group.sync({force: true});
    await Dialog.sync({force: true});


    // User_Post.hasOne(User)
    // User_Post.hasOne(Group)


    await User_Post.sync({force: true});
    await Group_Post.sync({force: true});
    await Dialog.sync({force: true});


    // Message.hasOne(Dialog)
    // Message.hasOne(User)
    await Message.sync({force: true});


    // Comment.hasOne(User)
    // Comment.hasOne(User_Post)
    await Comment.sync({force: true});
    await Photo.sync({force: true});
    await Document.sync({force: true});
    await Story.sync({force: true});


    // User_Group.hasMany(Group)
    // User_Group.hasMany(User)
    await User_Group.sync({force: true});

    // User_Dialog.hasMany(User)
    // User_Dialog.hasMany(Dialog)
    await User_Dialog.sync({force: true});

    // User_Friends.hasMany(User)
    // User_Friends.hasMany(User)
    await User_Friends.sync({force: true});
}

migrate()


module.exports = {
    User,
    Group,
    User_Post,
    Group_Post,
    Photo,
    Message,
    Dialog,
    CommentModel: Comment,
    Story,
    DocumentModel: Document,
    User_Group,
    User_Dialog,
    User_Friends
}
