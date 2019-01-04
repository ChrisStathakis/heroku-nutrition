import React from 'react';
import {Item, Button, Divider} from 'semantic-ui-react';

class DayItem extends React.Component {

    render() {
        const {day} = this.props;

        return (
            <Item.Group relaxed>
                <Item>
                    <Item.Content verticalAlign='middle'>
                    <Item.Header>{day.date} Θερμίδες {day.calories} cal</Item.Header>
                    <Item.Description>
                        Πρωτεϊνη  <br />
                        Υδατάνθρακες  <br />
                        Λίπος  <br />
                    </Item.Description>
                    <Item.Extra>
                    <Button floated='right' color='teal'>Επιλογή</Button>
                    </Item.Extra>
                    </Item.Content>
                </Item>
                <Divider />
            </Item.Group>
        )
    }
}

export default DayItem;