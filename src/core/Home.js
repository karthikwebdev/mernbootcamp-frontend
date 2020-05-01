import React, {useEffect,useState} from 'react'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'



function Home() {

    const [products, setproducts] = useState([])
    const [error, seterror] = useState(false)

    const loadAllProducts = () => {
        getProducts("").then(data=>{
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

    const loadSortedProducts = (event)=>{
        getProducts(event.target.value).then(data=>{
            if(data.error){
                seterror(data.error);
            }else{
                setproducts(data);
            }
        })
    }

    const selectSortBy = () => (
    <div className="row">
        <div className="col-3 text-right text-white h5">
        <label> Sort by</label>
        </div>    
        <div className="col-6">
            <form>
                <div className="form-group">
                    <select className="form-control" onChange={loadSortedProducts} id="exampleFormControlSelect1">
                        <option>--select--</option>
                        <option value={`sortBy=name&order=1`}>name(a-z)</option>
                        <option value={`sortBy=name&order=-1`}>name(z-a)</option>
                        <option  value={`sortBy=price&order=-1`}>price(high-low)</option>
                        <option  value={`sortBy=price&order=1`}>price(low-high)</option>
                        <option  value={`sortBy=createdAt&order=1`}>latest(new-old)</option>
                        <option  value={`sortBy=stock&order=-1`}>stock(high-low)</option>
                        <option  value={`sortBy=stock&order=1`}>stock(low-high)</option>
                    </select>
                </div>
            </form>
        </div>
    </div>
       )

    return (
        <Base title="{ codezone }" description="root directory for every coder.." className="container">
            {selectSortBy()}
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
