module.exports = function(sequelize, DataTypes) {

    var Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {

         classMethods: {
        //     associate: function(models) {

        //         Comment.belongsTo(models.User, {
        //             foreignKey: {
        //                 allowNull: false
        //             }
        //         });

        //         Comment.belongsTo(models.Post, {
        //             foreignKey: {
        //                 allowNull: false
        //             }
        //         });
                
        //     }
        }
    }
    );
    return Comment;

};
