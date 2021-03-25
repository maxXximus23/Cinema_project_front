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
            tickets: [],
            reversed: false
        };

        this.changeSort = this.changeSort.bind(this)
        this.reverse = this.reverse.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoaded: true,
            tickets: Object.entries(nextProps.tickets).sort((a, b) =>
                moment(a[1][0].date) >= moment(b[1][0].date) ? 1 : -1)
        })
    }

    
    changeSort(event){
        this.setState({
            isLoaded: false
        })

        let newList = {}
        switch (event.target.value){
            case "0":
                newList = this.state.tickets.sort((a, b) => 
                    moment(a[1][0].date) >= moment(b[1][0].date) ? 1 : -1
                )
                break;
            case "1":
                newList = this.state.tickets.sort((a, b) => 
                    a[1][0].movieTitle.toLowerCase() >= b[1][0].movieTitle.toLowerCase() ? 1 : -1
                )
                break;
            case "2":
                newList = this.state.tickets.sort((a, b) => 
                    a[1][0].hallId >= b[1][0].hallId ? 1 : -1
                )
            case "3":
                newList = this.state.tickets.sort((a, b) => 
                    a[1].length >= b[1].length ? 1 : -1
                )
                break;
            default: break;
        }

        if (this.state.reversed)
            newList = newList.reverse()

        this.setState({
            isLoaded: true,
            tickets: newList
        })
    }

    reverse(event){
        this.setState({
            isLoaded: true,
            tickets: this.state.tickets.reverse(),
            reversed: !this.state.reversed
        })
    }
    
    render() {
        const tickets = this.state.tickets
        if(!this.state.isLoaded)
            return <Loading />
        else

        return (
           <div className="tickets_wrap__item col-md-12">
                <div>
                    <span>Sort by: </span>
                    <select onChange={this.changeSort}>
                        <option value="0">Date</option>
                        <option value="1">Movie</option>
                        <option value="2">Hall</option>
                        <option value="3">Amount</option>
                    </select>
                    <label>
                        <input type="checkbox" onChange={this.reverse}/>
                        <span></span>
                    </label>
                </div>
               {
                   tickets.map(el => {

                       return <Link to={"/movies/" + el[1][0].movieId}>
                            <div className="main">                         
                                <img className="img_ticket__item" src={el[1][0].posterPath} alt=""/> 
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