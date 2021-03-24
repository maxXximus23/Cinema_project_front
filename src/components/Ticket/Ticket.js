import React from "react";
import './Ticket.css'
import moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from "../Loading/Loading";

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tickets: []
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoaded: true,
            tickets: nextProps.tickets
        })
    }
    
    render() {
        const tickets = this.state.tickets
        const list = Object.entries(tickets).sort(
            (a, b) =>
            moment(a[1][0].date) >= moment(b[1][0].date) ? 1 : -1
           )

        if(!this.state.isLoaded)
            return <Loading />
        else

        return (
           <div className="tickets_wrap__item col-md-12">
               {
                   list.map(el => {

                       return <Link to={"/movies/" + el[1][0].movieId}>
                            <div className="main">                         
                                <img className="img_ticket__item" src={el[1][0].posterPath} width="225"
                                 height="275" alt=""/> 
                                <div className="text">
                                    <h3>{el[1][0].movieTitle}</h3>
                                
                                    <p>Date: {moment(el[1][0].date).format('HH:mm DD.MM.YY')}</p>
                                    <p>Hall name: {el[1][0].hallName}</p>
                                    <p>Amount: {el[1].length}</p>
                                </div>  
                                <div className="place__item">Place: <br/><ul className="places_wrap__item"> 
                                    {
                                        el[1].map(tick => {
                                            return <li><div className="place__text">
                                                [ {tick.row} row / {tick.place} place ]
                                                </div></li>
                                        })
                                    }</ul>
                                    </div>
                                </div>
                        </Link>
                   })
               }
           </div>
        )
    }
}

export default Ticket;