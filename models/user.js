module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: { 
            type: DataTypes.STRING,
            notEmpty: true
        },
        username: {
            type: DataTypes.TEXT
        },
        about: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
        },
        {
        // We're saying that we want our User to have Posts
         classMethods: {
        //     associate: function(models) {
        //         // Associating User with Posts
        //         // When an User is deleted, also delete any associated Posts
        //         User.hasMany(models.Post, {
        //             onDelete: "cascade"
        //         });

        //         User.hasMany(models.Comment, {
        //             onDelete: "cascade"
        //         });
                
        //     }
         }
    }
    );
    return User;
};