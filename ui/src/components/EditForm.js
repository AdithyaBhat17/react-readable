import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { getAllPosts, getCategories, editPost } from '../actions'
import { connect } from 'react-redux'

const EditForm = (props) => {
    React.useEffect(() => {
        const init = async () => {
            await props.dispatch(getCategories())
            props.posts.length ===0 && await props.dispatch(getAllPosts())
        }

        init()        
    }, [JSON.stringify(props.categories), JSON.stringify(props.posts)])

    const { categories, posts } = props

    const editForm = async (e) => {
        e.preventDefault()
        await props.dispatch(editPost(props.match.params.id, {
            title: e.target.title.value,
            body: e.target.body.value,
        }))
        props.history.replace('/')
    }

    return (
        <div>
            {posts && posts.map(post => post.id === props.match.params.id && (
                <Form key={post.id} onSubmit={editForm}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="author" type="text" disabled value={post.author} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title of your post</Form.Label>
                        <Form.Control name="title" type="text" defaultValue={post.title} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category of your post</Form.Label>
                        <Form.Control name="category" as="select" disabled value={post.category} rows="3" required>
                            {
                                categories && categories.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Your message</Form.Label>
                        <Form.Control name="body" as="textarea" rows="3" defaultValue={post.body} required/>
                    </Form.Group>
                    <Button style={{backgroundColor: '#f7444e', border: 'none'}} type="submit">
                        Edit this post
                    </Button>
                </Form>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer,
    posts: state.postsReducer
})

export default connect(mapStateToProps)(EditForm)