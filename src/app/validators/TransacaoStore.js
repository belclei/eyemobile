import * as Yup from 'yup';

export default async (req, res, next) => {
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
