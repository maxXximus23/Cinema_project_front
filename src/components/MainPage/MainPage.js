import React, {Component} from 'react'
import MovieSlider from '../MovieListSlider/movie-slider'
import MovieList from '../MovieList/MovieList'
//import movies from '../../fixtures'
import './MainPage.css'

 class MainPage extends Component{
     constructor(props){
         super(props)
         this.state = {
             isLoaded: false,
             error: null,
             sessions:[]
         }
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
        fetch('http://localhost:8081/sessions/actual')
            .then(this.errorHandler)
            .then((result) => {
                    console.log(result)
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
    render(){
        const {error, isLoaded, sessions}=this.state
        return(
            <div>
                <div>
                    <MovieSlider movies ={sessions.slice(0,4)}/>
                </div>
                <div className="movie_list__item">
                    <MovieList movies ={sessions.slice(5)}/>
                </div>
            </div>
        )
    }
}

export default MainPage