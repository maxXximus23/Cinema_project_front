import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Movie-slider-element.css'

class Movie extends Component{


    render() {
        
        const {session} = this.props


            return(
                <div className="each-fade movie container">
                    <Link className="floating-button" to={"/movies/" + session.movieId}>
                        <div className="row d-flex justify-content-between">
                            <div className="movie_body col-lg-6">
                                <div className="movie_title">{session.movieTitle}</div>
                                <div className="movie_info">{session.date}</div>
                                <div className="floating-button">Buy now</div>
                            </div>
                            <div className="col-lg-6">
                                <img className="img_frame__item" src={session.moviePoster} alt='img'></img>
                            </div>
                        </div>
                    </Link>
                </div>
            )
    }
}

export default Movie