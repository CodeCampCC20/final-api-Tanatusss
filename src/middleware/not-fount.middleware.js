const notFoundMiddleware = (req,res) => {
  res.status(404).json({message: `not path: ${req.method} ${req.url}`})

}

export default notFoundMiddleware;