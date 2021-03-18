import React, {Component} from 'react'
import './MovieList-element.css'


class Movie extends Component{
    
    render() {
        const {movie} = this.props
            return(
                <div className="movie-element__item post-wrap">
                    
                    <div className="post-item">
                        <div className="post-item-wrap">
                            <a href="#" className="post-link">
                                <div className="image-wrapper">
                                <img src={movie.moviePoster} alt='img'></img>
                                </div>
                            <div className="text-wrapper">
                            <div className="post-title">{movie.movieTitle}</div>
                            <h3 className="post-date">{movie.date}</h3>
                        </div>
                            <div className="overlay"></div>
                            </a>
                            </div>
                    </div>
                        
                </div>
            )
    }
}


export default Movie