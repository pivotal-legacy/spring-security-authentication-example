import React from 'react'
import TranslationRepository from './TranslationRepository'

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translation: ''
    }
  }

  componentDidMount() {
    this.props.translationRepository.get().then((translationJson) => {
      this.setState({translation: translationJson.donkey})
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <div className='translation'>{this.state.translation}</div>
      </div>
    )
  }
}

HomeComponent.defaultProps = {
  translationRepository: new TranslationRepository()
}
