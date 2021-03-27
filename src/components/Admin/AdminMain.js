import React from 'react'
import { Link } from 'react-router-dom'
import AccountService from '../../services/AccountService'
import ErrorComponent from '../error/ErrorComponent'
import Loading from '../Loading/Loading'
import './AdminMain.css'

class AdminMain extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null
        }
        
    }

    componentDidMount(){
        AccountService.isAdmin()
            .then(() => {
                this.setState({
                    isLoaded: true
                })
            })
            .catch(()=>{ window.location.replace("/") })
    }

    render(){
        const { isLoaded, error } = this.state
        if (!isLoaded)
            return <Loading />
        else if (error)
            return <ErrorComponent error={error} />

        return <div className="container admin_wrap__item">
                    <div className="row">
                        <Link to={'/admin/sessions'} className="col-md-4" >Sesseions managing</Link> 
                        <Link to={'/admin/movies'} className="col-md-4" >Movies managing</Link> 
                        <Link to={'/admin/halls'} className="col-md-4" >Halls managing</Link> 
                    </div>
                    <div>
                        <Link to={'/admin/reviews'} className="col-md-6" >Reviews managing</Link> 
                        <Link to={'/admin/users'} className="col-md-6" >Users managing</Link>    
                    </div>    
                </div>
    }
}

export default AdminMain