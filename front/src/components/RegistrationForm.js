import React from "react";

class RegistrationForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            firstNameDirty: false,
            lastNameDirty: false,
            emailDirty: false,
            passwordDirty: false,
            firstNameError: 'This field is required',
            lastNameError: 'This field is required',
            emailError: 'This field is required',
            passwordError: 'This field is required',
            registrationFailed: false
        }

    }
    addNewUser = async (event) => {
        event.preventDefault();
        if(!this.state.passwordDirty || !this.state.emailDirty || !this.state.lastNameDirty || !this.state.firstNameDirty){
            this.setState({emailDirty: true, passwordDirty: true, firstNameDirty: true, lastNameDirty: true})
            this.correctEmail();
            this.correctPassword();
            this.correctLastName();
            this.correctFirstName();
        }
        else if(this.state.emailError==='' && this.state.passwordError==='' && this.state.firstNameError==='' && this.state.lastNameError===''){
            const newUser ={
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            };
            const response = await fetch('http://localhost:8081/auth/register', requestOptions);
            if(response.status===200)
                this.props.history.push('/')
            else
                this.setState({registrationFailed: true});
        }
    }
    #closeButton = () =>{
        this.setState({loginFailed: false});
    }
    blurHandler = (e) =>{
        // eslint-disable-next-line default-case
        switch (e.target.name){
            case 'firstName':
                this.setState({firstNameDirty:true})
                break
            case 'lastName':
                this.setState({lastNameDirty:true})
                break
            case 'email':
                this.setState({emailDirty:true})
                break
            case 'password':
                this.setState({passwordDirty:true})
                break
        }
    };
    changeHandler = (e) =>{
        // eslint-disable-next-line default-case
        switch (e.target.name){
            case 'firstName':
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.firstName=e.target.value;
                this.correctFirstName()
                break
            case 'lastName':
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.lastName=e.target.value;
                this.correctLastName()
                break
            case 'email':
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.email=e.target.value;
                this.correctEmail()
                break
            case 'password':
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.password=e.target.value;
                this.correctPassword()
                break
        }
    };
    correctFirstName = () => {
        const re =/^([A-zА-яЁё]{3,})$/
        if ((this.state.firstName) === '')
            this.setState({firstNameError:'This field is required'})
        else if(this.state.firstName.length<3)
            this.setState({firstNameError:'The first name cannot be shorter than 3 characters'})
        else if(!re.test(String(this.state.firstName)))
            this.setState({firstNameError:'The first name should include only letters'})
        else
            this.setState({firstNameError:''})
    };
    correctLastName = () => {
        const re =/^([A-zА-яЁё]{3,})$/
        if ((this.state.lastName) === '')
            this.setState({lastNameError:'This field is required'})
        else if(this.state.lastName.length<3)
            this.setState({lastNameError:'The last name cannot be shorter than 3 characters'})
        else if(!re.test(String(this.state.lastName)))
            this.setState({lastNameError:'The last name should include only letters'})
        else
            this.setState({lastNameError:''})
    };
    correctPassword = () => {
        const re =/^([a-zA-Z0-9]{8,})$/
        if ((this.state.password) === '')
            this.setState({passwordError:'This field is required'})
        else if(this.state.password.length<8)
            this.setState({passwordError:'The password cannot be shorter than 8 characters'})
        else if(!re.test(String(this.state.password)))
            this.setState({passwordError:'The password should include only letters or numbers'})
        else
            this.setState({passwordError:''})
    };
    correctEmail=()=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!this.state.email)
            this.setState({emailError:'This field is required'})
        else if(!re.test(String(this.state.email).toLowerCase()))
            this.setState({emailError:'Incorrect email'})
        else
            this.setState({emailError:''})
    };
    closeButton = () =>{
        this.setState({registrationFailed: false});
    }

    render() {
        return(
            <div className="login_block">
                <form  onSubmit={this.addNewUser} >
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {(this.state.registrationFailed) && <a style={{color: 'red'}}>An unknown error occurred
                            <button onClick={this.#closeButton} className="btn-close" aria-label="Close"/>
                        </a>}
                    </div>
                    <h1  className="h3 mb-3 fw-normal">Register</h1>
                    <div>
                        <input type="text" name="firstName" value={this.firstName} onChange={e =>this.changeHandler(e)} onBlur={e => this.blurHandler(e)} className="form-control" placeholder="First name"
                               required="" autoFocus=""/>
                        {(this.state.firstNameDirty && this.state.firstNameError) && <div style={{color: 'red'}}>{this.state.firstNameError}</div>}
                    </div>
                    <div>
                        <input type="text" name="lastName" value={this.lastName} onChange={e =>this.changeHandler(e)} onBlur={e => this.blurHandler(e)} className="form-control" placeholder="Last name"
                               required="" autoFocus=""/>
                        {(this.state.lastNameDirty && this.state.lastNameError) && <div style={{color: 'red'}}>{this.state.lastNameError}</div>}
                    </div>
                    <div>
                        <input onChange={e => this.changeHandler(e)} value={this.email} onBlur={e => this.blurHandler(e)} type="text" name="email" className="form-control" placeholder="Email address"
                               required="" autoFocus=""/>
                        {(this.state.emailDirty && this.state.emailError) && <div style={{color: 'red'}}>{this.state.emailError}</div>}
                    </div>
                    <div>
                        <input onChange={e => this.changeHandler(e)} value={this.password} onBlur={e => this.blurHandler(e)}  type="password" name="password" className="form-control"
                               placeholder="Password" required=""/>
                        {(this.state.passwordDirty && this.state.passwordError) && <div style={{color: 'red'}}>{this.state.passwordError}</div>}
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/>
                            Remember me
                        </label>
                    </div>
                    <div>
                        <a href="/">Forgot your password?</a>
                    </div>
                    <div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default RegistrationForm;