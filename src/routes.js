import { Router } from 'express';
import expressBasicAuth from 'express-basic-auth';
import authTerminal from './app/middlewares/authTerminal';
import TransacaoController from './app/controllers/TransacaoController';
import ExtratoController from './app/controllers/ExtratoController';

import validateTransacaoStore from './app/validators/TransacaoStore';
import SaldoController from './app/controllers/SaldoController';

const routes = new Router();
/** Criei duas maneiras de verificação das credenciais do usuário
 * pois imaginei que a implementação desta validação poderia ser importante
 * para a avaliação do desafio. Entretanto, para uma solução real, é recomendado
 * utilizar a biblioteca express-basic-auth
 */
routes.post(
  '/transacao',
  authTerminal,
  validateTransacaoStore,
  TransacaoController.store
);

routes.use(expressBasicAuth({ users: { portal: '123456' }, challenge: true }));

routes.get('/extrato', ExtratoController.index);
routes.get('/saldo', SaldoController.index);

export default routes;
