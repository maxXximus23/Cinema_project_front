import React from 'react'
import { Link } from 'react-router-dom';
import SessionService from '../../../services/SessionService';

class SessionElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            session: props.session
        }
        
        this.removeSession = this.removeSession.bind(this);
    }

    removeSession(event){
        //TODO: Add 'Are you sure' window
        SessionService.removeSession(this.state.session.id)
        this.setState({
            session: null
        })
    }

    render() {
        const session = this.state.session

        if (session===null)
            return <div></div>

        return  <div className="session__item row">
                    <div className="session__id col-md-1">{session.id}</div>
                    <div className="session__poster col-md-2">
                        <img alt="" src={session.moviePoster}></img>
                    </div>
                    <div className="session__movie col-md-3">
                        <Link to={'/movies/' + session.movieId} >
                            {session.movieTitle}
                        </Link>
                    </div>
                    <div className="session__hall col-md-2">{session.hallName}</div>
                    <div className="session__date col-md-2">{session.date}</div>
                    <div className="col-md-1 session__edit">
                        <Link to={{pathname: "/admin/sessions/edit", session: session}}
                            className="session__edit__btn"
                            onClick={this.editSession}>
                            <i className="fa fa-pencil-square-o"></i>
                        </Link>
                    </div>
                    <div className="col-md-1 session__remove">
                        <button 
                            className="session__remove__btn"
                            onClick={this.removeSession}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </div>
                </div>
    }
}

export default SessionElement