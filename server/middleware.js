const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message
    }
  }
}

module.exports = {
  errorHandler
}
