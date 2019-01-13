import React, {Component} from 'react';
import {Grid, Card, Label, Icon, List, Button} from 'semantic-ui-react';
import {SegmantHeader} from "../GeneralComponents/MyCostumComponents";


class InfoGrid extends Component {

    state = {
        error_messages:[],
        fields: {

        }
    };


    render() {
        const {user_data} = this.props;
        return (
             <Grid.Column  mobile={16} tablet={8} computer={8}>

                     <Card fluid>
                         <Card.Content>
                             <SegmantHeader title={user_data.tag_username} icon={'user'} />
                             <br />
                             <Card.Meta>
                                 <span className='date'>Φύλο: {user_data.tag_gender}</span>
                             </Card.Meta>
                             <Card.Description>
                                <List bulleted>
                                    <List.Item>Υψος {user_data.height} εκατοστα</List.Item>
                                    <List.Item>Βάρος {user_data.weight} κιλά</List.Item>
                                    <List.Item>
                                      Ανάλυση
                                      <List.List>
                                        <List.Item>BMI {user_data.bmi}</List.Item>
                                        <List.Item>BMR {user_data.bmr}</List.Item>
                                        <List.Item>PAL {user_data.pal}</List.Item>
                                      </List.List>
                                    </List.Item>
                                    <List.Item>Ηλικία {user_data.age}</List.Item>
                                  </List>
                             </Card.Description>
                         </Card.Content>
                         <Card.Content extra>
                              <Label color='green' size='large'><Icon name='exclamation circle' />{user_data.total_calories}<Label.Detail>Προτεινόμενες Θερμίδες</Label.Detail></Label>
                             <br /> <br />
                             <Button color='red' size='small' content='Αποσύνδεση' icon='log out' labelPosition='left' />
                         </Card.Content>
                     </Card>

             </Grid.Column>
        )
    }

}

export default InfoGrid;