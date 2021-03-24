import React from 'react'
import SessionService from '../../../services/SessionService';
import BackButton from '../../backButton/BackButton';
import Loading from '../../Loading/Loading';
import MovieService from '../../../services/MovieService'
import HallService from '../../../services/HallService'

class EditSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            session: props.location.session,
            halls: [],
            titles: [{
                id: Number,
                title: String
            }],
            newSession: {
                movieId: Number,
                hallId: Number,
                date: Date
            }
        }

        this.changeDate = this.changeDate.bind(this)
        this.changeHall = this.changeHall.bind(this)
        this.changeMovie = this.changeMovie.bind(this)
        
        this.confirmEdit = this.confirmEdit.bind(this);
    }

    componentDidMount(){        
        this.state.newSession = this.state.session
        HallService.getAll()
            .then(result => {
                this.state.halls = result.sort((e1, e2) => {
                    return e1.rowsAmount*e1.places >= e2.rowsAmount*e2.places ? 1 : -1
                })
                MovieService.getTitles()
                    .then(result => {
                        this.setState({
                            isLoaded: true,
                            titles: result
                        })
                        
                    })
                    .catch(err => {
                        this.setState({
                            isLoaded: true,
                            error: err
                        })
                    })
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            })

        
    }

    confirmEdit(event){
        event.preventDefault();
        SessionService.updateSession(this.state.session.id, this.state.newSession)
            .then(() => {
                this.props.history.push("/admin/sessions")
            })
            .catch(err => {
                this.setState({
                    error: err,
                    isLoaded: true
                })
            })
    }

    changeMovie(event){
        this.state.newSession.movieId = event.target.value
    }

    changeHall(event){
        this.state.newSession.hallId = event.target.value
    }

    changeDate(event){
        this.state.newSession.date = event.target.value
    }

    render() {
        const {error, isLoaded, session, titles, halls} = this.state
        if (!isLoaded){
            return <Loading />
        } else {
            if (session==null)
                return <div><BackButton backPath={() => this.props.history.goBack()} /></div>

            return  (<div className="container">
                        <BackButton backPath={() => this.props.history.goBack()} />
                        {error && error.message}
                        <form onSubmit={this.confirmEdit}>
                            <label>
                                <span>Hall: </span> 
                                <select onChange={this.changeHall} defaultValue={session.hallId}>
                                    {halls.map(el => {
                                        return <option key={el.id} value={el.id}>{el.name} (Places: {el.rowsAmount}x{el.places})</option>
                                    })}
                                </select>
                            </label><br/>
                            <label>
                                <span>Movie: </span> 
                                <select onChange={this.changeMovie} defaultValue={session.movieId}>
                                    {titles.map(el => {
                                        return <option key={el.id} value={el.id}>{el.title}</option>
                                    })}
                                </select>
                            </label><br/>
                            <label>
                                <span>Date: </span> 
                                <input type="datetime-local" defaultValue={session.date}  onChange={this.changeDate}/>  
                            </label><br/>
                            <input type="submit" value="Apply" />
                        </form>
                    </div>)
        }
    }
}

export default EditSession