import React, {Component } from 'react';
import {Card, Button, List, Input, Table} from 'semantic-ui-react';
import {CALENDAR_ITEM_DETAIL_ENDPOINT} from "../../../helpers/endpoints";
import {lookupOptionDELETE, lookupOptionPUT} from "../../../helpers/functions_helpers";



export const CategoryCard =({category, chooseCalendarCategory}) => {

    const handleCategory = () => {chooseCalendarCategory(category.id)};
    return (
        <Card>
            <Card.Content>
                <Card.Header>{category.tag_category_related}</Card.Header>
                <Card.Meta>Ανάλυση</Card.Meta>
                <Card.Description>
                    Συνολικές Θερμίδες <strong>{category.calories} cal</strong>
                    <List>
                        <List.Item>Πρωτεϊνη {category.protein} gr</List.Item>
                        <List.Item>Υδατάνθρακες {category.carbs} gr</List.Item>
                        <List.Item>Λίπος {category.fat} gr</List.Item>
                    </List>
                </Card.Description>

            </Card.Content>
            <Card.Content extra>
                <Button onClick={handleCategory} basic color='teal'>Επεξεργασια</Button>
            </Card.Content>
        </Card>
    )
};


export class CalendarCategoryData extends Component {

    state = {fields: {}};



    componentWillMount() {
        const {item} = this.props;
        this.setState({fields:item})
    }


    handleQty = (e) => {
        e.preventDefault();
        const new_data = Object.assign({}, this.state.fields, {qty:e.target.value});
        this.setState({fields:new_data})
    };

    handleEdit =(e) => {
        const endpoint = CALENDAR_ITEM_DETAIL_ENDPOINT + this.props.item.id  + '/';
        const thisComp = this;
        fetch(endpoint, lookupOptionPUT(localStorage.getItem('token'), this.state.fields))
            .then(resp=>resp.json()).then(respData=>thisComp.props.reloadPage())
    };

    handleDelete = () => {
        const endpoint = CALENDAR_ITEM_DETAIL_ENDPOINT + this.props.item.id  + '/';
        const thisComp = this;
        fetch(endpoint, lookupOptionDELETE(localStorage.getItem('token')))
            .then(thisComp.props.reloadPage())
    };


    render() {
        const {item} = this.props;
        const {fields} = this.state;
        return (
            <Table.Row>
                <Table.Cell>{item.tag_recipe_related}</Table.Cell>
                <Table.Cell>{item.calories} cal</Table.Cell>
                <Table.Cell>{item.protein} gr</Table.Cell>
                <Table.Cell>{item.carbs} gr</Table.Cell>
                <Table.Cell>{item.fat} gr</Table.Cell>
                <Table.Cell><Input onChange={this.handleQty} type='number' value={fields.qty} /></Table.Cell>
                <Table.Cell>
                    <Button.Group>
                        <Button onClick={this.handleDelete} color='red' icon='delete' />
                        <Button.Or size='small' />
                        <Button onClick={this.handleEdit} color='blue' icon='edit' />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        )
    }
}

