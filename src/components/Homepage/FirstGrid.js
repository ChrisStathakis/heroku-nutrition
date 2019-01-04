import React from 'react';
import {withRouter} from 'react-router';
import { Grid, Card, Button, Header, Icon, List, Segment, Divider, Responsive} from 'semantic-ui-react'

class FirstGrid extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            today_data: {},
            today_categories:{}

        }

    }

    clickUserUrl = () => this.props.history.push('/user/');

    render(){
        const profile_data = this.props.profile_data;
        return (
            <Segment placeholder>
            <Responsive>
            <Header as='h4' color='blue' icon='user' content='Πληροφορίες Χρήστη' attached='top' textAlign='center' inverted/>
            <br />
            <Grid container>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Header as='h2'>
                            <Icon name='user circle' />
                            <Header.Content>Στοιχεία Χρήστη</Header.Content>
                        </Header>
                        <Card>
                            <Card.Content>
                                <Card.Header>{profile_data.tag_username}</Card.Header>
                                <Card.Meta>{profile_data.tag_gender}</Card.Meta>
                                <Card.Description>
                                    Υψος <strong>{profile_data.height} cm</strong><br></br>
                                    Βάρος <strong>{profile_data.weight} kg </strong><br></br>
                                    Ηλικία <strong>{profile_data.age} year old</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button onClick={this.clickUserUrl} basic color='green'>
                                    Επεξεργασία
                                </Button>
                                <Button basic color='red'>
                                    Αποσύνδεση
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Header as='h2'>
                            <Icon name='magic' color='green' />
                            <Header.Content>Επεξεργασμένα Δεδομένα</Header.Content>
                        </Header>
                        <Card>
                            <Card.Content>
                                <Card.Header>{profile_data.tag_username}</Card.Header>
                                <Card.Meta>{profile_data.tag_gender}</Card.Meta>
                                <Card.Description>
                                <List animated verticalAlign='middle'>
                                        <List.Item>
                                            <Icon name='angle double right' />
                                            <List.Content>
                                                <List.Header>Hμερήσιες Θερμίδες... {profile_data.total_calories}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='angle double right' />
                                            <List.Content>
                                                <List.Header>BMI... {profile_data.bmi}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='angle double right' />
                                            <List.Content>
                                                <List.Header>BMR... {profile_data.bmr}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='angle double right' />
                                            <List.Content>
                                                <List.Header>PAL... {profile_data.pal}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green'>
                                    Επεξεργασία
                                </Button>
                                <Button basic color='red'>
                                    Αποσύνδεση
                                </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Responsive>
            </Segment>
        )
    }
}

export default withRouter(FirstGrid);