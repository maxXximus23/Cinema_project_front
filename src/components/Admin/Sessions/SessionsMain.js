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
                date: Date
            }],
            lastSort: "id",
            page: 1,
            perPage: 100,
            pages: 0
        }

        this.sortById = this.sortById.bind(this)
        this.sortByTitle = this.sortByTitle.bind(this)
        this.sortByHall = this.sortByHall.bind(this)
        this.sortByDate = this.sortByDate.bind(this)
        
        this.changePage = this.changePage.bind(this)
        this.changePerPage = this.changePerPage.bind(this)
        this.applyChange = this.applyChange.bind(this)
    }

    componentDidMount(){
        SessionService.getAll()
            .then(result => {
                this.setState({
                    isLoaded: true,
                    sessions: result,
                    pages: Math.ceil(result.length/this.state.perPage)
                })
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            })
    }

    sortById(event){
        this.setState({
            isLoaded: false
        })
        if (this.state.lastSort != "id")
        {
            this.setState({
                isLoaded: true,
                lastSort: "id",
                sessions: this.state.sessions.sort((e1, e2) => {
                        return e1.id >= e2.id ? 1 : -1
                    })
            })
        } else {
            this.setState({
                isLoaded: true,
                sessions: this.state.sessions.reverse()
            })
        }
    }
    
    sortByTitle(event){
        this.setState({
            isLoaded: false
        })
        if (this.state.lastSort != "title")
        {
            this.setState({
                isLoaded: true,
                lastSort: "title",
                sessions: this.state.sessions.sort((e1, e2) => {
                        return e1.movieTitle >= e2.movieTitle ? 1 : -1
                    })
            })
        } else {
            this.setState({
                isLoaded: true,
                sessions: this.state.sessions.reverse()
            })
        }
    }

    sortByHall(event){
        this.setState({
            isLoaded: false
        })
        if (this.state.lastSort != "hall")
        {
            this.setState({
                isLoaded: true,
                lastSort: "hall",
                sessions: this.state.sessions.sort((e1, e2) => {
                        return e1.hallId >= e2.hallId ? 1 : -1
                    })
            })
        } else {
            this.setState({
                isLoaded: true,
                sessions: this.state.sessions.reverse()
            })
        }
    }

    sortByDate(event){
        this.setState({
            isLoaded: false
        })
        if (this.state.lastSort != "date")
        {
            this.setState({
                isLoaded: true,
                lastSort: "date",
                sessions: this.state.sessions.sort((e1, e2) => {
                        return e1.date >= e2.date ? 1 : -1
                    })
            })
        } else {
            this.setState({
                isLoaded: true,
                sessions: this.state.sessions.reverse()
            })
        }
    }

    changePage(event){
        this.setState({
            page: event.target.value
        })
    }

    changePerPage(event){
        this.state.perPage = event.target.value
    }

    applyChange(event){
        this.setState({
            page: 1,
            pages: Math.ceil(this.state.sessions.length/this.state.perPage)
        })
    }

    render(){
        const {error, isLoaded } = this.state
        if (!isLoaded){
            return <Loading />
        } else if (error){
            return <ErrorComponent error={error} />
        } else {
            let sessions = this.state.sessions.slice((this.state.page - 1)*this.state.perPage, this.state.page*this.state.perPage)

            let pageButtons = []
            for (let i = 1; i <= this.state.pages; i++){
                pageButtons.push(
                    <label key={i}>
                        <input type="radio" defaultChecked={i==this.state.page} name="pages" onChange={this.changePage} value={i}/>
                        <div className="page-label">{i}</div>
                    </label>
                )
            }
            
            return (<div className="container">
                        <div className="d-flex justify-content-between sessions__label">
                            <BackButton backPath={() => this.props.history.goBack()} />
                            <h3>Sessions Managing</h3>
                            <label>
                                <span>Items per page: </span>
                                <input type="number" min="1" max="100" defaultValue={this.state.perPage} onChange={this.changePerPage}/>
                                <button onClick={this.applyChange}>Apply</button>
                            </label>
                            <Link to={'/admin/sessions/create'}>Create session</Link>
                        </div>
                        <div className="sessions__container">
                            <div className="sessions__header row">
                                <label className="session__id col-md-1" id="sesId">
                                    <input type="radio" name="sort" defaultChecked onClick={this.sortById}/><br />
                                    <span>ID</span>
                                </label>
                                <div className="session__poster col-md-2">
                                    <span>Movie Poster</span>
                                </div>
                                <label className="session__title col-md-3">
                                    <input type="radio" name="sort" onClick={this.sortByTitle}/><br />
                                    <span>Movie Title</span>
                                </label>
                                <label className="session__hall col-md-2">
                                    <input type="radio" name="sort" onClick={this.sortByHall}/><br />
                                    <span>Hall Name</span>
                                </label>
                                <label className="session__date col-md-2">
                                    <input type="radio" name="sort" onClick={this.sortByDate}/><br />
                                    <span>Date</span>
                                </label>
                                <div className="session__edit col-md-1">
                                    <span>Edit</span>
                                </div>
                                <div className="session__delete col-md-1">
                                    <span>Delete</span>
                                </div>
                            </div>
                            {
                                sessions.map(el => {
                                    return  <SessionElement session={el}  key={el.id}/>
                                })
                            }
                        </div>
                        <div className="session__pageButtons">
                            {pageButtons}
                        </div>
                    </div>)
        }
        
    }
}

export default SessionsMain;