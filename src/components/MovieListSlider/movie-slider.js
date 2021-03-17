import React from 'react'
import Movie from './Movie-slider-element'
import './movie-slider.css'
import { Fade } from 'react-slideshow-image';


export default function MovieSlider({movies}){
    const movieElements = movies.map(movie =>
        <li key = {movie.id} className="movie-list__li"><Movie movie = {movie}/></li>
    )
    return(
        <div className="slide-container">
            
            <ul className = "movies">
                <Fade>{movieElements}</Fade>
            </ul>
        </div>
    )
}