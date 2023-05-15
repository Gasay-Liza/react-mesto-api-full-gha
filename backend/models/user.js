const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { UnauthorizedError } = require('../errors/index');

const userSchema = new mongoose.Schema(
  {
    name: {
      // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // name - это строка
      required: false,
      default: 'Жак-Ив Кусто',
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30, // а максимальная — 30 символов
    },
    about: {
      // информация о пользователе
      type: String,
      required: false,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      // ссылка на аватарку
      type: String,
      required: false,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (string) => {
          validator.isURL(string);
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (string) => {
          validator.isEmail(string); // валидация email
        },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false, toJSON: { useProjection: true }, toObject: { useProjection: true } },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль'),
          );
        }

        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
