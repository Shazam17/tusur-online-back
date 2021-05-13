const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://admin:password@localhost:5432/tusur_new');

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
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Group_Post,
            key: 'id'
        }
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

    User.hasMany(Story)
    User.hasMany(Group_Post)
    User.hasMany(Comment)

    await User.sync();

    Group.hasOne(User);
    await Group.sync();
    await Dialog.sync();

    User_Post.hasMany(User)
    Group_Post.hasMany(Group)

    await User_Post.sync();
    await Group_Post.sync();

    await Dialog.sync();

    Message.hasOne(User)
    Message.hasOne(Dialog)
    await Message.sync();


    Comment.hasOne(User)
    Comment.hasOne(Group_Post)

    Story.hasOne(User)

    await Comment.sync();
    await Photo.sync();
    await Document.sync();
    await Story.sync();


    User_Group.hasMany(User)
    User_Group.hasMany(Group)
    await User_Group.sync();

    User_Dialog.hasMany(User)
    User_Dialog.hasMany(Dialog)
    await User_Dialog.sync();


    User_Friends.hasMany(User)
    User_Friends.hasMany(User)
    await User_Friends.sync();
}

// migrate()


module.exports = {
    User,
    Group,
    User_Post,
    Group_Post,
    Photo,
    Message,
    Dialog,
    Comment,
    Story,
    DocumentModel: Document,
    User_Group,
    User_Dialog,
    User_Friends
}
