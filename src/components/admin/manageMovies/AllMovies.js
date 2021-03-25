import React from "react";
import ActiveMovies from "./ActiveMovies";
import BlockedMovies from "./BlockedMovies";
import BackButton from "../../backButton/BackButton";
import './ManageMovies.css'

class AllMovies extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="user_list__item">
                <div className="lists_wrapper__item">
                    <div className="button-box">
                        <BackButton backPath={() => this.props.history.goBack()} />
                        <button onClick={()=>window.location.replace("/create-movie/")} className="create-button">Create</button>
                    </div>
                    <fieldset>
                        <input type="radio" name="sizeBy" value="weight" id="sizeWeight" checked="checked"/>
                        <label id="bookedlist_controller__item" className="radio_button__item" htmlFor="sizeWeight">
                            Active movies
                        </label>

                        <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions"/>
                        <label id="historylist_controller__item" className="radio_button__item"
                               htmlFor="sizeDimensions">Blocked movies</label>

                        <div id="booked_list__item">
                            <ActiveMovies/>
                        </div>
                        <div id="history_list__item">
                            <BlockedMovies/>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}
export default AllMovies;