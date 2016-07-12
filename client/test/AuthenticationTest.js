import expect from 'expect'
import requireAuth from '../src/js/Authentication'

describe('Authentication', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('redirects if not logged in', () => {
    let redirectTo = expect.createSpy()

    requireAuth(null, redirectTo)

    expect(redirectTo).toHaveBeenCalledWith({pathname: '/login', state: {}})
  })

  it('does not redirect if logged in', () => {
    localStorage.setItem('token', 'donkey')

    let redirectTo = expect.createSpy()

    requireAuth(null, redirectTo)

    expect(redirectTo).toNotHaveBeenCalled()
  })
})
