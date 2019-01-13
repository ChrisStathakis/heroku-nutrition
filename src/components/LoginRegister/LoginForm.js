import React from "react";
import {Form, Message, Button, Grid, Header, Segment, Image} from 'semantic-ui-react';


class LoginForm extends React.Component {

    changeInput = (event) =>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.props.changeInput(name, value)
    };

    onLogin = (event) => {
        event.preventDefault();
        this.props.onLogin()
    };

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

export default LoginForm