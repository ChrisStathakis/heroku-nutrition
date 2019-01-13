import React from 'react';
import {Item, Button, Divider} from 'semantic-ui-react';

const DayItem = ({day, pickDay}) => {

    const handleDay = () => {pickDay(day.date)};
    return (
        <Item.Group relaxed>
            <Item>
                <Item.Content verticalAlign='middle'>
                    <Item.Header>{day.date} Θερμίδες {day.calories} cal</Item.Header>
                    <Item.Description>
                        Πρωτεϊνη {day.protein} gr <br />
                        Υδατάνθρακες {day.carbs} gr <br />
                        Λίπος {day.fat} gr <br />
                    </Item.Description>
                    <Item.Extra>
                    <Button
                        floated='right'
                        color='teal'
                        onClick={handleDay}
                    >Επιλογή</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
            <Divider />
        </Item.Group>
    )
};


export default DayItem;