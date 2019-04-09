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
      }

      fetchPost()
    }, [
        JSON.stringify(props.posts),
        JSON.stringify(props.comments)
    ])

    const { posts, match, comments } = props

    if(posts.length === 0)
        return <AtomSpinner style={{margin: '30vh auto'}} />

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
                    boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#f7f8f3',
                    marginBottom: 10,
                    borderRadius: 6
                }} key={post.id}>
                    <div>
                        <h3>{post.title}</h3>
                        <p><small>by <strong>{post.author}</strong> on {getDate(post.timestamp)}</small> <br/>
                        {post.body}
                        </p>
                        <ButtonGroup>
                            <Button onClick={() => vote(props, post.id,'upVote')} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-thumbs-up"></i>
                            </Button>
                            <Button onClick={() => vote(props, post.id,'downVote')} style={{backgroundColor: '#f7444e', border: 'none'}}>
                                <i className="fa fa-thumbs-down"></i>
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{post.voteScore}
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => props.history.push(`/${post.category}/${post.id}/edit`)} 
                             style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_post(props, post.id)} style={{backgroundColor: '#f7444e', border: 'none'}}>
                                <i className="fa fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup> 
                    </div>
                </div>
            ))} <br/>
            <Form onSubmit={comment}>
                <Form.Control name="body" as="textarea" row="3" required placeholder="Write a comment..."/> <br/>
                <Form.Control name="author" required type="text" placeholder="Enter username" /> <br/>
                <Button style={{backgroundColor: '#f7444e', border: 'none'}} type="submit">
                    Comment
                </Button>
            </Form>
            <br/>
            {/* TODO: Refactor  */}
            {comments && comments.sort((a,b) => b.timestamp - a.timestamp).map(comment => (
                <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between',
                    boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#f7f8f3',
                    marginBottom: 15,
                    borderRadius: 6
                }} key={comment.id}>
                    <div>
                        {!commentBox ? <h6>{comment.body}</h6> : 
                        <Form style={{display: 'inline-flex'}} onSubmit={(e) => edit_comment(comment.id, e)}>
                            <Form.Control name="edit" type="text" defaultValue={comment.body} /> &nbsp;
                            <Button style={{backgroundColor: '#f7444e', border: 'none'}} type="submit">
                                Comment
                            </Button>
                        </Form>}
                        <p><small>by <strong>{comment.author}</strong> on {getDate(comment.timestamp)}</small></p>
                        <ButtonGroup>
                            <Button onClick={() => vote_comment(comment.id,'upVote')} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-thumbs-up"></i>
                            </Button>
                            <Button onClick={() => vote_comment(comment.id,'downVote')} style={{backgroundColor: '#f7444e', border: 'none'}}>
                                <i className="fa fa-thumbs-down"></i>
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{comment.voteScore}
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => setCommentBox(true)} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_comment(comment.id)} style={{backgroundColor: '#f7444e', border: 'none'}}>
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