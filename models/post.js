module.exports = function(sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        caption: {
            type: DataTypes.TEXT,

            allowNull: true

        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,

            allowNull: true
        },
        tags: {
            type: DataTypes.TEXT,
            allowNull: true

        }
    }, {

        classMethods: {
        //     associate: function(models) {


                Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: true
                    }
                });


        //         Post.hasMany(models.Comment, {
        //             onDelete: "cascade"
        //         });

        //     }
        }
    }
  );
    return Post;

};
