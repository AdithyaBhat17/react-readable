import React from 'react'
import { connect } from 'react-redux'
import { AtomSpinner } from 'react-epic-spinners'
import { getAllPosts, votePost, sortByVotes, sortByTime, deletePost } from '../actions'
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'
import { Link, withRouter, Redirect } from 'react-router-dom'
import * as moment from 'moment'

export const vote = async (props, id, option) => {
    await props.votePost(id, option)
}

export const delete_post = (props, id) => {
    props.deletePost(id)
}

export const getDate = (timestamp) => {
    const date = moment(timestamp)._d.toString().split(' ')
    return date[0] + ', ' + date[2] + ' ' + date[1] + ' ' + date[3]
}
    
const sortBy = (props, option) => {
    console.log(option)
    option === 'votes' ? props.sortByVotes(props.posts) : props.sortByTime(props.posts)
}

const Posts = (props) => {
    React.useEffect(() => {
        const fetchPosts = async () => {
            await props.getAllPosts(props.match.params.category)
            console.log(props.posts)
        }

        fetchPosts()
    }, 
    [
        JSON.stringify(props.posts),
        props.match.params.category
    ])

    // let { posts } = props

    if(props.posts.length === 0)
        return <AtomSpinner />

    console.log(props.posts)

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-success">
                    Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => sortBy(props, 'votes')}>Votes</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortBy(props, 'time')}>Time</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> <br/>
            {props.posts && props.posts.map(post => (
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
                        <p>{post.body.substring(0, 100)}... <small><Link to={`/${post.category}/${post.id}`}>read more</Link></small><br/>
                        <small>by <strong>{post.author}</strong> on {getDate(post.timestamp)}</small></p>
                        <ButtonGroup>
                            <Button onClick={() => vote(props, post.id,'upVote')} variant="outline-success">
                                +
                            </Button>
                            <Button onClick={() => vote(props, post.id,'downVote')} variant="outline-danger">
                                -
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{post.voteScore} &nbsp; &nbsp;
                        <i className="far fa-comment-alt"></i>
                        <small style={{marginLeft: 4}}>{post.commentCount}</small>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => props.history.push(`${post.category}/${post.id}/edit`)} variant="outline-success">
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_post(props, post.id)} variant="outline-danger">
                                <i className="fa fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup> 
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.postsReducer
})

export default withRouter(connect(mapStateToProps, {
    getAllPosts,
    sortByTime,
    sortByVotes,
    votePost,
    deletePost
})(Posts))