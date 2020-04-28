import React, {useEffect,useState} from 'react'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'



function Home() {

    const [products, setproducts] = useState([])
    const [error, seterror] = useState(false)

    const loadAllProducts = () => {
        getProducts().then(data=>{
            if(data.error){
                seterror(data.error);
            }else{
                setproducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <Base title="Home Page" description="Welcome to the T-Store......." className="container">
            <div className="row">
               {products.map((product,index)=>(
                <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={index}>
                    <Card product={product}/>
                </div>
               ))}
            </div>
        </Base>
    )
}

export default Home
