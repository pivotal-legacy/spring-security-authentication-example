import expect from 'expect'
import nock from 'nock'

import SessionRepository from '../src/js/SessionRepository'

describe('SessionRepository', () => {
  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
  })

  it('makes the correct get request', () => {
    nock('http://localhost:8080')
        .matchHeader('Authorization', (val) => val == 'Basic ' + btoa('username:password'))
        .get('/api/session')
        .reply(200, {}, {
          'x-auth-token': 'session-token'
        })
    const hashHistory = {
      push: () => {}
    }
    const hashHistorySpy = expect.spyOn(hashHistory, 'push')

    return new SessionRepository()
      .create('username', 'password', hashHistory)
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(localStorage.getItem('token')).toEqual('session-token')
        expect(hashHistorySpy).toHaveBeenCalledWith('/')
      })
  })

  it('does not set a token if the status is not 200', () => {
    nock('http://localhost:8080')
        .matchHeader('Authorization', (val) => val == 'Basic ' + btoa('username:password'))
        .get('/api/session')
        .reply(401, {})
    const hashHistory = {
      push: () => {}
    }
    const hashHistorySpy = expect.spyOn(hashHistory, 'push')

    return new SessionRepository()
      .create('username', 'password', hashHistory)
      .then(() => {
        expect(nock.isDone()).toEqual(true)
        expect(localStorage.getItem('token')).toEqual(undefined)
        expect(hashHistorySpy).toNotHaveBeenCalled()
      })
  })
})
