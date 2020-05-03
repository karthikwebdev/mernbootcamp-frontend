import React from "react"
import Routes from './Routes'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()
ReactDOM.render(<Routes/>,document.getElementById("root"))