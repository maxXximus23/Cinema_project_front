import React from 'react'
import { Link } from 'react-router-dom';
import SessionService from '../../../services/SessionService';
import BackButton from '../../backButton/BackButton';

class EditSession extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            session: props.location.session
        }
        
        this.confirmEdit = this.confirmEdit.bind(this);
    }

    confirmEdit(event){

    }
    render() {
        const session = this.state.session

        if (session==null)
            return <div><BackButton backPath={() => this.props.history.goBack()} /></div>

        return  (<div className="container">
                    <BackButton backPath={() => this.props.history.goBack()} />
                    <form onSubmit={this.confirmEdit}>
                        <input type="text" defaultValue={session.id} />
                        <input type="submit" value="Apply" />
                    </form>
                </div>)
    }
}

export default EditSession