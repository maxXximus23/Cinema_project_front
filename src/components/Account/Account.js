import React, {Component} from 'react'
import AccountService from '../../services/AccountService'
import './Account.css'

//import BookedList from '../BookedList/BookedList'
//import HistoryList from '../HistoryList/HistoryList'

class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            id: AccountService.getId(),
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
       fetch('http://localhost:8081/users/'+this.state.id)
           .then(this.errorHandler)
           .then((result) => {
                   console.log(result)
                   this.setState({
                       isLoaded: true,
                       user: result
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
        const {isLoaded, error, user} = this.state
        return(
            <div className="wrapper">
                <div className="user_info__item">
                    <img className="user_img__item" src="https://cdn1.flamp.ru/6e8b1e5fe1cc01a4d15e1d27c602dfa7.jpg" alt='img'/>
                    <div className="user_name__item">{user.first_name}</div>
                </div>
                <div className="user_list__item">
                            
                            <div className="lists_wrapper__item">
                                   <fieldset>
                                    <input  type="radio" name="sizeBy" value="weight" id="sizeWeight" checked="checked" />
                                    <label id="bookedlist_controller__item" className="radio_button__item" for="sizeWeight">Booked tickets</label>
                                   
                                    <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions" />
                                    <label id="historylist_controller__item"className="radio_button__item" for="sizeDimensions">History</label>
                               
                                    <div id="booked_list__item">BookedList</div>
                                    <div id="history_list__item">HistoryList</div>
                                </fieldset>
                            </div>
                            
                </div>
                
            </div>
        )
    }
}

export default UserPage