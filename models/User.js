const {Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connections');

//create our user model
class User extends Model{} //user inherits all of the functionality from Modle class has

//define table columns and configuration
User.init(
    {
       //define and id column
       id:{
        //use the sequilize Datatypes object to provide what type of data it is
        type: Datatypes.INTERGER,
        //this is the equivalent of SQL's 'NOT NULL' option
        allowNull: false,
        //instructs that this is the primarykey
        primaryKey: true,
        //turn on auto increment
        autoIncrement: true
       }, 
       //define a username column
       username:{
        type : Datatypes.STRING,
        allowNull: false
       }, 
       //define and email column
       email:{
        type: Datatypes.STRING,
        allowNull: false,
        //there cannot be any duplicate email values in this table
        unique: true,
        //if allownull is set to false, we can run our data thru validators before creating the table data
        validate:{
            isEmail: true
        }
       },
       //define a password
       password:{
        type : Datatypes.STRING,
        allowNull: false,
        validate:{
            //this means the password must be at least four characters long
            len:[4]
        }
       }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //Pass in our imported sequlize connection (the direct connection to our database)
        sequelize,
        //dont automatically create createdAt/updatedAT timestamp feilds
        timestamps: false,
         // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports= User;

//.init() method to initialize the model's data and configuration, passing in two objects as arguments. 
//The first object will define the columns and data types for those columns. The second object it accepts configures certain options for the table.