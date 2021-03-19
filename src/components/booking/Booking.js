import React from 'react'
import './style.css'
import ErrorComponent from '../error/ErrorComponent';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            places: {
                sessionId: Number,
                rowsAmount: Number,
                place: Number,
                tickets: []
            },
            id: props.match.params.sessionId,
            selectedTickets: []
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.book = this.book.bind(this);
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
        fetch('http://localhost:8081/sessions/' + this.state.id + "/tickets")
            .then(this.errorHandler)
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        places: result
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
        const { error, isLoaded, places } = this.state;
        if (error) {
            return <ErrorComponent error={error} />;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const seats = [,]
        
            for (let i = places.rowsAmount - 1; i >= 0; i--){
                let item = {key: Number, values: []}
                item.key = i
                for (let j = 0; j < places.place; j++){
                    const enabled = places.tickets.findIndex(el =>{
                        return el.row == i+1 && el.place == j+1
                    }) != -1;

                    item.values.push(
                        <div key={j}>
                            <label>
                                <input type="checkbox" onChange={this.onValueChange} name={(i+1) + "_" + (j+1)} disabled={enabled}/>
                                <img src="https://img.icons8.com/windows/50/000000/armchair.png" title={"Row: " + (i+1) + "\nPlace: " + (j+1)} className="seat"/>
                            </label>
                        </div>
                    )
                }
                seats.push(item)
            }
                    
            return (
                <div className="container hallDemo">
                    <form onSubmit={this.book}>
                       <div className="row justify-content-center">

                            {
                                seats.map(el =>{
                                    return  <div key={el.key} className="d-flex justify-content-around col-md-12">
                                                <div className="row-number text-center">{el.key + 1}</div>
                                                {el.values}
                                                <div className="row-number text-center">{el.key + 1}</div>
                                            </div>
                                })
                            }
                        </div>
                        <div className="screen">
                            <h2>SCREEN</h2>
                        </div>
                        <button className="bookTicketsBtn" type="submit">
                            Book tickets
                        </button>
                    </form>
                </div>
            );
        }
    }

    book(event) { //TODO: Add real user data in request
        event.preventDefault();

        let data = {
            sessionId: this.state.id,
            userId: -1,
            places: this.state.selectedTickets
        }

        fetch('http://localhost:8081/tickets/purchaselist',
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
                console.log(result) //TODO: redirect to tickets
        })
        .catch(err => {
            this.setState({
                isLoaded: true,
                error: err
            })
        })
    }

    onValueChange(event) {
        const { selectedTickets } = this.state
        let place = event.target.getAttribute("name").split("_");

        if (event.target.checked)
        {
            const index = selectedTickets.findIndex(el =>{
                return el.row == place[0] && el.place == place[1]
            });

            if (index == -1)
                selectedTickets.push({
                    row: place[0],
                    place: place[1]
                })
        }
        else
        {
            const index = selectedTickets.findIndex(el =>{
                return el.row == place[0] && el.place == place[1]
            });
            if (index > -1) {
                selectedTickets.splice(index, 1);
            }
        }

    }
}

export default Booking;