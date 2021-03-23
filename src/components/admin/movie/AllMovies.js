import React from "react";
import MovieService from "../../../services/MovieService";
import DeleteMovie from "./DeleteMovie";

class AllMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            movies:{
                id: Number,
                actors: String,
                country: String,
                description: String,
                duration: Number,
                genres: String,
                posterPath: String,
                title: String,
                trailerPath:String
            }
        }
    }

    componentDidMount = async()=> {
        await MovieService.getAll()
            .then((result) => {
                this.setState({movies: result});
            })
        console.log(this.state.movies);
    }


    render() {
        const movies = [];
        if(this.state.movies.length > 0) {
            let item = {values: []}
            for (let i = 0; i < this.state.movies.length; i++) {
                item.values.push(
                    <div>
                        <div>
                            <h3>Title: {this.state.movies[i].title}</h3>
                            <p>Date: {this.state.movies[i].description}</p>
                            <p>Date: {this.state.movies[i].actors}</p>
                            <p>Date: {this.state.movies[i].country}</p>
                            <p>Date: {this.state.movies[i].duration}</p>
                            <p>Date: {this.state.movies[i].genres}</p>
                        </div>
                        <button onClick={ ()=>window.location.replace("/update-movie/" + this.state.movies[i].id)}>Update</button>
                        <DeleteMovie id={this.state.movies[i].id}/>

                    </div>
                )
            }
            movies.push(item)
        }
        return (
            <div>
                <button onClick={ ()=>window.location.replace("/create-movie/")}>Create</button>
                {

                movies.map(el =>{
                    return el.values
                })}

            </div>
        )
    }
}
export default AllMovies;