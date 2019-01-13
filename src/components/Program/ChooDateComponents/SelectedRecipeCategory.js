import React, {Component} from 'react';
import {Grid, Card, Segment, Button, Input } from 'semantic-ui-react';
import {SegmantHeader} from "../../GeneralComponents/MyCostumComponents";
import {RecipeCard} from "./CategoryComponent";


class SelectedRecipeCategory extends Component {

    handleCloseCategory = () => this.props.closeCategory();
    addRecipe = (recipe_id, qty) => {this.props.addRecipe(recipe_id, qty)};

    render() {
        const {recipes, category} = this.props;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16} >
                    <Segment>
                        <SegmantHeader title={category} />
                        <br />
                        <Button onClick={this.handleCloseCategory} color='red' content='Επιστροφή' />
                        <Input type='text' placeholder='Αναζήτηση' />
                    </Segment>
                    </Grid.Column>
                    <br />
                    <Grid.Column mobile={16} tablet={16} computer={16} >
                        <Segment>
                        <Card.Group>{recipes.map((recipe, index)=>(<RecipeCard recipe={recipe} key={index} addRecipe={this.addRecipe} />))}</Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }

}

export default SelectedRecipeCategory;