import React from "react";
import GenreService from "../../../services/GenreService";
import CreateGenre from "./CreateGenre";
import DeleteGenre from "./DeleteGenre"
import UpdateGenre from "./UpdateGenre";

class AllGenres extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            genres:{
                id: Number,
                name: String
            },
            newGenre:{
                name:String
            },
            nameError:"",
            borderColorName:""

        }
    }

    componentDidMount = async()=> {
        await GenreService.getAll()
            .then((result) => {
                this.setState({genres: result});
            });
    };

    render() {
        const genres = [];
        if(this.state.genres.length > 0) {
            let item = {values: []}
            for (let i = this.state.genres.length-1; i >= 0; i--) {
                item.values.push(
                    <div className="all-genre-column">
                        <div>
                            <h3>{this.state.genres[i].name}</h3>
                        </div>
                        <DeleteGenre id={this.state.genres[i].id}/>
                        <UpdateGenre id={this.state.genres[i].id} name={this.state.genres[i].name}/>
                    </div>
                )
            }
            genres.push(item)
        }
        return (
            <div className="wrapper">
                <CreateGenre/>
                <div className="all-genre">
                    {genres.map(el =>{
                        return el.values
                    })}
                </div>
            </div>
        )
    }
}
export default AllGenres;