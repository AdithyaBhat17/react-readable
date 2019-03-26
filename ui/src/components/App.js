import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../actions'
import { connect } from 'react-redux'
import { AtomSpinner } from 'react-epic-spinners'
import Sidenav from './Sidenav'
import { votePostAPI, createPostAPI } from '../utils';

const App = (props) => {
  // const [posts, setPosts] = useState([])
  // const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await createPostAPI({
        id: 'asd8asd7asdadadsad',
        timestamp: Date.now(),
        title: 'My first shitpost',
        body: 'Hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
        author: 'Adithya NR',
        category: 'redux'
      })
      // const categories = await props.dispatch(getA('react'))
      console.log(posts)
      // await setPosts(posts)
      // console.log(posts)
    }

    fetchPosts()
  }, [])

  // if(posts === undefined || posts.length === 0)
  //   return <AtomSpinner />

  return (
    // <div>{posts && posts.map(post => post.id)}</div>
    <div>hi
      {/* <Sidenav categories={categories} /> */}
    </div>
  )
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  error: state.postsReducer.errorMessage
})

export default connect(mapStateToProps)(App);
