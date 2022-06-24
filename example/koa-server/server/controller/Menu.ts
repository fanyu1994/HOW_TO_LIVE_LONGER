import { Context } from 'koa';

import MenuTable1 from '../entity/Menu';

import { AppDataSource } from "../data-source"



export default class MenuController {
  public static async ListMenu(ctx: Context) {
    const userRepository = AppDataSource.getRepository(MenuTable1);
    const menuList = await userRepository.find();

    ctx.status = 200;
    ctx.body = {
      response: menuList,
      status: 200,
      msg: 'success'
    }
  }
  public static async addMenu(ctx: Context) {
    const params = ctx.request.body || {}
    const menu_repository = AppDataSource.getRepository(MenuTable1)
    try {
      const res = await menu_repository.save(params)
      ctx.status = 200
      ctx.body = res
    } catch (err) {
      ctx.status = 500
      ctx.body = err
    }
  }

  // public static async showUserDetail(ctx: Context) {
  //   const userRepository = getManager().getRepository(Menu);
  //   const user = await userRepository.findOne(ctx.params.id);

  //   if (user) {
  //     ctx.status = 200;
  //     ctx.body = user;
  //   } else {
  //     ctx.status = 404;
  //   }
  // }

  // public static async updateUser(ctx: Context) {
  //   const userRepository = getManager().getRepository(Menu);
  //   await userRepository.update(ctx.params.id, ctx.request.body);
  //   const updatedUser = await userRepository.findOne(ctx.params.id);

  //   if (updatedUser) {
  //     ctx.status = 200;
  //     ctx.body = updatedUser;
  //   } else {
  //     ctx.status = 404;
  //   }
  // }

  //   public static async deleteUser(ctx: Context) {
  //     const userRepository = getManager().getRepository(Menu);
  //     await userRepository.delete(+ctx.params.id);

  //     ctx.status = 204;
  //   }
}
