import React from "react";
import GenreService from "../../../services/GenreService";

class DeleteGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id: this.props.id
        }
    }
    delete = async(event)=> {
        event.preventDefault();
        await GenreService.deleteGenre(this.state.id)
            .then((response) => {
                window.location.replace("/admin/all-genres");
            });
    };
    render() {
        return (
            <div >
                <button onClick={this.delete}>Delete</button>
            </div>
        )
    }
}
export default DeleteGenre;