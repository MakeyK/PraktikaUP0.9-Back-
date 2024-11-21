const sequelize = require('../database')
const {DataTypes, UUIDV4} = require('sequelize')

const User = sequelize.define('users',{
  id_user: {type: DataTypes.UUID, primaryKey: true, defualtValue: UUIDV4},
  FIO: {type: DataTypes.STRING},
  phone: {type: DataTypes.BIGINT},
  email: {type: DataTypes.STRING},
  login: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING, allowNull:true},
  role: {type: DataTypes.STRING, defaultValue: "user"},
}, {timestamps: false})

const Request = sequelize.define('request', {
  id_request: {type: DataTypes.UUID, primaryKey: true, defualtValue: UUIDV4},
  id_user: {type: DataTypes.UUID, defaultValue: UUIDV4, references: {model: User, key: 'id_user'}},
  date_and_time_supply: {type: DataTypes.DATE},
  contacts: {type: DataTypes.STRING},
  type_service: {type: DataTypes.STRING},
  desired_date_and_time: {type: DataTypes.DATE},
  adress: {type: DataTypes.STRING},
  payment_type: {type: DataTypes.STRING},
  status_request: {type: DataTypes.STRING}
}, {timestamps: false})

User.hasMany(Request, {
  foreignKey: 'id_user'
})

module.exports={
  User, Request
}