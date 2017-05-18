module.exports = function(sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {

        classMethods: {
            associate: function(models) {

                Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    }
    );
    return Post;

};
