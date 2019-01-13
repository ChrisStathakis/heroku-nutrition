import React, {Component} from 'react';
import {Segment, Grid, Header, Card, Button, Icon, Table } from 'semantic-ui-react';
import { SegmantHeader } from '../../GeneralComponents/MyCostumComponents';
import MyLoader from "../../MyLoader";
import {CategoryTableTr} from "./CategoryComponent";

class SecondGrid extends Component {

    handleSelectCategory = (id, title) => {
          this.props.handleSelectCategory(id, title)
    };

    render(){
        const {recipeCategories} = this.props;
        return (
            <Grid.Row>
                <Grid.Column >
                    <SegmantHeader title='Προσθήκη' icon='add' />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Επιλεξτε κατηγόρια</Table.HeaderCell>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                            <Table.Body>
                                    {recipeCategories? recipeCategories.map((recipe, index)=>(
                                        <CategoryTableTr
                                            recipe={recipe}
                                            index={index}
                                            key={index}
                                            handleSelectCategory={this.handleSelectCategory}
                                        />
                                    )) : <MyLoader/>}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default SecondGrid;