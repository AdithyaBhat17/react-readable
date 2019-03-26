import React from 'react'

const Sidenav = ({categories}) => {
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

export default Sidenav