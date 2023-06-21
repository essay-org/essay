module.exports = opt => {
  return async (ctx, next) => {
    const isInstall = await ctx.service.user.checkInstall();
    if (isInstall) {
      console.log(1111111111111111111);

      await next();
    } else {
    //   console.log(1111111111111111111);

      await ctx.redirect('/install');
    }
  };
};
