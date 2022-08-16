const {Model, DataTypes } = require('sequelize'); //MODLE and DataTypes we'll use from sequilize packages. 
const sequelize = require ('../config/connection'); //connection to Mysql server 

//create our post model 
class Post extends Model{} 

//create feilds/columns for post model 
Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey : true,
            autoIncrement : true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url:{
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                isUrl: true
            }
        }, 
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model : 'user',
                key: 'id'
            }
        }
    },

    {
        sequelize,
        freezeTableName : true,
        underscored : true,
        modelName : 'post'
    }
);

module.exports = Post;