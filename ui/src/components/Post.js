import React from 'react'
import { connect } from 'react-redux'
import { getAllPosts, getAllComments, votePost, addComment, voteComment, deletePost, deleteComment, updateComment } from '../actions'
import { AtomSpinner } from 'react-epic-spinners'
import { ButtonGroup, Button } from 'react-bootstrap'
import { vote, getDate } from './Posts'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { generateId } from '../utils'
import { delete_post } from './Posts'

const Post = (props) => {
    const [commentBox, setCommentBox] = React.useState(false)
    React.useEffect(() => {
      const fetchPost = async () => {
          props.posts.length === 0 && await props.getAllPosts() //fetch posts only when user enters the id through url
          await props.getAllComments(props.match.params.id)
          console.log(props.comments)
          console.log(props.posts)
      }

      fetchPost()
    }, [
        JSON.stringify(props.posts),
        JSON.stringify(props.comments)
    ])

    const { posts, match, comments } = props

    if(posts.length === 0)
        return <AtomSpinner />

    if(posts.filter(post => post.id === props.match.params.id).length === 0)
        return <div>
            Post not found
        </div>


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

    const delete_comment = (id) => {
        props.deleteComment(id)
    }

    const edit_comment = async (id, e) => {
        e.preventDefault()
        await props.updateComment(id, {
            timestamp: Date.now(),
            body: e.target.edit.value
        })
        props.history.go(0)
    }

    return (
        <div>
            {posts && posts.map(post => post.id === match.params.id && (
                <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between',
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
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => props.history.push(`/${post.id}/edit`)} variant="outline-success">
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_post(props, post.id)} variant="outline-danger">
                                <i className="fa fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup> 
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
                    display: 'flex', 
                    justifyContent: 'space-between',
                    boxShadow: '5px 5px 25px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#ececec',
                    marginBottom: 15,
                    borderRadius: 6
                }} key={comment.id}>
                    <div>
                        {!commentBox ? <h6>{comment.body}</h6> : 
                        <Form style={{display: 'inline-flex'}} onSubmit={(e) => edit_comment(comment.id, e)}>
                            <Form.Control name="edit" type="text" defaultValue={comment.body} /> &nbsp;
                            <Button variant="danger" type="submit">
                                Comment
                            </Button>
                        </Form>}
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
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => setCommentBox(true)} variant="outline-success">
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_comment(comment.id)} variant="outline-danger">
                                <i className="fa fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup> 
                    </div>
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
    voteComment,
    deletePost,
    deleteComment,
    updateComment
})(Post))