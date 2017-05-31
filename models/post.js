module.exports = function(sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        caption: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {

        classMethods: {
            associate: function(models) {

                Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });

                Post.hasMany(models.Comment, {
                    onDelete: "cascade"
                });

            }
        }
    }
    );
    return Post;

};
