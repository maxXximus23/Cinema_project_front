import React from "react";
import './Ticket.css'

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            tickets: nextProps.tickets
        })
    }
    
    render() {
        const tickets = [];
        if(this.state.tickets.length > 0) {
            let item = {values: []}
            for (let i = 0; i < this.state.tickets.length; i++) {
                item.values.push(
                    <div>
                        <div className="main">
                            <img className="img_ticket__item" src={this.state.tickets[i].posterPath} width="225"
                                 height="275" alt=""/>
                            <div className="text">
                                <h3>Title: {this.state.tickets[i].movieTitle}</h3>
                                <p>Date: {this.state.tickets[i].date}</p>
                                <p>Hall name: {this.state.tickets[i].hallName}</p>
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
            <div className="tickets_wrap__item col-md-12">{
                tickets.map(el =>{
                    return el.values
                })}
            </div>
        )
    }
}

export default Ticket;