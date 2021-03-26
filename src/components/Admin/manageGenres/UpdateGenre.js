import React from "react";
import GenreService from "../../../services/GenreService";

class UpdateGenre extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isUpdate:false,
            name: props.name,
            id: props.id,
            updateGenre:{
                name:""
            },
            nameError:"",
            borderColorName:"",
            requiredError: 'This field is required',
            borderColorRed: "2px solid red",
            borderColorGreen: "2px solid green"
        }
    }
    update = ()=>{
        this.setState({isUpdate:true});
    }
    cancel = ()=>{
        this.setState({isUpdate:false});
    }
    updateGenre = async(event)=> {
        event.preventDefault();
        if (this.state.borderColorName === this.state.borderColorGreen) {
            console.log(this.state.updateGenre)
            console.log(1)
            await GenreService.updateGenre(this.state.id,this.state.updateGenre)
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
        this.setState({updateGenre: {name: e.target.value}});
        const free = await GenreService.isNameFree(e.target.value);
        if(e.target.value==="")
            this.setState({nameError: this.state.requiredError, borderColorName: this.state.borderColorRed});
        else if(!free)
            this.setState({nameError: "This name is already used", borderColorName: this.state.borderColorRed});
        else
            this.setState({nameError: "", borderColorName: this.state.borderColorGreen});
    }

    render() {
        return (
            <div>
                <div>
                    {(this.state.isUpdate) &&<div>
                        <form onSubmit={this.updateGenre}>
                        <div>
                                <input onChange={e => this.changeHandler(e)} defaultValue={this.state.name} value={this.name} type="text" name="name" className="form-control" placeholder="New genre"
                                       style={{border: this.state.borderColorName}}/>
                                <div style={{color: 'red'}}>{this.state.nameError}</div>
                                <div>
                                    <button id="btn_singin__item" className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                                </div>
                            </div>
                        </form>
                        <button onClick={this.cancel}>Cancel</button>
                    </div>}
                </div>
                <button onClick={this.update}>Update</button>
            </div>
        )
    }
}
export default UpdateGenre;