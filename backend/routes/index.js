const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const auth = require('../middlewares/auth');
const { linkRegex } = require('../utils/constans');
const { NotFoundError } = require('../errors/index');
const { createUser, login } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        linkRegex,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', () => {
  throw new NotFoundError('Маршрут не найден');
});

module.exports = {
  router,
};
