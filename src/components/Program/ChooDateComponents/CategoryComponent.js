import React, {Component, PropTypes} from 'react';
import {Table, Button, Form } from 'semantic-ui-react';
import {Card, Image, List} from 'semantic-ui-react';


export const CategoryTableTr = ({recipe, handleSelectCategory, index }) => {

    const handleSelect = () => {handleSelectCategory(recipe.id, recipe.title)};
    return (
        <Table.Row key={index}>
            <Table.Cell>{index}</Table.Cell>
            <Table.Cell>{recipe.title}</Table.Cell>
            <Table.Cell><Button  onClick={handleSelect} icon='add' /></Table.Cell>
        </Table.Row>
    )
};

export class RecipeCard extends Component {

    state = {toggleForm: false, qty: 1};

    handleToggleForm = () => this.setState({toggleForm:!this.state.toggleForm});
    handleQtyInput = (event) => {event.preventDefault(); this.setState({qty:event.target.value})};
    addRecipe = () => {this.props.addRecipe(this.props.recipe.id, this.state.qty)};

    render() {
        const {recipe} =this.props;

        return (
            <Card>
              <Card.Content>
                <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
                <Card.Header>{recipe.title}</Card.Header>
                <Card.Meta>{recipe.tag_category}</Card.Meta>
                <Card.Description>
                    <List as='ul'>
                        <List.Item as='li'>
                            Θερμίδες {recipe.calories} cal
                            <List.List as='ul'>
                                <List.Item as='li'>Πρωτεϊνη {recipe.protein} gr
                                </List.Item>
                                <List.Item as='li'>Υδατάνθρακες {recipe.carbs} gr</List.Item>
                                <List.Item as='li'>Λίπος {recipe.fat} gr</List.Item>
                            </List.List>
                        </List.Item>
                    </List>
                </Card.Description>
                </Card.Content>
                <Card.Content>
                    {this.state.toggleForm ?
                        <Form>
                            <Form.Group inline>
                                <Form.Input onChange={this.handleQtyInput} type='number'value={this.state.qty} />
                                <Form.Button color='green' icon='add' onClick={this.addRecipe} />
                            </Form.Group>
                        </Form>
                    :
                    <div className='ui two buttons'>
                      <Button onClick={this.addRecipe} basic color='green'>
                        Επιλόγη
                      </Button>
                      <Button onClick={this.handleToggleForm} basic color='blue'>
                        Ποσότητα
                      </Button>
                    </div>
                    }

              </Card.Content>
            </Card>
        )
    }

}



