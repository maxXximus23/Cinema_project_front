import React from 'react';
import { Link } from 'react-router-dom';
import ErrorComponent from '../error/ErrorComponent';

export default class PageResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            movies: props.movies
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            movies: nextProps.movies,
            genre: nextProps.genre
        });  
      }

    render(){
        const { error, movies, genre } = this.state
        
        if (error) {
            return <ErrorComponent error={error} />;
        } else if (movies.length === 0) {
            return <h3>Sorry, no movies found</h3>
        } else {
            return  <div className="col-md-12">
                        <ul className="col-md-12 d-flex">
                            {
                            movies.map(movie =>
                                    <li key = {movie.id} className="movie-list__li col-lg-3">
                                        <div className="movie-element__item post-wrap">
                                            <div className="post-item">
                                                <div className="post-item-wrap">
                                                    <Link to={"/movies/" + movie.id} className="post-link">
                                                        <div className="image-wrapper">
                                                            <img src={movie.posterPath} alt='img'></img>
                                                        </div>
                                                        <div className="text-wrapper">
                                                            <div className="post-title">{movie.title}</div>
                                                            <h3 className="post-date">{movie.genres}</h3>
                                                        </div>
                                                        <div className="overlay"></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>    
                                    </li>
                                )
                            }
                        </ul>
                    </div>
        }
    }
}