import { Router } from 'express';
import { Receitas } from '../crawler/guarulhos/receitas';

const router = Router();

const receitas = new Receitas();

router.post('/guarulhos/receitas', receitas.execute);

export { router };
