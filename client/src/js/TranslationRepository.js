import fetch from 'isomorphic-fetch'

const baseUrl = 'http://localhost:8080'
export default class TranslationRepository {
  get() {
    const headers = {'x-auth-token': localStorage.getItem('token')}
    return fetch(`${baseUrl}/api/donkey`, {headers: headers})
    .then(response => response.json())
  }
}
