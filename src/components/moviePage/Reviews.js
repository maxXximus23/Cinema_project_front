import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'
import ErrorComponent from '../error/ErrorComponent';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id: props.id,
            reviews: [],
            newReviewText: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.postReview = this.postReview.bind(this);
    }

    async errorHandler(response){
        if (!response.ok){
            await response.json()
                    .then(res => {
                        throw Error(res.message)
                    })
        }

        return response.json()
    }
  
    componentDidMount() {
        fetch('http://localhost:8081/reviews/movie/' + this.state.id)
            .then(this.errorHandler)
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        reviews: result
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
  
    render() {
        const { error, isLoaded, reviews } = this.state;
        let newReviwForm = (
            <div className="text-left newReview col-md-9">
                <h5>Already watched? Share your impressions with others!</h5>
                <form onSubmit={this.postReview}>
                    <textarea className="col-md-12 newReview__text form-control" 
                        placeholder="Write your review (minimum 20 characters)" 
                        rows="5"
                        onChange={this.handleTextChange}
                        value={this.state.newReviewText}/>
                    <input type="submit" value="Post Review" className="newReview__submit buttonPost"/>
                </form>
            </div>
        )

        if (error) {
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (reviews.length === 0){
            return <div>
                        <h3 className="text-left">No reviews for now</h3>
                        {newReviwForm}
                    </div>
        } else {
            return (
                <div>
                    <h3 className="text-left">Reviews:</h3>
                    {
                        reviews.map(el =>{
                            return <div key={el.id} className="col-md-9 review">
                                    <div className="d-flex justify-content-between col-md-12 review__header">
                                        <Link to={"/users/" + el.authorId}>
                                            <h6 className="col-md-5 text-left">{el.authorName}</h6>
                                        </Link>
                                        <span className="col-md-5 text-right">{el.creationDate}</span>
                                    </div>
                                    <div>
                                        <p className="col-md-12 review__text text-left">{el.text}</p>
                                    </div>
                                </div>
                        })
                    }
                    {newReviwForm}
                </div>
            );
        }
    }

    handleTextChange(event){
        this.setState({
            newReviewText: event.target.value
        });
    }

    postReview(event){ //TODO: Add real user data in request
        event.preventDefault();

        if (this.state.newReviewText.length < 20)
            return;

        let data = {
            movieId: this.state.id,
            authorId: -1,
            text: this.state.newReviewText
        }

        fetch('http://localhost:8081/reviews/add',
            {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data) 
            }
        )
        .then(this.errorHandler)
        .then(result => {
                this.state.reviews.push({
                    id: result.id,
                    text: result.text,
                    creationDate: result.creationDate,
                    movieId: result.movieId,
                    authorId: result.authorId,
                    authorName: result.authorName,                    
                })
                this.setState({
                    newReviewText: ""
                })
                event.target.value = ""
        })
        .catch(err => {
            this.setState({
                isLoaded: true,
                error: err
            })
        })
    }
}

export default Reviews;