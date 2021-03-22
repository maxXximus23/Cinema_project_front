import React, {Component} from 'react'
import Ticket from '../Ticket/Ticket'
import AccountService from '../../services/AccountService'
import TicketService from '../../services/TicketService'
import './Account.css'
import moment from 'moment';
//import BookedList from '../BookedList/BookedList'
//import HistoryList from '../HistoryList/HistoryList'

class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            tickets: [],
            user: {}
        }


        
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
    this.setState({
        user: AccountService.geUser()
    })
    TicketService.getUsersTickets()
                .then(res=>{
                    console.log(res)
                    this.setState({
                        tickets: res
                    })
                })
                .catch(error => {
                    this.setState({
                        ticketsError: error
                    })
                
            })
}
    
    render() {
        const {isLoaded, error, user} = this.state
        const bookedTickets = this.state.tickets.filter(e =>(moment(e.date).format('hh:mm DD.MM.YY') > moment().format('hh:mm DD.MM.YY')))
        //console.log(moment().format('hh:mm DD.MM.YY'))
        const historyTickets = this.state.tickets.filter(e => moment(e.date).format('hh:mm DD.MM.YY') < moment().format('hh:mm DD.MM.YY'))
        console.log(historyTickets)
        console.log(bookedTickets)
        return(
            <div className="wrapper">
                <div className="user_info__item">
                    <img className="user_img__item" src="https://cdn1.flamp.ru/6e8b1e5fe1cc01a4d15e1d27c602dfa7.jpg" alt='img'/>
                    <div className="user_name__item">{user.firstName} {user.lastName}</div>
                </div>
                <div className="user_list__item"> 
                                <fieldset className="lists_wrapper__item">
                                    <input  type="radio" name="sizeBy" value="weight" id="sizeWeight" checked="checked" />
                                    <label id="bookedlist_controller__item" className="radio_button__item" for="sizeWeight">Booked tickets</label>
                                   
                                    <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions" />
                                    <label id="historylist_controller__item"className="radio_button__item" for="sizeDimensions">History</label>
                               
                                    <div id="booked_list__item" className="container"><div className="row"><Ticket tickets={bookedTickets} /></div></div>
                                    <div id="history_list__item"className="container"><div className="row"><Ticket tickets={historyTickets} /></div></div>
                                </fieldset>
                </div>
                
            </div>
        )
    }
}

export default UserPage