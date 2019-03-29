import React from 'react'
import { getCategories } from '../actions'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Categories = (props) => {
    React.useEffect(() => {
        const fetchCategories = async () => {
            await props.dispatch(getCategories())
        }

        console.log(props.categories)

        fetchCategories()        
    }, [JSON.stringify(props.categories)])

    const { categories } = props

    return (
        <div> Categories:&nbsp;
            {categories && categories.map((category, index) => (
                <div style={{display: 'inline-flex'}} key={index}>
                    <Button style={{marginRight: 10}} variant="light">
                      <Link to={`/${category.path}`}>{category.name}</Link>
                    </Button>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps)(Categories)