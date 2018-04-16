const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onError = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

// 路由
const index = require('./routes/index')
const api_users = require('./routes/api_users')

// 错误处理
onError(app)

// 中间件
app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// 制定模板引擎
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 打印log
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api_users.routes(), api_users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
