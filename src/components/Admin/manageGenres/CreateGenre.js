import React from "react";
import GenreService from "../../../services/GenreService";
import './ManageGenres.css'

class CreateGenre extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            newGenre:{
                name:""
            },
            nameError:"",
            borderColorName:"",
            createFailed:false,
            requiredError: 'This field is required',
            borderColorRed: "2px solid red",
            borderColorGreen: "2px solid green"

        }
    }
    addGenre = async(event)=> {
        event.preventDefault();
        if (this.state.borderColorName === this.state.borderColorGreen) {
            console.log(this.state.newGenre)
            console.log(1)
            await GenreService.addGenre(this.state.newGenre)
                .then((response) => {
                    if (response.ok)
                        window.location.replace("/admin/all-genres");
                    else
                        this.setState({createFailed: true});
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({createFailed: true});
                })
        } else if (this.state.newGenre.name === "")
            this.setState({nameError: this.state.requiredError, borderColorName: this.state.borderColorRed});
    };
    changeHandler = async(e) =>{
        this.setState({newGenre: {name: e.target.value}});
        const free = await GenreService.isNameFree(e.target.value);
        if(e.target.value==="")
            this.setState({nameError: this.state.requiredError, borderColorName: this.state.borderColorRed});
        else if(!free)
            this.setState({nameError: "This name is already used", borderColorName: this.state.borderColorRed});
        else
            this.setState({nameError: "", borderColorName: this.state.borderColorGreen});
    }
    closeButton = () =>{
        this.setState({createFailed: false});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addGenre} className="create-genre">
                    <div>
                        {(this.state.createFailed) && <a style={{color: 'red'}}>An unknown error occurred
                            <button onClick={this.closeButton} className="btn-close" aria-label="Close">x</button>
                        </a>}
                    </div>
                    <div className="genre-name">
                        <input onChange={e => this.changeHandler(e)} value={this.name} type="text" name="name" className="form-control" placeholder="New genre"
                               style={{border: this.state.borderColorName}}/>
                        <div style={{color: 'red'}}>{this.state.nameError}</div>
                    </div>
                    <div>
                        <button id="btn_singin__item" className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateGenre;