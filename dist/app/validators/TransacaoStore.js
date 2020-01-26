"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

exports. default = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      nsu: Yup.number()
        .integer()
        .required(),
      valor: Yup.number()
        .positive()
        .required(),
      bandeira: Yup.string()
        .oneOf(['VISA', 'MASTERCARD', 'ELO', 'AMEX'])
        .required(),
      modalidade: Yup.string()
        .oneOf(['debito', 'credito'])
        .required(),
      horario: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
