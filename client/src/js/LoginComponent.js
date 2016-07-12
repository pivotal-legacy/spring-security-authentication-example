import React from 'react'
import SessionRepository from './SessionRepository'

export default function LoginComponent(props) {
  let username, password

  return (
    <div>
      <h1>Login</h1>
      <input type='text' ref={node => {username = node}}></input>
      <input type='text' ref={node => {password = node}}></input>
      <button onClick={_ => {
        props.sessionRepository.create(username.value, password.value)
      }}>go</button>
    </div>
  )
}
LoginComponent.defaultProps = { sessionRepository: new SessionRepository() };
