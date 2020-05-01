import React from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'


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
            <div className="footer text-center text-muted mt-5 mb-3">
                made with love by <span className="text-white">karthik web dev</span> and sincere credits to <a href="https://learncodeonline.in/">LearnCodeOnline</a>
            </div>
        </div>
    )
}

export default Base
