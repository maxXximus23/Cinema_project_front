import React from 'react'
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
            genre: (this.props.location.query===undefined) ? '' : this.props.location.query
        };
        this.updatePage = this.updatePage.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.resetGenre = this.resetGenre.bind(this);
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
        fetch('http://localhost:8081/movies/pages/' + this.state.perPage + '?genre=' + this.state.genre)
        .then(this.errorHandler)
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
        fetch('http://localhost:8081/movies?page=' + page + '&perPage=' + this.state.perPage + '&genre=' + this.state.genre)
                .then(this.errorHandler)
                .then((result) => {
                        this.setState({
                            isLoaded: true,
                            movies: result
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

    handleTextChange(event){
        this.state.genre = event.target.value
    }

    resetGenre(event){
        if (this.state.genre != '')
        {
            this.state.genre = ''
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
                    <input type="text" 
                        placeholder="Genre..." 
                        onChange={this.handleTextChange}
                    />
                    <button onClick={this.updateGenre}>Search</button>
                    <button onClick={this.resetGenre}>Reset</button>
                    <PageResult movies={movies} genre={this.state.genre} className="col-md-12"/>
                    <div>
                        {pagebuttons}
                    </div>
                </div>
            );
        }
    }
}

export default MoviesListPage;