export const stick = async (ctx, next) => {
   ctx.params.flag = 0
   await next()
}

export const index = async (ctx, next) => {
  ctx.params.flag = 1
  await next()
}

export const byTag = async (ctx, next) => {
  ctx.params.flag = 2
  await next()
}

export const draft = async (ctx, next) => {
  ctx.params.flag = 3
  await next()
}