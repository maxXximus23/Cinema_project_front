import React, {Component} from 'react'
import './Movie-slider-element.css'

class Movie extends Component{
    constructor(props){
            super(props);
            this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    /*
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
        fetch('http://localhost:8081')
            .then(this.errorHandler)
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        places: result
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
    }*/

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
                            <img className="img_frame__item" src={movie.img} alt='img'></img>
                        </div>
                        
        
                    </div>
                    </a>
                </div>
            )
    }
}

export default Movie