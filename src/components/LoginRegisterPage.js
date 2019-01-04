import React from 'react';
import {connect} from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { AUTH_ENDPOINT } from '../helpers/endpoints';
import { lookupOptionsPOSTNoToken } from '../helpers/functions_helpers';
import { fetchUserDataIfNeeded, fetchLoginUser } from '../redux/actions/authActions.js';

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
    }

    changeForm = () => {
        this.setState({
            username: '',
            password: '',
            registerForm: !this.state.registerForm
        })
    }

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
                this.props.history.push('/')
            } else {
                this.setState({
                    message: 'The credentials is invalid. Please try again'
                })
            }
            
        })
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log('token', token)
        if ( token !== null){
            if (token !== 'undefined') {
                this.props.history.push('/')
            }
        }
    }

    render() {

        console.log('my profile', this.props.profile_data)
        const registerForm = this.state.registerForm
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

class LoginForm extends React.Component {

    changeInput = (event) =>{
        event.preventDefault();
        const name = event.target.name
        const value = event.target.value
        this.props.changeInput(name, value)
    }

    onLogin = (event) => {
        event.preventDefault();
        this.props.onLogin()
    }
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input 
                        onChange={this.changeInput} 
                        name='username' 
                        value={this.props.username} 
                        fluid icon='user'
                        iconPosition='left' 
                        placeholder='Username'
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={this.props.password}
                        onChange={this.changeInput}
                    />
        
                    <Button onClick={this.onLogin} color='teal' fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a onClick={this.props.changeForm} href='#'>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>
    
        )
    }
}

class RegisterForm extends React.Component {

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Register
          </Header>
          <Form size='large'>
            <Segment stacked>
                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Repeat Password'
                    type='password'
                />
  
              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a onClick={this.props.changeForm} href='#'>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
        )
    }
}




export default withRouter(LoginRegisterPage);