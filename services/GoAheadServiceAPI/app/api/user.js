const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) res.json({
        success: false,
        message: 'Пожалуйста, введите все данные'
    });
    else {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        user.save(error => {
            if (error) return res.status(400).json({
                success: false,
                message: 'Ошибка регистрации'
            });
            res.json({
                success: true,
                message: 'Регистрация прошла успешно'
            });
        });
    }
}

module.exports = api;
