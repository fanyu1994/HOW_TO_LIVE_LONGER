// src/controllers/auth.ts
import { Context } from 'koa';
import * as argon2 from 'argon2';

import User from '../entity/Auth';

import { AppDataSource } from "../data-source"

class AuthController {
  // ...

  public static async register(ctx: Context) {
    const userRepository = AppDataSource.getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }
}

module.exports = AuthController
