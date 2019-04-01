import React from 'react'
import { connect } from 'react-redux'
import { AtomSpinner } from 'react-epic-spinners'
import { getAllPosts, votePost, sortByVotes, sortByTime, deletePost } from '../actions'
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
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
    option === 'votes' ? props.sortByVotes(props.posts) : props.sortByTime(props.posts)
}

const Posts = (props) => {
    React.useEffect(() => {
        const fetchPosts = async () => {
            await props.getAllPosts(props.match.params.category)
        }

        fetchPosts()
    }, 
    [
        JSON.stringify(props.posts),
        props.match.params.category
    ])

    if(props.posts.length === 0)
        return <AtomSpinner style={{margin: '30vh auto'}}/>

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle style={{backgroundColor: '#78bcc4', border: 'none'}}>
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
                    boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.07)',
                    padding: 10,
                    backgroundColor: '#f7f8f3',
                    marginBottom: 10,
                    borderRadius: 6
                }} key={post.id}>
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}... <small><Link to={`/${post.category}/${post.id}`}>read more</Link></small><br/>
                        <small>by <strong>{post.author}</strong> on {getDate(post.timestamp)}</small></p>
                        <ButtonGroup>
                            <Button onClick={() => vote(props, post.id,'upVote')} style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-thumbs-up"></i>
                            </Button>
                            <Button onClick={() => vote(props, post.id,'downVote')} style={{backgroundColor: '#f7444e', border: 'none'}}>
                            <i className="fa fa-thumbs-down"></i>
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{post.voteScore} &nbsp; &nbsp;
                        <i className="far fa-comment-alt"></i>
                        <small style={{marginLeft: 4}}>{post.commentCount}</small>
                    </div>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => props.history.push(`${post.category}/${post.id}/edit`)}
                             style={{backgroundColor: '#78bcc4', border: 'none'}}>
                                <i className="fa fa-edit"></i>
                            </Button>
                            <Button onClick={() => delete_post(props, post.id)} style={{backgroundColor: '#f7444e', border: 'none'}}>
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