import React from 'react'
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
                            return <div key={el.id} className="sessionData row">
                                    <div className="col-md-6">
                                        <span>{el.hallName}</span><br/>
                                        <span>{el.date.substr(0, 5)}</span><br/>
                                        <span>{el.date.substr(6)}</span>
                                    </div>
                                        <div className="col-md-6">
                                            <a className="big-button buttonBook" href={"/book/" + el.id} type="button">Book</a>
                                    </div>
                                </div>
                        })
                    }
                </div>
            );
        }
    }
}

export default MovieSessions;