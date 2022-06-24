const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror_ = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require("koa2-cors")
require('reflect-metadata');
import router from "./routes"
import { AppDataSource } from "./server/data-source"

AppDataSource
  .initialize()
  .then((res: any) => {
    // error handler
    onerror_(app)

    // middlewares
    app.use(cors({
      origin: function (ctx: any) { //设置允许来自指定域名请求
        if (ctx.url === '/test') {
          return '*'; // 允许来自所有域名请求
        }
        return '*'; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    }))
    app.use(bodyparser({
      enableTypes: ['json', 'form', 'text']
    }))
    app.use(json())
    app.use(logger())
    app.use(require('koa-static')(__dirname + '/public'))

    app.use(views(__dirname + '/views', {
      extension: 'ejs'
    }))

    // logger
    app.use(async (ctx: { method: any; url: any }, next: () => any) => {
      const start = +new Date()
      await next()
      const ms: number = +new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })

    // routes
    app.use(router.routes()).use(router.allowedMethods())
    // app.listen(PORT, `server listen ${PORT}`)
    // error-handling
    app.on('error', (err: any, ctx: any) => {
      console.error('server error', err, ctx)
    });


  })
  .catch((err: any) => {
    console.log(err, 'err_typeorm');
  })

module.exports = app


