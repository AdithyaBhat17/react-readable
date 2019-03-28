import React, { useEffect } from 'react'
import { getAllPosts } from '../actions'
import { connect } from 'react-redux'
import { AtomSpinner } from 'react-epic-spinners'
import Sidenav from './Sidenav'

const App = (props) => {

  useEffect(() => {
    const fetchPosts = async () => {
      await props.dispatch(getAllPosts())
      console.log(props.posts)
    }

    fetchPosts()
  }, [JSON.stringify(props.posts)])

  const { posts } = props

  if(posts.length === 0)
    return <AtomSpinner />    

  return (
    <div>
      <div>{posts && posts.map(post => post.id)}</div>
      <div>
        <Sidenav />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    posts: state.postsReducer
  }
}

export default connect(mapStateToProps)(App);
