import React from 'react';
import { Grid, Column, Card, Button, Header, Icon, Container, Image, Form} from 'semantic-ui-react';
import {USER_DATA_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";
import Navbar from '../../components/Navbar';


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class UserPage extends  React.Component {


    state = {
        token: localStorage.getItem('item'),
        doneLoading:false,
        user_data:[]
    }

    getUser(token){
        const thisComp = this;
        console.log(USER_DATA_ENDPOINT);
        fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>{thisComp.setState({user_data:respData, doneLoading:true})})
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getUser(token)
    }
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        const { value } = this.state
        const {user_data, doneLoading} = this.state;
        console.log('user_data', user_data);
        return (
            <div>
                <Navbar />
                <Container style={{ marginTop: '7em' }}>
                    <Header as='h2' icon textAlign='center'>
                        <Icon color='teal' name='user' circular />
                        <Header.Content>{user_data.tag_username}</Header.Content>
                    </Header>
                    <Grid>
                        <Grid.Column  mobile={16} tablet={8} computer={8}>
                            <Card>
                                <Image src='/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>Matthew</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in 2015</span>
                                    </Card.Meta>
                                    <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user' />
                                        22 Friends
                                    </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={8}>
                             <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
        <Form.Group inline>
          <label>Size</label>
          <Form.Radio
            label='Small'
            value='sm'
            checked={value === 'sm'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Medium'
            value='md'
            checked={value === 'md'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='Large'
            value='lg'
            checked={value === 'lg'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Form.Button>Submit</Form.Button>
      </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default UserPage;