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
        <div> Categories:&nbsp; &nbsp;
            <div style={{display: 'inline-flex'}}>                
                <Button style={{marginRight: 10, backgroundColor: '#78bcc4', border: 'none'}}>
                    <Link style={{color:'#f7f8f3'}} to='/'>All</Link>
                </Button> &nbsp; 
                {categories && categories.map((category, index) => (                
                <Button style={{marginRight: 10, backgroundColor: '#78bcc4', border: 'none'}} key={index}>
                    <Link style={{color:'#f7f8f3'}} to={`/${category.path}`}>{category.name}</Link>
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