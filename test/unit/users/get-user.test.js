const configureMiddleware = require('../../helpers/configure-middleware')

describe('getUser', function () {
  const getUserStub = sinon.stub()
  const controller = proxyquire.noCallThru().load('./api/users/controller', {
    '../model/users': {
      getUser: getUserStub,
    },
  })

  context('Success', function () {
    const user = {
      userId: 1,
      firstname: 'Harry',
      lastname: 'Potter',
      dateOfBirth: '1990-01-01',
      emailAddress: 'harry.potter@hp.com'
    }
    
    const middleware = configureMiddleware({ params: { id: 1 } })

    before(async () => {
      getUserStub.returns(user)
      await controller.getUser(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should get a single user', function () {
      expect(middleware.res.send).to.have.been.calledWith(user)
      expect(getUserStub).to.have.been.calledWithExactly(1)
    })
  })

  context('Not found', function () {
    const middleware = configureMiddleware({ params: { id: 1 } })

    before(async () => {
      const err = new Error(400)
      err.statusCode = 400
      getUserStub.rejects(err)

      await controller.getUser(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should set status as 400 and display a message', function () {
      expect(middleware.res.status).to.have.been.calledWith(400)
      expect(middleware.res.send).to.have.been.calledWith({ 
        message: 'Not found User with id 1'
      })
    })
  })

  context('Error: 500', function () {
    const middleware = configureMiddleware({ params: { id: 1 } })

    before(async () => {
      getUserStub.rejects(new Error(500))

      await controller.getUser(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should should set status as 500 and display a message', function () {
      expect(middleware.res.status).to.have.been.calledWith(500)
      expect(middleware.res.send).to.have.been.calledWith({ 
        message: 'Error retrieving User with id 1'
      })
    })
  })
})
