import React from 'react';
import {Segment, Grid, Table, Button, Header} from 'semantic-ui-react';

class ListGrid extends React.Component {

    toggleEdit = (recipe) => {
        this.props.toggleEdit(recipe)
    };

    render() {
        const {recipes} = this.props;
        return (
            <Segment>
                <Header
                    as='h4'
                    color='blue'
                    content='Λίστα Συνταγών' attached='top' textAlign='center' inverted
                />
                <br />
                <Grid container>
                    <Grid.Row>
                        <Grid.Column>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Συνταγή</Table.HeaderCell>
                                        <Table.HeaderCell>Θερμίδες</Table.HeaderCell>
                                        <Table.HeaderCell>Πρωτεϊνη</Table.HeaderCell>
                                        <Table.HeaderCell>Υδατάνθρακες</Table.HeaderCell>
                                        <Table.HeaderCell>Λίπος</Table.HeaderCell>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {recipes.map((recipe, index)=>(
                                    <RecipeTableDetail 
                                        key={index} 
                                        recipe={recipe}
                                        index={index}
                                        toggleEdit={this.toggleEdit}
                                    />
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}


class RecipeTableDetail extends React.Component {

    toggleEdit = () => {
        this.props.toggleEdit(this.props.recipe)
    };

    render(){
        const {recipe, index} = this.props;
        return (
            <Table.Row>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{recipe.title}</Table.Cell>
                <Table.Cell>{recipe.calories}</Table.Cell>
                <Table.Cell>{recipe.protein}</Table.Cell>
                <Table.Cell>{recipe.carbs}</Table.Cell>
                <Table.Cell>{recipe.fat}</Table.Cell>
                <Table.Cell><Button color='blue' onClick={this.toggleEdit} icon='edit' /></Table.Cell>
            </Table.Row>
        )
    }
}

export default ListGrid;