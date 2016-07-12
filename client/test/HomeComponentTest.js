import expect from 'expect'
import {shallow, mount} from 'enzyme'
import React from 'react'

import HomeComponent from '../src/js/HomeComponent'
import TranslationRepository from '../src/js/TranslationRepository'

describe('HomeComponent', () => {
  it('fetches the translation of donkey when the component loads', () => {
    let thenFunction
    const translationRepository = {
      get: () => {
        return {then: (passedFunction) => { thenFunction = passedFunction }}
      }
    }
    const component = shallow(<HomeComponent translationRepository={translationRepository} />)
    component.instance().componentDidMount()
    expect(component.find('.translation').text()).toEqual('')

    thenFunction({donkey: 'roba'})

    expect(component.update().find('.translation').text()).toEqual('roba')
  })

  it('uses the default prop value when translationRepository is not passed', () => {
    const component = shallow(<HomeComponent />)

    expect(component.instance().props.translationRepository).toEqual(new TranslationRepository())
  })
})
