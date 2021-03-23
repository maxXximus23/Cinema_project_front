import React from "react";
import MovieService from "../../../services/MovieService";
import BackButton from "../../backButton/BackButton";
import YouTube from "react-youtube";

class CreateMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            movie:{
                actors: String,
                country: String,
                description: String,
                duration: Number,
                genres: String,
                posterPath: String,
                title: String,
                trailerPath:String
            },

            actorsError: "",
            countryError: "",
            descriptionError: "",
            durationError: "",
            genresError:"",
            posterPathError: "",
            titleError: "",
            trailerPathError:"",

            actorsBorderColor:"",
            countryBorderColor:"",
            descriptionBorderColor:"",
            durationBorderColor:"",
            genresBorderColor:"",
            posterPathBorderColor:"",
            titleBorderColor:"",
            trailerPathBorderColor:"",

            borderColorRed: "2px solid red",
            borderColorGreen: "2px solid green",
            requiredError: 'This field is required',
            test:false,
            createMovieFailed: false
        }
    }

    createMovie = async(event)=>{
        event.preventDefault();
        let test = true;
        if(this.state.trailerPathBorderColor!==this.state.borderColorGreen) {
            this.setState({trailerPathError: 'This field is required', trailerPathBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.titleBorderColor!==this.state.borderColorGreen) {
            this.setState({titleError: 'This field is required', titleBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.posterPathBorderColor!==this.state.borderColorGreen) {
            this.setState({posterPathError: 'This field is required', posterPathBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.genresBorderColor!==this.state.borderColorGreen) {
            this.setState({genresError: 'This field is required', genresBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.durationBorderColor!==this.state.borderColorGreen) {
            this.setState({durationError: 'This field is required', durationBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.descriptionBorderColor!==this.state.borderColorGreen) {
            this.setState({descriptionError: 'This field is required', descriptionBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.countryBorderColor!==this.state.borderColorGreen) {
            this.setState({countryError: 'This field is required', countryBorderColor: this.state.borderColorRed});
            test=false;
        }
        if(this.state.actorsBorderColor!==this.state.borderColorGreen) {
            this.setState({actorsError: 'This field is required', actorsBorderColor: this.state.borderColorRed});
            test=false;
        }

        if(test){
            await MovieService.addMovie(this.state.movie)
                .then((response) => {
                    console.log(response)
                    if(response.ok){
                        window.location.replace("/movie");
                    }
                    this.setState({createMovieFailed:true});
                })
                .catch((error)=>{
                    console.log(error);
                    this.setState({createMovieFailed:true});
                });
        }
    }
    changeHandler = (e) =>{
        switch (e.target.name){
            case 'actors':
                this.state.movie.actors=e.target.value;
                if(e.target.value==="")
                    this.setState({actorsError: 'This field is required', actorsBorderColor: this.state.borderColorRed})
                else
                    this.setState({actorsError: '', actorsBorderColor: this.state.borderColorGreen})
                break
            case 'country':
                this.state.movie.country=e.target.value;
                if(e.target.value==="")
                    this.setState({countryError: 'This field is required', countryBorderColor: this.state.borderColorRed})
                else
                    this.setState({countryError: '', countryBorderColor: this.state.borderColorGreen})
                break
            case 'description':
                this.state.movie.description=e.target.value;
                if(e.target.value==="")
                    this.setState({descriptionError: 'This field is required', descriptionBorderColor: this.state.borderColorRed})
                else
                    this.setState({descriptionError: '',descriptionBorderColor: this.state.borderColorGreen})
                break
            case 'duration':
                this.state.movie.duration=this.convertTime(e.target.value);
                if(e.target.value==="")
                    this.setState({durationError: 'This field is required', durationBorderColor: this.state.borderColorRed})
                else if(e.target.value==="00:00")
                    this.setState({durationError: 'The duration can`t be 00:00', durationBorderColor: this.state.borderColorRed})
                else
                    this.setState({durationError: '', durationBorderColor: this.state.borderColorGreen})
                break
            case 'genres':
                this.state.movie.genres=e.target.value;
                if(e.target.value==="")
                    this.setState({genresError: 'This field is required', genresBorderColor: this.state.borderColorRed})
                else
                    this.setState({genresError: '', genresBorderColor: this.state.borderColorGreen})
                break
            case 'posterPath':
                this.state.movie.posterPath=e.target.value;
                if(e.target.value==="")
                    this.setState({posterPathError: 'This field is required', posterPathBorderColor: this.state.borderColorRed})
                else if(!this.isValidUrl(e.target.value))
                    this.setState({posterPathError: 'This is not a path', posterPathBorderColor: this.state.borderColorRed})
                else {
                    fetch (e.target.value)
                        .then((response)=>{
                            if(response.ok)
                                this.setState({posterPathError: '', posterPathBorderColor: this.state.borderColorGreen})
                            else
                                this.setState({posterPathError: 'This poster path not find', posterPathBorderColor: this.state.borderColorRed})
                        })
                        .catch(()=>{
                            this.setState({posterPathError: 'This poster path not find', posterPathBorderColor: this.state.borderColorRed})
                        });
                }
                break
            case 'trailerPath':
                this.state.movie.trailerPath=e.target.value;
                this.state.trailerPathTitle = 'https://i.ytimg.com/vi/'+e.target.value+'/hqdefault.jpg';
                if(e.target.value==="")
                    this.setState({trailerPathError: 'This field is required', trailerPathBorderColor: this.state.borderColorRed})
                else {
                    fetch (this.state.trailerPathTitle)
                        .then((response)=>{
                            if(response.ok)
                                this.setState({trailerPathError: '', trailerPathBorderColor: this.state.trailerPathBorderColor})
                            else
                                this.setState({trailerPathError: 'This trailer path not find', trailerPathBorderColor: this.state.borderColorRed})
                        })
                        .catch(()=>{
                            this.setState({trailerPathError: 'This trailer path not find', trailerPathBorderColor: this.state.borderColorRed})
                        });
                    this.setState({trailerPathError: '', trailerPathBorderColor: this.state.borderColorGreen})
                }break
            case 'title':
                this.state.movie.title=e.target.value;
                if(e.target.value==="")
                    this.setState({titleError: 'This field is required', titleBorderColor: this.state.borderColorRed})
                else
                    this.setState({titleError: '', titleBorderColor: this.state.borderColorGreen})
                break
        }
    };
    closeButton = () =>{
        this.setState({createMovieFailed: false});
    }
    isValidUrl(url){
        const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
        return objRE.test(url);
    }
    convertTime(time){
        const h = time.substr(0,2);
        const min = time.substr(3,2);
        return (Number(h) * 360 + Number(min) * 60);
    };
    render() {
        return(
            <div className="login_block">
                <BackButton backPath={() => this.props.history.goBack()} />
                <div>
                    {(this.state.createMovieFailed) && <a style={{color: 'red'}}>An unknown error occurred
                        <button onClick={this.closeButton} className="btn-close" aria-label="Close">x</button>
                    </a>}
                </div>
                <form onSubmit={this.createMovie}>
                    <div>
                        Title:
                        <input value={this.title} onChange={e => this.changeHandler(e)}
                               type="text" name="title" className="form-control"
                               style={{border: this.state.titleBorderColor}} onBlur={e => this.changeHandler(e)} />
                        <div style={{color: 'red'}}>{this.state.titleError}</div>
                    </div>
                    <div>
                        Description:
                        <textarea value={this.description} onBlur={e => this.changeHandler(e)}
                                  onChange={e => this.changeHandler(e)} name="description"
                                  style={{border: this.state.descriptionBorderColor, width:'550px', height:'150px'}} />
                        <div style={{color: 'red'}}>{this.state.descriptionError}</div>
                    </div>
                    <div>
                        Duration:
                        <input value={this.duration} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="time" name="duration" className="form-control"
                               style={{border: this.state.durationBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.durationError}</div>
                    </div>
                    <div>
                        Genres:
                        <input value={this.genres} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="text" name="genres" className="form-control"
                               style={{border: this.state.genresBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.genresError}</div>
                    </div>
                    <div>
                        Actors:
                        <input value={this.actors} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="text" name="actors" className="form-control"
                               style={{border: this.state.actorsBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.actorsError}</div>
                    </div>
                    <div>
                        Country:
                        <input value={this.country} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="text" name="country" className="form-control"
                               style={{border: this.state.countryBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.countryError}</div>
                    </div>
                    <div>
                        Poster path:
                        <input value={this.posterPath} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="text" name="posterPath" className="form-control"
                               style={{border: this.state.posterPathBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.posterPathError}</div>
                        <div className="movie_poster col-md-12">
                            <img className="img_poster" alt="" src={this.state.movie.posterPath}/>
                        </div>
                    </div>
                    <div>
                        Trailer path id:
                        <input value={this.trailerPath} onChange={e => this.changeHandler(e)} onBlur={e => this.changeHandler(e)}
                               type="text" name="trailerPath" className="form-control"
                               style={{border: this.state.trailerPathBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.trailerPathError}</div>
                        <YouTube videoId={this.state.movie.trailerPath}  />
                    </div>
                    <div>
                        <button id="btn_singin__item" className="w-100 btn btn-lg btn-primary" type="submit">Create</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default CreateMovie;