import React from 'react'
import { Link } from 'react-router-dom';
import SessionService from '../../../services/SessionService';
import moment from 'moment'
import ErrorComponent from '../../error/ErrorComponent';

class SessionElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            session: props.session,
            reqiureSure: false,
            reqiureSureCancel: false
        }
        
        this.removeSession = this.removeSession.bind(this);
        this.markToDelete = this.markToDelete.bind(this);

        this.cancelSession = this.cancelSession.bind(this);
        this.markToCancel = this.markToCancel.bind(this);
    }

    markToDelete(event){
        this.setState({
            reqiureSure: true
        })        
    }

    markToCancel(event){
        this.setState({
            reqiureSureCancel: !this.state.reqiureSureCancel
        })        
    }

    removeSession(){
        SessionService.removeSession(this.state.session.id)
            .then(() => {
                this.setState({
                    session: null
                })
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })
    }

    cancelSession(event){
        SessionService.cancelSession(this.state.session.id)
            .then((result) => {
                this.setState({
                    session: result
                })
                console.log(this.state.session)
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })
    }

    render() {
        const { session, error, reqiureSure, reqiureSureCancel } = this.state

        if (error)
            return <ErrorComponent error={error} />

        if (session==null)
            return <div></div>

        return  <div className={session.isCanceled ? "session__item row session__canceled" : "session__item row"}>
                    <label className="session__id col-md-1">{session.id}</label>
                    <div className="session__poster col-md-2">
                        <img alt="" src={session.moviePoster}></img>
                    </div>
                    <div className="session__movie col-md-3">
                        <Link to={'/movies/' + session.movieId} >
                            {session.movieTitle}
                        </Link>
                    </div>
                    <div className="session__hall col-md-1">{session.hallName}</div>
                    <div className={moment(session.date) < moment() ? "session__date col-md-2 session__outdated" : "session__date col-md-2"}>
                        {moment(session.date).format("HH:mm DD-MM-YYYY")}
                    </div>
                    <div className="col-md-1 session__cancel">
                    <div onClick={this.markToCancel}>
                        {!reqiureSureCancel &&
                            <button 
                                className="session__cancel__btn">
                                X
                            </button>
                        }
                        {reqiureSureCancel && 
                            <button className="session__cancel__sure" onClick={this.cancelSession}>{session.isCanceled ? 'Activate' : 'Cancel'}</button>
                        }
                    </div>
                    </div>
                    <div className="col-md-1 session__edit">
                        <Link to={"/admin/sessions/" + session.id}
                            className="session__edit__btn">
                            <i className="fa fa-pencil-square-o"></i>
                        </Link>
                    </div>
                    <div className="col-md-1 session__remove">
                        {!reqiureSure &&
                            <button 
                                className="session__remove__btn"
                                onClick={this.markToDelete}>
                                <i className="fa fa-remove"></i>
                            </button>
                        }
                        {reqiureSure && 
                            <button className="session__remove__sure" onClick={this.removeSession}>DELETE</button>
                        }
                    </div>
                </div>
    }
}

export default SessionElement