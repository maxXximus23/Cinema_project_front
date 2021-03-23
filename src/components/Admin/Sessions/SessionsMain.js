import React from 'react'
import ErrorComponent from '../../error/ErrorComponent'
import Loading from '../../Loading/Loading'
import SessionService from '../../../services/SessionService'
import './Sessions.css'
import SessionElement from './SessionElement'
import BackButton from '../../backButton/BackButton'
import { Link } from 'react-router-dom';

class SessionsMain extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            sessions: [{
                id: Number,
                movieId: Number,
                hallId: Number,
                movieTitle: String,
                moviePoster: String,
                hallName: String,
                date: String
            }]
        }
    }

    componentDidMount(){
        SessionService.getAll()
            .then(result => {
                this.setState({
                    isLoaded: true,
                    sessions: result
                })
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            })
    }

    render(){
        const {error, isLoaded, sessions} = this.state
        if (!isLoaded){
            return <Loading />
        } else if (error){
            return <ErrorComponent error={error} />
        } else {
            return (<div className="container">
                        <div className="sure__table">
                            
                        </div>
                        <div className="d-flex justify-content-between sessions__label">
                            <BackButton backPath={() => this.props.history.goBack()} />
                            <h3>Sessions Managing</h3>
                            <Link to={'/admin/sessions/add'}>Create session</Link>
                        </div>
                        <div className="sessions__container">
                            <div className="sessions__header row">
                                <div className="col-md-1">Session ID</div>
                                    <div className="col-md-2">Movie Poster</div>
                                    <div className="col-md-3">Movie Title</div>
                                    <div className="col-md-2">Hall Name</div>
                                    <div className="col-md-2">Date</div>
                                    <div className="col-md-1">Edit</div>
                                    <div className="col-md-1">Delete</div>
                            </div>
                            {
                                sessions.map(el => {
                                    return  <SessionElement session={el}  key={el.id}/>
                                })
                            }
                        </div>
                    </div>)
        }
        
    }
}

export default SessionsMain;