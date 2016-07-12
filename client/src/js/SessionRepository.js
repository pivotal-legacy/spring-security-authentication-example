import fetch from 'isomorphic-fetch'
import {hashHistory} from 'react-router'

const baseUrl = 'http://localhost:8080'
export default class SessionRepository {
  create(username, password, history = hashHistory) {
    const authentication = btoa(`${username}:${password}`)
    const headers = {
      'Authorization': `Basic ${authentication}`
    }
    return fetch(`${baseUrl}/api/session`, {headers: headers})
    .then(response => {
      if (response.ok) {
        localStorage.setItem('token', response.headers.get('x-auth-token'))
        history.push('/')  
      }
    })
  }
}
