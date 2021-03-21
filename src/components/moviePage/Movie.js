import React from 'react'
import MovieSessions from './MovieSessions';
import Reviews from './Reviews';
import './style.css'
import YouTube from 'react-youtube'
import ErrorComponent from '../error/ErrorComponent';
import { Link } from 'react-router-dom';
import BackButton from '../backButton/BackButton';
import Loading from '../Loading/Loading';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movie: {},
            id: props.match.params.movieId,
            reviews: [],
            trailer: {}
        };
    }

    async errorHandler(response){
        if (!response.ok){
            await response.json()
                    .then(res => {
                        throw res
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
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <Loading />;
        } else {
            const trailer = <YouTube videoId={movie.trailerPath} opts={{'height': '500px','width': '100%'}}/>

            let genresList = movie.genres.split(", ")
            let genres = []

            for (let i = 0; i < genresList.length; i++){
                genres.push(<span key={i}><Link to={{pathname: '/movies', query: genresList[i]}}>{genresList[i]}</Link>{(i === genresList.length - 1) ? "" : ", "}</span>)
            }

            return (
                <div className="row moviePage">
                    <div className="col-md-12 trailer">
                        {movie.trailerPath !== 'none' && trailer}
                    </div>
                    <div className="container movieData">
                        <div className="d-flex justify-content-between">
                            <div className="col-md-9 row">
                                <div className="col-md-5">
                                    <BackButton backPath={() => this.props.history.goBack()} />
                                    <div className="movie_poster col-md-12">
                                        <img className="img_poster" alt="" src={movie.posterPath}></img>
                                    </div>
                                </div>
                                <div className="col-md-7 movieText">
                                    <h1>{movie.title}</h1>
                                    <p>{this.parseDuration(movie.duration)}</p>
                                    <p><strong>{genres}</strong></p>
                                    <p><strong>Actors: </strong>{movie.actors}</p>
                                    <p><strong>Country: </strong>{movie.country}</p>
                                    <p>{movie.description}</p>
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