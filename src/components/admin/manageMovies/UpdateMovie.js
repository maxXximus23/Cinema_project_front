import React from "react";
import MovieService from "../../../services/MovieService";
import BackButton from "../../backButton/BackButton";
import YouTube from "react-youtube";

class UpdateMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            id: props.match.params.movieId,
            movie:{
                id: Number,
                actors: String,
                country: String,
                description: String,
                duration: Number,
                genres: String,
                posterPath: String,
                title: String,
                trailerPath:String
            },
            newMovie:{
                id: Number,
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
            updateMovieFailed:false,
            time: String,
            posterPathChecked:Boolean,
            trailerPathChecked:Boolean
        }


    }
    parseDuration(d){
        const h = Math.floor(Number(d) / 3600);
        const m = Math.floor(Number(d) % 3600 / 60);
        let hStr, mStr;
        if(h>9)
            hStr = h ;
        else
            hStr = "0" + h;
        if(m>9)
            mStr = m;
        else
            mStr = "0" + m;
        return hStr+":"+mStr;
    }
    componentDidMount = async()=> {
        await MovieService.getById(this.state.id)
            .then((result) => {
                this.setState({movie: result, time:this.parseDuration(result.duration)});
                if(result.posterPath!=="no-poster.png" && result.trailerPath!=="")
                    this.setState({posterPathChecked:true, trailerPathChecked:true, newMovie:{posterPath : result.posterPath, trailerPath:result.trailerPath}});
                else if(result.posterPath==="no-poster.png" && result.trailerPath==="")
                    this.setState({posterPathChecked:false, trailerPathChecked:false});
                else if(result.posterPath==="no-poster.png")
                    this.setState({posterPathChecked:false,trailerPathChecked:true, newMovie:{trailerPath:result.trailerPath}});
                else if(result.trailerPath==="")
                    this.setState({trailerPathChecked:false, posterPathChecked:true, newMovie:{posterPath : result.posterPath}});

            });
    }
    closeButton = () =>{
        this.setState({updateMovieFailed: false});
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
    updateMovie = async(event)=>{
        event.preventDefault();
        if(this.state.actorsError === "" &&
            this.state.countryError === "" &&
            this.state.descriptionError === "" &&
            this.state.durationError === "" &&
            this.state.genresError === "" &&
            this.state.posterPathError === "" &&
            this.state.titleError === "" &&
            this.state.trailerPathError === ""){
                    await MovieService.updateMovie(this.state.id, this.state.newMovie)
                        .then((response) => {
                            console.log(response)
                            if(response.ok)
                                window.location.replace("/all-movies");
                            else
                                this.setState({updateMovieFailed:true});
                        })
                        .catch((error)=>{
                            console.log(error);
                            this.setState({updateMovieFailed:true});
                        });
            }
    }

    changeHandler = (e) =>{
        switch (e.target.name){
            case 'actors':
                this.state.newMovie.actors=e.target.value;
                if(e.target.value==="")
                    this.setState({actorsError: 'This field is required', actorsBorderColor: this.state.borderColorRed})
                else if(this.state.newMovie.actors===this.state.movie.actors)
                    this.setState({actorsError: '', actorsBorderColor: ""})
                else
                    this.setState({actorsError: '', actorsBorderColor: this.state.borderColorGreen})
                break
            case 'country':
                this.state.newMovie.country=e.target.value;
                if(e.target.value==="")
                    this.setState({countryError: 'This field is required', countryBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.country)
                    this.setState({countryError: '', countryBorderColor: ""})
                else
                    this.setState({countryError: '', countryBorderColor: this.state.borderColorGreen})
                break
            case 'description':
                this.state.newMovie.description=e.target.value;
                if(e.target.value==="")
                    this.setState({descriptionError: 'This field is required', descriptionBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.description)
                    this.setState({descriptionError: '', descriptionBorderColor: ""})
                else
                    this.setState({descriptionError: '',descriptionBorderColor: this.state.borderColorGreen})
                break
            case 'duration':
                this.state.newMovie.duration=this.convertTime(e.target.value);
                if(e.target.value==="")
                    this.setState({durationError: 'This field is required', durationBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.time)
                    this.setState({durationError: '', durationBorderColor: ""})
                else if(e.target.value==="00:00")
                    this.setState({durationError: 'The duration can`t be 00:00', durationBorderColor: this.state.borderColorRed})
                else
                    this.setState({durationError: '', durationBorderColor: this.state.borderColorGreen})
                break
            case 'genres':
                this.state.newMovie.genres=e.target.value;
                if(e.target.value==="")
                    this.setState({genresError: 'This field is required', genresBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.genres)
                    this.setState({genresError: '', genresBorderColor: ""})
                else
                    this.setState({genresError: '', genresBorderColor: this.state.borderColorGreen})
                break
            case 'posterPath':
                this.state.newMovie.posterPath=e.target.value;
                if(e.target.value==="")
                    this.setState({posterPathError: 'This field is required', posterPathBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.posterPath)
                    this.setState({posterPathError: '', posterPathBorderColor: ""})
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
                this.state.newMovie.trailerPath=e.target.value;
                if(e.target.value==="")
                    this.setState({trailerPathError: 'This field is required', trailerPathBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.trailerPath)
                    this.setState({trailerPathError: '', trailerPathBorderColor: ""})
                else {
                    fetch('http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+e.target.value+'&format=json')
                        .then((response) => {
                            if (response.ok)
                                this.setState({
                                    trailerPathError: '',
                                    trailerPathBorderColor: this.state.borderColorGreen
                                });
                            else
                                this.setState({
                                    trailerPathError: 'This trailer path not find',
                                    trailerPathBorderColor: this.state.borderColorRed
                                })
                            })
                        .catch(() => {
                            this.setState({
                                trailerPathError: 'This trailer path not find',
                                trailerPathBorderColor: this.state.borderColorRed
                            })
                        });
                }
                break
            case 'title':
                this.state.newMovie.title=e.target.value;
                if(e.target.value==="")
                    this.setState({titleError: 'This field is required', titleBorderColor: this.state.borderColorRed})
                else if(e.target.value===this.state.movie.title)
                    this.setState({titleError: '', titleBorderColor: ""})
                else
                    this.setState({titleError: '', titleBorderColor: this.state.borderColorGreen})
                break
            case 'posterPathChecked':
                if(e.target.checked) {
                    if(this.state.movie.posterPath==="no-poster.png")
                        this.state.newMovie.posterPath="";
                    else
                        this.state.newMovie.posterPath=this.state.movie.posterPath;
                    this.setState({posterPathChecked: true,
                        posterPathError: '',
                        posterPathBorderColor: ''});
                }
                else {
                    this.setState({posterPathChecked: false,
                        posterPathError: '',
                        posterPathBorderColor: this.state.borderColorGreen});
                    this.state.newMovie.posterPath="no-poster.png";
                }
                break
            case 'trailerPathChecked':
                if(e.target.checked) {
                    if(this.state.movie.trailerPath==="")
                        this.state.newMovie.trailerPath="";
                    else
                        this.state.newMovie.trailerPath=this.state.movie.trailerPath;
                    this.setState({trailerPathChecked: true,
                        trailerPathError: '',
                        trailerPathBorderColor: ''});
                }
                else {
                    this.setState({trailerPathChecked: false,
                        trailerPathError: '',
                        trailerPathBorderColor: this.state.borderColorGreen});
                    this.state.newMovie.trailerPath="";
                }
                console.log(this.state.newMovie.posterPath)
                break
        }
    };

    render() {
        return(
            <div className="login_block">
                <BackButton backPath={() => this.props.history.goBack()} />
                <div>
                    {(this.state.updateMovieFailed) && <a style={{color: 'red'}}>An unknown error occurred
                        <button onClick={this.closeButton} className="btn-close" aria-label="Close">x</button>
                    </a>}
                </div>
                <form onSubmit={this.updateMovie}>
                    <div>
                        Title:
                        <input defaultValue={this.state.movie.title} onChange={e => this.changeHandler(e)}
                               type="text" name="title" className="form-control"
                               style={{border: this.state.titleBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.titleError}</div>
                    </div>
                    <div>
                        Description:
                        <textarea defaultValue={this.state.movie.description}
                                  onChange={e => this.changeHandler(e)} name="description"
                                  style={{border: this.state.descriptionBorderColor, width:'550px', height:'150px'}} />
                        <div style={{color: 'red'}}>{this.state.descriptionError}</div>
                    </div>
                    <div>
                        Duration:
                        <input defaultValue={this.state.time} onChange={e => this.changeHandler(e)}
                               type="time" name="duration" className="form-control"
                               style={{border: this.state.durationBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.durationError}</div>
                    </div>
                    <div>
                        Genres:
                        <input defaultValue={this.state.movie.genres} onChange={e => this.changeHandler(e)}
                               type="text" name="genres" className="form-control"
                               style={{border: this.state.genresBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.genresError}</div>
                    </div>
                    <div>
                        Actors:
                        <input defaultValue={this.state.movie.actors} onChange={e => this.changeHandler(e)}
                               type="text" name="actors" className="form-control"
                               style={{border: this.state.actorsBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.actorsError}</div>
                    </div>
                    <div>
                        Country:
                        <input defaultValue={this.state.movie.country} onChange={e => this.changeHandler(e)}
                               type="text" name="country" className="form-control"
                               style={{border: this.state.countryBorderColor}} />
                        <div style={{color: 'red'}}>{this.state.countryError}</div>
                    </div>
                    <div>
                        Poster path:
                        <input type="checkbox" onChange={e => this.changeHandler(e)} defaultChecked={this.state.posterPathChecked} name="posterPathChecked" />
                        {(this.state.posterPathChecked) && <div >
                            <input defaultValue={this.state.newMovie.posterPath} onChange={e => this.changeHandler(e)}
                                   type="text" name="posterPath" className="form-control"
                                   style={{border: this.state.posterPathBorderColor}} />
                            <div style={{color: 'red'}}>{this.state.posterPathError}</div>
                            <div className="movie_poster col-md-12">
                                <img className="img_poster" alt="" src={this.state.newMovie.posterPath} />
                            </div>
                        </div>}
                    </div>
                    <div>
                        Trailer path id:
                        <input type="checkbox" onChange={e => this.changeHandler(e)} defaultChecked={this.state.trailerPathChecked} name="trailerPathChecked" />
                        {(this.state.trailerPathChecked) && <div >
                            <input defaultValue={this.state.movie.trailerPath} onChange={e => this.changeHandler(e)}
                                   type="text" name="trailerPath" className="form-control"
                                   style={{border: this.state.trailerPathBorderColor}} />
                            <div style={{color: 'red'}}>{this.state.trailerPathError}</div>
                            <YouTube videoId={this.state.newMovie.trailerPath} />
                        </div>}
                    </div>
                    <div>
                        <button id="btn_singin__item" className="w-100 btn btn-lg btn-primary" type="submit">Update</button>
                    </div>
                </form>
            </div>);
    }
}
export default UpdateMovie;