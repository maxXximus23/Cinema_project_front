import React from "react";
import './Ticket.css'

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.id,
            isLoaded: false,
            tickets:{
                id: Number,
                movieId: Number,
                movieTitle: String,
                date: Date,
                hallName: String,
                row: Number,
                place: Number,
                posterPath: String
            }
        };
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

    componentDidMount(){
        fetch('http://localhost:8081/tickets/user/' + this.state.userId)
            .then(this.errorHandler)
            .then((result) => {
                this.setState({
                        isLoaded: true,
                        tickets: result
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
        const tickets = [];
        if(this.state.tickets.length > 0) {
            let item = {values: []}
            for (let i = 0; i < this.state.tickets.length; i++) {
                item.values.push(
                    <div>
                        <div className="main">
                            <img src={this.state.tickets[i].posterPath} width="225"
                                 height="275" alt=""/>
                            <div className="text">
                                <h3>Title: {this.state.tickets[i].movieTitle}</h3>
                                <p>Date: {this.state.tickets[i].date}</p>
                                <p>HallName: {this.state.tickets[i].hallName}</p>
                                <p>Row: {this.state.tickets[i].row}</p>
                                <p>Place: {this.state.tickets[i].place}</p>
                                <p>Order number: {this.state.tickets[i].id}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            tickets.push(item)
        }
        return (
            <div>{
                tickets.map(el =>{
                    return el.values
                })}
            </div>
        )
    }
}

export default Ticket;