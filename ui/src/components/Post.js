import React from 'react'
import { connect } from 'react-redux'
import { getAllPosts, getAllComments, votePost, addComment, voteComment } from '../actions'
import { AtomSpinner } from 'react-epic-spinners'
import { ButtonGroup, Button } from 'react-bootstrap'
import { vote, getDate } from './Posts'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { generateId } from '../utils';

const Post = (props) => {
    React.useEffect(() => {
      const fetchPost = async () => {
          props.posts.length === 0 && await props.getAllPosts() //fetch posts only when user enters the id through url
          await props.getAllComments(props.match.params.id)
          console.log(props.comments)
      }

      fetchPost()
    }, [
        JSON.stringify(props.posts),
        JSON.stringify(props.comments)
    ])

    const { posts, match, comments } = props

    if(posts.length === 0)
        return <AtomSpinner />

    const comment = (e) => {
        e.preventDefault()
        const id = generateId()
        const timestamp = Date.now()
        props.addComment({
            id,
            parentId: match.params.id,
            timestamp,
            body: e.target.body.value,
            author: e.target.author.value,
        })
    }

    const vote_comment = (id, option) => {
        props.voteComment(id, option)
    }

    return (
        <div>
            {posts && posts.map(post => post.id === match.params.id && (
                <div style={{
                    boxShadow: '5px 5px 25px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#ececec',
                    marginBottom: 10,
                    borderRadius: 6
                }} key={post.id}>
                    <div>
                        <h3>{post.title}</h3>
                        <p><small>by <strong>{post.author}</strong> on {getDate(post.timestamp)}</small> <br/>
                        {post.body}
                        </p>
                        <ButtonGroup>
                            <Button onClick={() => vote(props, post.id,'upVote')} variant="outline-success">
                                +
                            </Button>
                            <Button onClick={() => vote(props, post.id,'downVote')} variant="outline-danger">
                                -
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{post.voteScore}
                    </div>
                </div>
            ))} <br/>
            <Form onSubmit={comment}>
                <Form.Control name="body" as="textarea" row="3" placeholder="Write a comment..."/> <br/>
                <Form.Control name="author" type="text" placeholder="Enter username" /> <br/>
                <Button variant="danger" type="submit">
                    Comment
                </Button>
            </Form>
            <br/>
            {/* TODO: Refactor  */}
            {comments && comments.sort((a,b) => b.timestamp - a.timestamp).map(comment => (
                <div style={{
                    boxShadow: '5px 5px 25px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#ececec',
                    marginBottom: 15,
                    borderRadius: 6
                }} key={comment.id}>
                    <h6>{comment.body}</h6>
                    <p><small>by <strong>{comment.author}</strong> on {getDate(comment.timestamp)}</small></p>
                    <ButtonGroup>
                        <Button onClick={() => vote_comment(comment.id,'upVote')} variant="outline-success">
                            +
                        </Button>
                        <Button onClick={() => vote_comment(comment.id,'downVote')} variant="outline-danger">
                            -
                        </Button>
                    </ButtonGroup> 
                    &nbsp;&nbsp;{comment.voteScore}
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.postsReducer,
        comments: state.commentsReducer
    }
}

export default withRouter(connect(mapStateToProps, {
    getAllPosts, 
    getAllComments, 
    votePost, 
    addComment,
    voteComment
})(Post))