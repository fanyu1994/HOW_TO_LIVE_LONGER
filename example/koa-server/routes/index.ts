// src/routes.ts
const router = require('koa-router')()

const auth = require('../server/controller/auth');
import menu from "../server/controller/Menu"

// auth 相关的路由
// router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);

//menu
router.get('/menu', menu.ListMenu)
router.post('/menu', menu.addMenu)

export default router
