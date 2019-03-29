import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { getCategories, createPost } from '../actions'
import { connect } from 'react-redux'
import { generateId } from '../utils'

const PostForm = (props) => {
    React.useEffect(() => {
        const fetchCategories = async () => {
            await props.dispatch(getCategories())
        }

        console.log(props.categories)

        fetchCategories()        
    }, [JSON.stringify(props.categories)])

    const { categories } = props

    const addPost = async e => {
        e.preventDefault()
        const id = generateId()
        const timestamp = Date.now()
        await props.dispatch(createPost({
            id,
            timestamp,
            title: e.target.title.value,
            body: e.target.body.value,
            author: e.target.author.value,
            category: e.target.category.value
        }))
        props.history.replace('/')
    }

    return (
        <div>
            <Form onSubmit={addPost}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="author" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Title of your post</Form.Label>
                    <Form.Control name="title" type="text" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category of your post</Form.Label>
                    <Form.Control name="category" as="select" rows="3" required>
                        {
                            categories && categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Your message</Form.Label>
                    <Form.Control name="body" as="textarea" rows="3" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add this post
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps)(PostForm)