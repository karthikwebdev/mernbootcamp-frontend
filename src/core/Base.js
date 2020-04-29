import React from 'react'
import Menu from './Menu'

const Base = ({
    title="my title",
    description="my description",
    className="bg-dark text-white p-4",
    children
}) => {
    //( <div></div> ) without curlybraces we can return using () this avoiding return
    return (
        <div>
            <div className="container-fluid"> 
                <Menu/>
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
        </div>
    )
}

export default Base
