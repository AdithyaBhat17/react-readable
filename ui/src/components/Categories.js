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

        fetchCategories()        
    }, [JSON.stringify(props.categories)])

    const { categories } = props

    return (
        <div> Categories:&nbsp;
            <div style={{display: 'inline-flex'}}>                
                <Button style={{marginRight: 10}} variant="light">
                    <Link style={{color:'#FF2F56'}} to='/'>All</Link>
                </Button>
                {categories && categories.map((category, index) => (                
                <Button style={{marginRight: 10}} key={index} variant="light">
                    <Link style={{color:'#FF2F56'}} to={`/${category.path}`}>{category.name}</Link>
                </Button>
            ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps)(Categories)