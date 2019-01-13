import React from 'react';
import {Container, Segment, Sidebar} from 'semantic-ui-react';
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";
import {RECIPE_CATEGORY_LIST_ENDPOINT, RECIPE_LIST_ENDPOINT} from "../../helpers/endpoints";
import Navbar from '../../components/Navbar';
import SideMenu from '../../components/GeneralComponents/SideMenu';
import ListGrid from '../../components/Recipe/FirstGrid';
import EditRecipePage from './FormComponents/EditRecipeForm';
import NewRecipeForm from "./FormComponents/NewRecipeForm";




class RecipesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            visible:false,
            toggleNewPage:false,
            toggleEditPage:false,
            recipes: {},
            doneLoadingRecipes: false,
            recipesCategories: {},
            doneLoadingRecipesCategories: false,

            toggleEdit:false,
            recipe: false,
            toggleNew: false
        }
    }

    getInitialData(token){
        const thisComp = this;
        fetch(RECIPE_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData =>{thisComp.setState({recipes:respData, doneLoadingRecipes:true})});
        fetch(RECIPE_CATEGORY_LIST_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>{
                thisComp.setState({recipesCategories:respData, doneLoadingRecipesCategories: true})
        })
    }

    toggleEditButton = (recipe) => {
        console.log('button pressed!')
        this.setState({recipe: recipe, toggleNew: false, toggleEdit: !this.state.toggleEdit});
    };

    toggleNewButton = () => {
        this.setState({
            toggleEdit: false,
            toggleNew: !this.state.toggleNew,
            recipe:{}
        })
    };

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getInitialData(token)
    }

    reloadPage = () => {this.componentDidMount()};
    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render(){
        const {doneLoadingRecipesCategories, recipesCategories, toggleNew, toggleEdit} = this.state;
        const {recipes, doneLoadingRecipes, recipe, visible} = this.state;
        return (
            <div>
                <Navbar handleShowClick={this.handleShowClick} />
                <Sidebar.Pushable as={Segment}>
                    <SideMenu
                        handleSidebarHide={this.handleSidebarHide}
                        visible={visible}
                    />
                    <Sidebar.Pusher dimmed={visible}>
                        <Container style={{ marginTop: '7em' }}>
                            {doneLoadingRecipes ?
                            <ListGrid
                                toggleEdit={this.toggleEditButton}
                                recipes={recipes}
                            />
                            : <p>No data</p>
                            }
                            {toggleNew ? <NewRecipeForm categories={recipesCategories} reloadPage={this.reloadPage} />:<p></p>}
                            {toggleEdit ? <EditRecipePage recipe={recipe} categories={recipesCategories} />:<br />}
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default RecipesPage;