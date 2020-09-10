module.exports = ({
  req = {},
  res = {},
  body,
  params = {},
  query = {},
  locals = {},
} = {}) => {
  return {
    req: {
      ...req,
      body,
      params,
      query,
    },
    res: {
      ...res,
      redirect: sinon.spy(),
      json: sinon.spy(),
      send: sinon.spy(),
      status: sinon.stub().returnsThis(),
      header: sinon.spy(),
      locals: {
        ...locals,
      },
    },
    next: sinon.spy(),
  }
}
