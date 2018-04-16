const router = require('koa-router')()

router.prefix('/v1/users')

router.post('/login', function (ctx, next) {
  ctx.body = {
    code: 0
  }
  console.log(ctx.request.body.password)
})

router.get('/logout/:id', function (ctx, next) {
  ctx.body = 'this is a users/bar response' + ctx.params.id
})

module.exports = router
