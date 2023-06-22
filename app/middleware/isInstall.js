module.exports = opt => {
  return async (ctx, next) => {
    const isInstall = await ctx.service.user.checkInstall();
    if (isInstall) {
      await next();
    } else {
      await ctx.redirect('/install');
    }
  };
};
