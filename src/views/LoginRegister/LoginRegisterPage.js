import React from 'react';
import { withRouter} from 'react-router-dom';
import { AUTH_ENDPOINT, REGISTER_USER_ENDPOINT, USER_DATA_ENDPOINT } from '../../helpers/endpoints';
import { lookupOptionsPOSTNoToken, lookupOptionIncludeToken } from '../../helpers/functions_helpers';
import LoginForm from '../../components/LoginRegister/LoginForm';
import RegisterForm from '../../components/LoginRegister/RegisterForm';


class LoginRegisterPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: '',
            username:'',
            password: '',
            registerForm: false,
            email:'',
            register_username: '',
            register_password: '',
            register_password_1: '',
            message: ''
        }
    }

    changeInput = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    changeForm = () => {
        this.setState({
            username: '',
            password: '',
            registerForm: !this.state.registerForm
        })
    };

    onLogin = () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(AUTH_ENDPOINT, lookupOptionsPOSTNoToken(data))
        .then(resp => resp.json())
        .then(respData =>{
            if (respData.token !== undefined) {
                localStorage.setItem('token', respData.token);
                fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(respData.token))
                .then(resp=>resp.json()).then(respD=>{
                    localStorage.setItem('profile_id', respD.profile_id)
                    setInterval(this.props.history.push('/'), 2000);
                })
                
            } else {
                this.setState({
                    message: 'The credentials is invalid. Please try again'
                })
            }
            
        })
    };

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log('login', token)
        if ( token !== null){
            if (token !== 'undefined') {
                this.props.history.push('/')
            }
        }
    }

    render() {
        const registerForm = this.state.registerForm;
        return (
            <div className='login-form'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                {registerForm ? 
                <RegisterForm
                    changeForm={this.changeForm}
                    changeInput={this.changeInput}
                /> 
                : <LoginForm
                    changeForm={this.changeForm}
                    changeInput={this.changeInput}
                    username={this.state.username}
                    password={this.state.password}
                    onLogin={this.onLogin}
                    
                />
                }
            </div>
        )
    }
}








export default withRouter(LoginRegisterPage);