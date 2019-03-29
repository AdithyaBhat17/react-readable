import React from 'react'
import Posts from './Posts'
import { Switch, Route } from 'react-router-dom'
import Categories from './Categories'
import Navigation from './Navigation'
import { Container } from 'react-bootstrap'
import PostForm from './PostForm'

const App = () => {   

  return (
    <div>
      <Navigation />
      <Container>
        <Categories /> <br/>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/:category" component={Posts} />
          <Route exact path="/posts/new" component={PostForm} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
