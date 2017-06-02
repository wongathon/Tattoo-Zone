module.exports = function(sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        caption: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.TEXT,
            allowNull: true

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
