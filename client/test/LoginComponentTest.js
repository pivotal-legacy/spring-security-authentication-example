import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'
import LoginComponent from '../src/js/LoginComponent'

describe('LoginComponent', () => {
  it('makes a SessionRepository request with user entered credentials', () => {
    const fakeSessionRepository = {
      create: function() {}
    }
    const getSpy = expect.spyOn(fakeSessionRepository, 'create')

    const component = mount(<LoginComponent sessionRepository={fakeSessionRepository}/>)

    const userNameInput = component.find('input').get(0)
    userNameInput.value = 'user'
    const passwordInput = component.find('input').get(1)
    passwordInput.value = 'password'

    component.find('button').simulate('click')

    expect(getSpy).toHaveBeenCalledWith('user', 'password')
  })
})
