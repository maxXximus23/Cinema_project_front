import React from "react";

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailDirty: false,
            passwordDirty: false,
            emailError: 'This field is required',
            passwordError: 'This field is required',
            loginFailed: false
        }
    }

    loginCheck = async (event) => {
        event.preventDefault();
        if(!this.state.passwordDirty || !this.state.emailDirty){
            this.setState({emailDirty: true, passwordDirty: true})
            this.correctEmail();
            this.correctPassword();
        }
        else if(this.state.emailError==='' && this.state.passwordError===''){
            const login ={
                email: this.state.email,
                password: this.state.password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            };
            const response = await fetch(`http://localhost:8081/auth/login`, requestOptions);

            if(response.status===200){
                this.props.history.push('/')
            }
            else{
                this.setState({loginFailed: true});
            }
        }

    }
    closeButton = () =>{
        this.setState({loginFailed: false});
    }
    blurHandler = (e) =>{
        // eslint-disable-next-line default-case
        switch (e.target.name){
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
    correctPassword = () => {
        if ((this.state.password) === '')
            this.setState({passwordError:'This field is required'})
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

    render() {
        return(
            <div className="login_block">
                <form  onSubmit={this.loginCheck} >

                    <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        {(this.state.loginFailed) && <a style={{color: 'red'}}> Incorrect username or password
                            <button onClick={this.closeButton} className="btn-close" aria-label="Close"/>
                        </a>}
                    </div>
                    <h1  className="h3 mb-3 fw-normal">Please sign in</h1>
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
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default LoginForm;