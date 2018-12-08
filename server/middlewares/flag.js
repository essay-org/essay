module.exports = (flag) => {
  return (req, res, next) => {
    switch (flag) {
      case 'stick':
        res.locals.flag = 0
        next()
        break;
      
      case 'index':
        res.locals.flag = 1
        next()
        break;

      case 'tag':
        res.locals.flag = 2
        next()
        break;
      
      case 'draft':
        res.locals.flag = 3
        next()
        break;

      default:
        res.locals.flag = 1
        next()
        break;
    }
  }
}
