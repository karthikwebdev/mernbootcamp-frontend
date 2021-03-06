import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import PageNotFound from './core/PageNotFound'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import ManageOrders from './admin/ManageOrders'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'
import Reload from './core/Reload'
import UpdateUser from './user/UpdateUser'
import ViewProduct from './core/ViewProduct'
import UpdateOrderStatus from './admin/UpdateOrderStatus'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute  path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute  path="/user/update/:userId" exact component={UpdateUser} />
                <PrivateRoute  path="/cart" exact component={Cart} />
                <PrivateRoute  path="/reload" exact component={Reload} />
                <PrivateRoute path="/product/view/:productId" exact component={ViewProduct} />
                <AdminRoute  path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute  path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute  path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute  path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute  path="/admin/products" exact component={ManageProducts} />
                <AdminRoute  path="/admin/orders" exact component={ManageOrders} />
                <AdminRoute  path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute  path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <AdminRoute  path="/admin/update/order/status/:orderId" exact component={UpdateOrderStatus} />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes