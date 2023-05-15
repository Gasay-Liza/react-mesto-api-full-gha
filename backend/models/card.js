const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      // имя карточки
      type: String, // name - это строка
      required: true, // оно должно быть у каждой карточки, так что name — обязательное поле
      minlength: 2, // минимальная длина имени — 2 символа
      maxlength: 30, // а максимальная — 30 символов
    },
    link: {
      //  ссылка на картинку
      type: String,
      required: true,
      validate: {
        validator: (string) => {
          validator.isURL(string);
        },
      },
    },
    owner: {
      // сылка на модель автора карточки
      type: mongoose.Schema.Types.ObjectId, // тип - id
      ref: 'user',
      required: true,
    },
    likes: {
      // список лайкнувших пост пользователей
      type: [mongoose.Schema.Types.ObjectId], // тип - id
      ref: 'user',
      default: [], // по умолчанию — пустой массив
    },
    createdAt: {
      // дата создания
      type: Date, // тип - дата
      default: Date.now, // значение по умолчанию
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
