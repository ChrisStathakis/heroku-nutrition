import React from 'react';
import {Segment, Grid, Header, Card, Button, Icon, Input} from 'semantic-ui-react'
import {
    RECIPE_LIST_ENDPOINT,
    RECIPE_CATEGORY_LIST_ENDPOINT, TAG_LIST_ENDPOINT
} from "../../helpers/endpoints";
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";


class HomepageNewRecipe extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            recipe_categories:{},
            doneLoading: false,

            tag_categories: {},
            doneTagLoading: false,

            chooseRecipeCategory:{
                toggle: false,
                id: '',
                title:''
            },

            chooseRecipe: {
                recipes: {},
                doneLoadingRecipes: false,
                recipe: {},
                toggle_recipe: false,
                qty:1
            }
        }
    }

    getCategories(token){
        const thisComp = this;
        const endpoint = RECIPE_CATEGORY_LIST_ENDPOINT + '?active=true';
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.setState({
                    recipe_categories: respData,
                    doneLoading:true
                })
            })
    }

    getTag(token){
        const thisComp = this;
        fetch(TAG_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.setState({
                    tag_categories: respData,
                    doneTagLoading:true
                })
            })
    }

    getRecipes(token, id) {
        const endpoint = RECIPE_LIST_ENDPOINT + '?category='+id+'&active=true';
        const thisComp = this;
        console.log('endpoint', endpoint)
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData=>{
                thisComp.setState({
                    chooseRecipe:{
                        recipes:respData,
                        doneLoadingRecipes:true
                    }
                })
            })
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getCategories(token);
        this.getTag(token)
    }

    onChooseRecipeCategory = (title, id) => {
        const new_data = Object.assign({}, this.state.chooseRecipeCategory, {
            toggle: !this.state.chooseRecipeCategory.toggle,
            title: title,
                id: id
        });
        this.setState({
            chooseRecipeCategory: new_data
        });
        this.getRecipes(this.state.token,id)
    };

    pickRecipe = (id, qty) => {
        this.props.pickRecipe(id, this.state.chooseRecipeCategory.id, qty)
    };


    render() {
        const {recipe_categories} = this.state;
        const {chooseRecipeCategory} = this.state;
        const {recipes, doneLoadingRecipes} = this.state.chooseRecipe;
        console.log('recipes_cate', recipe_categories);
        return(
            <Segment>
                <Header
                    as='h4'
                    color='blue'
                    content='Νέα Εισαγωγή' attached='top' textAlign='center' inverted
                />
                <br />
                <Grid container>
                    <Grid.Row>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Header as='h4' icon textAlign='center'>
                                <Icon name='edit' circular />
                                <Header.Content>Κατηγορια</Header.Content>
                            </Header>
                            <Segment>
                                {chooseRecipeCategory.toggle ?
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                {chooseRecipeCategory.title}
                                                </Card.Header>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button
                                                onClick={this.onChooseRecipeCategory}
                                                basic color='red'>Καθαρισμός
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                    :
                                    <Card.Group>
                                    {recipe_categories.length >0 ?
                                        recipe_categories.map((category, index)=>(
                                            <RecipeCategoryCardGroup
                                                key={index}
                                                category={category}
                                                onChooseRecipeCategory={this.onChooseRecipeCategory}
                                            />
                                         ))
                                        :<p>No data</p>
                                    }
                                    </Card.Group>
                                    }
                            </Segment>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={12}>

                            <Header as='h4' icon textAlign='center'>
                                <Icon name='edit' circular />
                                <Header.Content>Συνταγές</Header.Content>
                            </Header>
                            <Segment>
                                {this.state.chooseRecipeCategory.toggle ?
                                    <Card.Group>
                                        {doneLoadingRecipes ? recipes.map((recipe, index)=>(
                                            <RecipeCard key={index}
                                                        recipe={recipe}
                                                        pickRecipe={this.pickRecipe}
                                            />
                                            )):
                                            <p>No data</p>
                                        }</Card.Group>
                                    :<Button color='red' onClick={this.props.changeToggleRecipe} content='Κλείσιμο' />}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                </Grid>
            </Segment>

        )
    }
}


class RecipeCategoryCardGroup extends React.Component {

    onChooseRecipeCategory = () =>{
        this.props.onChooseRecipeCategory(this.props.category.title, this.props.category.id)
    };

    render() {
        const {category} = this.props;
        return (
            <Card>
                <Card.Content> <Card.Header>{category.title}</Card.Header></Card.Content>
                <Card.Content extra>
                    <Button onClick={this.onChooseRecipeCategory} basic color='green'>
                        Επιλογή
                    </Button>
                </Card.Content>
            </Card>
        )
    }
}

class RecipeCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            qty:1
        }
    }

    pickRecipe = () => {
        this.props.pickRecipe(this.props.recipe.id, this.state.qty)
    };

    changeQty = (event) => {
        event.preventDefault();
        const value = event.target.value;
        this.setState({
            qty:value
        })
    };


    render() {
        const {recipe} = this.props;
        return (
            <Card color='teal' centered >
                <Card.Content>
                    <Card.Header>{recipe.title}</Card.Header>
                    <Card.Meta>Θερμίδες {recipe.calories}</Card.Meta>
                    <Card.Description>
                        Πρωτεϊνές {recipe.protein} ,Υδατάνθρακες {recipe.carbs}, Λιπαρά {recipe.fat}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Input
                        centered
                        type='number'
                        value={this.state.qty}
                        width={2}
                        size='mini'
                        onChange={this.changeQty}

                      />
                    <Button onClick={this.pickRecipe} color='teal' icon='plus' content='Προσθήκη'/>

                </Card.Content>
            </Card>
        )
    }
}

export default HomepageNewRecipe;