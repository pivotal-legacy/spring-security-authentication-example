export default function requireAuth(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace({pathname: '/login', state: {}})
  }
}
