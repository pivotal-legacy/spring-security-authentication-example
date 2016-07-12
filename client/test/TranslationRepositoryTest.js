import expect from 'expect'
import nock from 'nock'

import TranslationRepository from '../src/js/TranslationRepository'

describe('TranslationRepository', () => {
  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
  })

  it('makes the correct get request', () => {
    const token = 'some-token'
    localStorage.setItem('token', token)
    nock('http://localhost:8080')
        .matchHeader('x-auth-token', (val) => val == token)
        .get('/api/donkey')
        .reply(200, {
          donkey: 'roba'
        })

    return new TranslationRepository()
      .get()
      .then((json) => {
        expect(nock.isDone()).toEqual(true)
        expect(json).toEqual({donkey: 'roba'})
      })
  })
})
