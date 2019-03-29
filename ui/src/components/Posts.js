import React from 'react'
import { connect } from 'react-redux'
import { AtomSpinner } from 'react-epic-spinners'
import { getAllPosts, votePost, sortByVotes, sortByTime } from '../actions'
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap'

const Posts = (props) => {
    React.useEffect(() => {
        const fetchPosts = async () => {
            await props.dispatch(getAllPosts(props.match.params.category))
            console.log(props.posts)
        }

        fetchPosts()
    }, 
    [
        JSON.stringify(props.posts),
        props.match.params.category
    ])

    const { posts } = props

    if(posts.length === 0)
        return <AtomSpinner />

    const vote = async (id, option) => {
        await props.dispatch(votePost(id, option))
        if(option === 'upVote' && !document.getElementById(`up-${id}`).disabled){
            document.getElementById(`up-${id}`).disabled = true
            document.getElementById(`down-${id}`).disabled = false
        }
        else if(option === 'downVote' && document.getElementById(`up-${id}`).disabled){
            document.getElementById(`up-${id}`).disabled = false
            document.getElementById(`down-${id}`).disabled = true
        }
        else if(option === 'downVote' && !document.getElementById(`down-${id}`).disabled){
            document.getElementById(`down-${id}`).disabled = true
            document.getElementById(`up-${id}`).disabled = false
        }
        else if(option === 'upVote' && document.getElementById(`down-${id}`).disabled){
            document.getElementById(`down-${id}`).disabled = false
            document.getElementById(`up-${id}`).disabled = true
        }
    }
    
    const sortBy = (option) => {
        option === 'votes' ? props.dispatch(sortByVotes(props.posts)) : props.dispatch(sortByTime(props.posts))
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-success">
                    Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => sortBy('votes')}>Votes</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortBy('time')}>Time</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> <br/>
            {posts && posts.map(post => (
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
                        <p>{post.body.substring(0, 100)}... <br/>
                        <small>by <strong>{post.author}</strong></small></p>
                        <ButtonGroup>
                            <Button id={`up-${post.id}`} onClick={() => vote(post.id,'upVote')} variant="outline-success">
                                +
                            </Button>
                            <Button id={`down-${post.id}`} onClick={() => vote(post.id,'downVote')} variant="outline-danger">
                                -
                            </Button>
                        </ButtonGroup> 
                        &nbsp;&nbsp;{post.voteScore}
                    </div>
                    <div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.postsReducer
})

export default connect(mapStateToProps)(Posts)