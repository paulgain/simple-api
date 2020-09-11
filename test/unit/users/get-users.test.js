const configureMiddleware = require('../../helpers/configure-middleware')

describe('getUsers', () => {
  const getUsersStub = sinon.stub()
  const controller = proxyquire.noCallThru().load('./api/users/controller', {
    '../model/users': {
      getUsers: getUsersStub,
    },
  })

  context('Success', () => {
    const users = [
      {
        userId: 1,
        firstname: 'Harry',
        lastname: 'Potter',
        dateOfBirth: '1990-01-01',
        emailAddress: 'harry.potter@hp.com'
      },
      {
        userId: 2,
        firstname: 'Ron',
        lastname: 'Weasley',
        dateOfBirth: '1990-02-02',
        emailAddress: 'ron.weasley@hp.com'
      }
    ]
    
    const middleware = configureMiddleware({})

    before(async () => {
      getUsersStub.returns(users)

      await controller.getUsers(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should get all users', () => {
      expect(middleware.res.send).to.have.been.calledWith(users)
      expect(getUsersStub).to.have.been.calledWithExactly()
    })
  })

  context('Error 500', () => {
    const middleware = configureMiddleware({ params: { id: 1 } })

    const error = new Error()
    error.message = 'Some error'

    before(async () => {
      getUsersStub.rejects(error)

      await controller.getUsers(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should should set status as 500 and display a message', () => {
      expect(middleware.res.status).to.have.been.calledWith(500)
      expect(middleware.res.send).to.have.been.calledWith({ message: 'Some error' })
      expect(middleware.next).to.have.been.calledWith(error)
    })
  })

  context('Error 500 and the error message is null', () => {
    const middleware = configureMiddleware({ params: { id: 1 } })

    const error = new Error()
    error.message = null

    before(async () => {
      getUsersStub.rejects(error)

      await controller.getUsers(
        middleware.req,
        middleware.res,
        middleware.next
      )
    })

    it('should should display a different message', () => {
      expect(middleware.res.send).to.have.been.calledWith({
        message: 'An error occurred while retrieving Users'
      })
    })
  })
})
