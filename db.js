const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/to_do_list_db')
const{UUID,UUIDV4,STRING,INTEGER,BOOLEAN} = Sequelize;

const Task = conn.define('task',{
    id:{
        type:UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    name:{
        type:STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    priority:{
        type:INTEGER,
        defaultValue:5,
        allowNull:false
    },
    isComplete:{
        type:BOOLEAN,
        defaultValue:false,
        allowNull:false
    }
})

 module.exports = {
    conn,
    Task
 }