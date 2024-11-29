const {Sequelize} = require('../database')
const {User, Request} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const ApiError = require('../ApiError')


class RequestController
{
    // Создание записи в таблице Request
    async createRequest(req, res, next)
    {
        try {
            const {contacts, type_service, desired_date_and_time, adress, payment_type} = req.body
            if(!contacts||!type_service||!desired_date_and_time||!adress||!payment_type)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createpas = await Request.create({contacts, type_service, desired_date_and_time, adress, payment_type})
            return res.json({message: "Заявка создана"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Request
    async getAll(req,res)
    {
        const request = await Request.findAll()
        return res.json({request})
    }
    // Редактирование
    async RedId(req,res)
    {
        const {id_user} = req.body
        const redreq = await Request.update({title : req.body.title},{where:{id_user}})
        return res.json(redreq)
    }
    // Удаление по выбранному ID таблицы request
    async DelId(req,res)
    {
        const {id_user} = req.params
        let delidreq = await Request.destroy({where:{id_user}})
        return res.json(delidreq)
    }
}

module.exports= new RequestController()