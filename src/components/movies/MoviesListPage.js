import React from 'react'
import MovieService from '../../services/MovieService';
import ErrorComponent from '../error/ErrorComponent';
import PageResult from './PageResult';

class MoviesListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movies: [],
            page: 1,
            perPage: 20,
            pageAmount: 0,
            genre: (this.props.location.query===undefined) ? '' : this.props.location.query,
            title: ''
        };
        this.updatePage = this.updatePage.bind(this);

        this.updateGenre = this.updateGenre.bind(this);
        this.handleGenreTextChange = this.handleGenreTextChange.bind(this);
        this.resetGenre = this.resetGenre.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.handleTitleTextChange = this.handleTitleTextChange.bind(this);
        this.resetTitle = this.resetTitle.bind(this);
    }

    async errorHandler(response){
        if (!response.ok){
            await response.json()
                    .then(res => {
                        throw res
                    })
        }

        return response.json()
    }
  
    componentDidMount() {
       this.updateData(1)
    }

    updateData(page){
        MovieService.getPageAmountForQuery(this.state.perPage, this.state.genre, this.state.title)
            .then((result) => {
                this.state.pageAmount = result
                this.setPageData(page)
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            });
    }

    setPageData(page){
        MovieService.getMoviesForQuery(page, this.state.perPage, this.state.genre, this.state.title)
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    movies: result                        
                })
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            });
    }

    updatePage(event){
        if (this.state.page != event.target.value)
        {
            this.state.page = event.target.value
            this.setPageData(this.state.page)
        }
    }

    updateGenre(event){
        if (this.state.genre != event.target.value)
        {
            this.updateData(1)
        }
    }

    updateTitle(event){
        if (this.state.title != event.target.value)
        {
            this.updateData(1)
        }
    }

    handleGenreTextChange(event){
        this.state.genre = event.target.value
    }

    handleTitleTextChange(event){
        this.state.title = event.target.value
    }

    resetGenre(event){
        if (this.state.genre != '')
        {
            this.state.genre = ''
            document.getElementById("genreField").value = ""
            this.updateData(1)
        }
    }

    resetTitle(event){
        if (this.state.title != '')
        {
            this.state.title = ''
            document.getElementById("titleField").value = ""
            this.updateData(1)
        }
    }
  
    render() {
        const { error, isLoaded, movies } = this.state;
        let pagebuttons = []
        
        for (let i = 1; i <= this.state.pageAmount; i++){
            pagebuttons.push(
                <button key={i} onClick={this.updatePage} value={i}>{i}</button>
            )
        }
        if (error) {
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <input type="text" 
                            placeholder="Title..." 
                            id="titleField"
                            onChange={this.handleTitleTextChange}
                        />
                        <button onClick={this.updateTitle}>Search</button>
                        <button onClick={this.resetTitle}>Reset</button>
                    </div>
                    <div>
                        <input type="text" 
                            placeholder="Genre..." 
                            id="genreField"
                            onChange={this.handleGenreTextChange}
                        />
                        <button onClick={this.updateGenre}>Search</button>
                        <button onClick={this.resetGenre}>Reset</button>
                    </div>
                    <PageResult movies={movies} className="col-md-12"/>
                    <div>
                        {pagebuttons}
                    </div>
                </div>
            );
        }
    }
}

export default MoviesListPage;