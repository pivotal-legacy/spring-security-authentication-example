import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import requireAuth from './Authentication'

export default function AppComponent() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={HomeComponent} onEnter={requireAuth}/>
      <Route path="/login" component={LoginComponent}/>
    </Router>
  )
}
