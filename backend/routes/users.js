const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

userRouter.get('/', getUsers); // Возвращает всех пользователей

userRouter.get('/me', getUserMe); // Возвращает тукущего пользователя

userRouter.get('/:UserId', celebrate({
  params: Joi.object().keys({
    UserId: Joi.string().hex().length(24),
  }),
}), getUser); // Возвращает пользователя по _id

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser); // Обновляет профиль

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(
      /http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
    ),
  }),
}), updateAvatar); // Обновляет аватар

module.exports = { userRouter };
