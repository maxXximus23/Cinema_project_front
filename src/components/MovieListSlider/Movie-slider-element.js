import React, {Component} from 'react'
import './Movie-slider-element.css'

class Movie extends Component{
   
    render() {
        
        const {movie} = this.props


            return(
                <div className="each-fade movie container">
                    <a href="#" className="movie_link">
                    <div className="row">

                        <div className="movie_body col-lg-6">
                            <div className="movie_title">{movie.movieTitle}</div>
                            <div className="movie_info">{movie.date}</div>
                            <div class="floating-button">Buy now</div>
                        </div>
                        <div className="col-lg-6">
                            <img className="img_frame__item" src={movie.moviePoster} alt='img'></img>
                        </div>
                        
        
                    </div>
                    </a>
                </div>
            )
    }
}

export default Movie