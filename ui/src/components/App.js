import React, { useEffect } from 'react'
import { getAllPosts } from '../actions'
import { connect } from 'react-redux'

const App = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await props.dispatch(getAllPosts())
      console.log(posts)
    }

    fetchPosts()
  }, [])

  return (
    <div>hi</div>
  )
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  error: state.postsReducer.errorMessage
})

export default connect(mapStateToProps)(App);
