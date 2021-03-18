import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

class MovieSessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: props.id,
            sessions: []
        };
        
    }

    async errorHandler(response){
        if (!response.ok){
            await response.json()
                    .then(res => {
                        throw Error(res.message)
                    })
        }

        return response.json()
    }
  
    componentDidMount() {
        fetch('http://localhost:8081/movies/' + this.state.id + '/sessions')
            .then(this.errorHandler)
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        sessions: result
                    }
                );
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            }
        );
    }
  
    render() {
        const { error, isLoaded, sessions } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (sessions.length === 0) {
            return <div><h3>There are no upcoming sessions for now</h3></div>;
        } else {
            return (
                <div>
                    <h3 className="mrg20px">Upcoming sessions:</h3>
                    {
                        sessions.map(el =>{
                            return <Link to={"/book/" + el.id}
                                        key={el.id} 
                                        className="buttonBook big-button d-flex justify-content-between">
                                        <div className="col-md-4 text-left">{el.hallName}</div>
                                        <div className="col-md-8 text-right">
                                            <span>{el.date.substr(0, 5)}</span><br/>
                                            <span>{el.date.substr(6)}</span>
                                        </div>
                                </Link>
                        })
                    }
                </div>
            );
        }
    }
}

export default MovieSessions;