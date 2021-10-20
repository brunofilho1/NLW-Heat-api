import {Router} from 'express';
import { AuthenticateUserController } from './controller/AuthenticateUserController';
import { CreateMessageController } from './controller/CreateMessageController';
import { GetLast3MessagesController } from './controller/GetLast3MessagesController';
import { ProfileUserController } from './controller/ProfileUserController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

// instanciado direto pro pro controller, o metodo recebe o req.res., como ele está dentro da rota ele funciona como se fosse um middleware, por isso não preciso passar os params req.res.
router.post('/authenticate', new AuthenticateUserController().handle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last3', new GetLast3MessagesController().handle)

router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export {router}