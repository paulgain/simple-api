const configureMiddleware = require('../../helpers/configure-middleware')

describe('getUser', () => {
  const getUserStub = sinon.stub()
  const controller = proxyquire.noCallThru().load('./api/users/controller', {
    '../model/users': {
      getUser: getUserStub,
    },
  })

  context('Success', () => {
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

    it('should get a single user', () => {
      expect(middleware.res.send).to.have.been.calledWith(user)
      expect(getUserStub).to.have.been.calledWithExactly(1)
    })
  })

  context('Not found', () => {
    const middleware = configureMiddleware({ params: { id: 1 } })

    const error = new Error(400)
    error.statusCode = 400

    before(async () => {
      getUserStub.rejects(error)

      await controller.getUser(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should set status as 400 and display a message', () => {
      expect(middleware.res.status).to.have.been.calledWith(400)
      expect(middleware.res.send).to.have.been.calledWith({ 
        message: 'Not found User with id 1'
      })
      expect(middleware.next).to.have.not.been.calledWith(error)
    })
  })

  context('Error: 500', () => {
    const middleware = configureMiddleware({ params: { id: 1 } })

    const error = new Error(500)
    error.statusCode = 500

    before(async () => {
      getUserStub.rejects(error)

      await controller.getUser(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should should set status as 500 and display a message', () => {
      expect(middleware.res.status).to.have.been.calledWith(500)
      expect(middleware.res.send).to.have.been.calledWith({ 
        message: 'Error retrieving User with id 1'
      })
      expect(middleware.next).to.have.been.calledWith(error)
    })
  })
})
