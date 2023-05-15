const Card = require('../models/card');
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  // Возвращает все карточки
  Card.find({})
    .populate([['owner', 'likes']])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  // Создаёт карточку

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  // Удаляет карточку
  Card.findById(req.params.cardId) // находим карточку по id
    .orFail(new NotFoundError('Карточка с указанным _id не найдена.')) // если не удалось найти по id
    .then((data) => {
      if (!(req.user._id === data.owner.toString())) {
        // проверяем можем ли мы ее удалить (владелец карточки и юзер профиля один и тот же?)
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return Card.findByIdAndRemove(req.params.cardId) // находим карточку по id и удаляем
        .orFail(() => {
          throw new NotFoundError('Карточка с указанным _id не найдена');
        })
        .then((card) => {
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.params.cardId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Переданы некорректные данные для снятия лайка');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
