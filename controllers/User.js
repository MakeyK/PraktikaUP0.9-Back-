const { Sequelize } = require('../database')
const { User } = require('../models/model')
const ApiError = require('../ApiError')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

const generateJwt = (login, password, email, phone, role) => {
    return jwt.sign(
        { login, password, email, phone, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}


class UserController {
    async registration(req, res, next) {
        try {
            const { FIO, phone, email, login, password } = req.body
            let candidate = await User.findOne({ where: { login } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const user = await User.create({ FIO, phone, email, login, password })
            const token = generateJwt(user.id_user, user.login, user.password)
            return res.json({ token })
        }
        catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body
            if (!login) {
                return next(ApiError.badRequest('Введите логин'))
            }
            if (!password) {
                return next(ApiError.badRequest('Введите пароль'))
            }
            const obj = { login, password } //объект для динамического условия из-за возможности не вводить почту или телефон
            let condition = []
            condition = Object.entries(obj).reduce((accum, [key, value]) => { //запись в accum пар [key,value]
                if (value) { //запись значений не являющихся undefined или null
                    accum[key] = value
                }
                return accum
            }, {}) //используем объект как первичное значение accum
            console.log(condition)
            const user = await User.findOne({
                where: { [Op.or]: condition }
            })
            if (!user) {
                return next(ApiError.internal('Введен неверный логин или нет учётной записи'))
            }
            const token = generateJwt(user.id_user, user.role)
            return res.status(200).json({ token })
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }

    // Вывод всей таблицы users
    async getAll(req, res) {
        const getuser = await User.findAll()
        return res.json(getuser)
    }
    // Редактирование пользователя
    async RedId(req, res) {
        const { id_user } = req.body
        const redreq = await User.update({ title: req.body.title }, { where: { id_user } })
        return res.json(redreq)
    }
    // Удаление по выбранному ID таблицы users
    async DelId(req, res) {
        const { id_user } = req.params
        let delidus = await User.destroy({ where: { id_user } })
        return res.json(delidus)
    }

}

module.exports = new UserController()
