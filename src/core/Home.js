import React from 'react'
import { API } from '../backend'
import Base from './Base'


function Home() {
    console.log("API IS", API )
    return (
        <Base title="Home Page" description="Welcome to the T-Store.......">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    )
}

export default Home
