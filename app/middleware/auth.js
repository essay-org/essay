module.exports = redirectUrl => {
  return async (ctx, next) => {
    const Token = ctx.get('Token') || ctx.cookies.get('Token');
    if (!Token) {
      await ctx.redirect('/login');
    } else {
      const data = ctx.service.user.verify(Token);
      // console.log('TOKEN:', data);
      if (data.status === 1) {
        await next();
      } else {
        if (redirectUrl) {
          await ctx.redirect(redirectUrl);
        } else {
          ctx.body = {
            success: false,
            data,
          };
        }
      }
    }
  };
};
