import React, {Component} from 'react'
import MovieSlider from '../MovieListSlider/movie-slider'
import MovieList from '../MovieList/MovieList'
import './Home.css'
import ErrorComponent from '../error/ErrorComponent';

 class Home extends Component{
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
        if (error) {
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div>
                    <div>
                        <MovieSlider movies ={sessions.slice(0,4)}/>
                    </div>
                    <div className="movie_list__item">
                        <MovieList movies={sessions}/>
                    </div>
                </div>
            )
        }
    }
}

export default Home