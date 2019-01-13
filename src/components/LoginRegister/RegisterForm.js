import React from "react";
import {withRouter} from 'react-router';
import {Grid, Header, Image, Form, Segment, Button, Message } from 'semantic-ui-react';
import {lookupOptionIncludeToken, lookupOptionsPOSTNoToken} from "../../helpers/functions_helpers";
import {REGISTER_USER_ENDPOINT, USER_DATA_ENDPOINT} from "../../helpers/endpoints";
import {ErrorMessage} from '../../components/GeneralComponents/ErrorMessagesForm';


class RegisterForm extends React.Component {

    state = {
        error_messages: false,
        fields: {
            username: '',
            password1: '',
            password2: '',
            email: ''
        }
    };

    checkErrors(fields) {
        var error_messages = [];
        if (fields.password1 === '') {
            error_messages = [...error_messages, 'Συμπληρώστε το Password']
        } else if ( fields.password2 === '') {
            error_messages = [...error_messages, 'Συμπληρώστε το επαναληπτικό Password']
        } else if ( fields.password1 !== fields.password2) {
            error_messages = [...error_messages, 'Τα password δε ταιριάζουν.']
        }
        if (fields.username === '') {
            error_messages = [...error_messages, 'Συμπληρώστε το Username.']
        }
        if (fields.email === '') {
            error_messages = [...error_messages, 'Συμπληρώστε το Email.']
        } else if ( fields.email.indexOf('@') <= -1) {
            error_messages = [...error_messages, 'Δεν συμπληρώσατε το email σώστα.']
        }
        return error_messages
    }

    submitForm = (event) => {
        event.preventDefault();
        const {fields} = this.state;
        const thisComp = this;
        const error_messages = this.checkErrors(fields);
        if (error_messages.length > 0) {
            this.setState({
                error_messages: error_messages
            })
        } else {
            fetch(REGISTER_USER_ENDPOINT, lookupOptionsPOSTNoToken(fields))
                .then(resp=> resp.json())
                .then(respData =>{
                    console.log('register response data', respData);
                    if (respData['key'] !== undefined) {
                        localStorage.setItem('token', respData['key']);
                        fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(respData.token))
                            .then(resp=>resp.json()).then(respD=>{
                                localStorage.setItem('profile_id', respD.profile_id)
                                setInterval(this.props.history.push('/user/'), 2000);
                            });
                    } else {
                        console.log('errors', respData)
                    }
                })

        }

    };

    handleInput =(event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const new_fields = Object.assign({}, this.state.fields, {[name]:value})
        this.setState({
            fields: new_fields,
            error_messages: false
        });
        console.log('value', value)
    };

    render() {
        const { fields, error_messages} = this.state;
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Register
          </Header>
          <Form size='large'>
            <Segment stacked>
                <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name='email'
                    value={fields.email}
                    onChange={this.handleInput}
                    />
                <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    name='username'
                    value={fields.username}
                    onChange={this.handleInput}
                     />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password1'
                    value={fields.password1}
                    onChange={this.handleInput}
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Repeat Password'
                    type='password'
                    name='password2'
                    value={fields.password2}
                    onChange={this.handleInput}
                />

              <Button onClick={this.submitForm} color='teal' fluid size='large'>
                Register
              </Button>
            </Segment>
          </Form>
          {error_messages ?<ErrorMessage error_messages={error_messages} /> : <br />}
          <Message>
            New to us? <a onClick={this.props.changeForm} href='#'>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
        )
    }
}

export default withRouter(RegisterForm);