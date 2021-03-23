import React from "react";
import MovieService from "../../../services/MovieService";

class DeleteMovie extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.id)
        this.state={
            id: props.id
        }

    }

    delete = async()=> {
        const d = await MovieService.deleteMovie(this.state.id);
        console.log(d);
    }
    render() {
        return(
            <div>
                <button onClick={this.delete}>Delete</button>
            </div>);
    }
}
export default DeleteMovie;