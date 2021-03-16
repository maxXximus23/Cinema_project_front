import React from 'react'
import MovieSessions from './MovieSessions';
import Reviews from './Reviews';
import './style.css'

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movie: {},
            id: props.match.params.movieId,
            reviews: []
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
        fetch('http://localhost:8081/movies/' + this.state.id)
            .then(this.errorHandler)
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        movie: result
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
        const { error, isLoaded, movie } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="row mrg20px">
                    <div className="row">
                        <div className="col-md-9 row">
                            <img className="col-md-5" alt="" src={movie.posterPath}></img>
                            <div className="col-md-7">
                                <h1>{movie.title}</h1>
                                <p>{this.parseDuration(movie.duration)}</p>
                                <p>{movie.description}</p>
                            </div>
                            <div className="col-md-12 trailer mrg20px">
                                <iframe className="col-md-12" height="380px" width="10%"
                                    src={movie.trailerPath}
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        <div className="col-md-3 sessions">
                            <MovieSessions id={this.state.id} />
                        </div>
                    </div>
                    <div className="col-md-12 reviews">
                        <Reviews id={this.state.id} />
                    </div>
                </div>
            );
        }
    }

    parseDuration(d){
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + ":" : "00";
        var mDisplay = (m > 0) ? ((m >= 10) ? m : "0" + m) + ":" : "00";
        var sDisplay = s > 0 ? s : "00";
        return 'Duration: ' + hDisplay + mDisplay + sDisplay; 
    }
}

export default Movie;