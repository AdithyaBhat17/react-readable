import React from 'react'
import { getCategories } from '../actions'
import { connect } from 'react-redux'

const Sidenav = (props) => {
    React.useEffect(() => {
        const fetchCategories = async () => {
            await props.dispatch(getCategories())
        }

        console.log(props.categories)

        fetchCategories()        
    }, [JSON.stringify(props.categories)])

    const { categories } = props

    return (
        <div>
            {categories && categories.map((category, index) => (
                <li key={index}>
                    {category.name}
                </li>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps)(Sidenav)