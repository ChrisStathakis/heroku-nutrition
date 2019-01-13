import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { Container, Segment, Sidebar, Grid } from 'semantic-ui-react';
import {lookupOptionIncludeToken, lookupOptionPOST, fetchData} from "../../helpers/functions_helpers";
import {
    CALENDAR_CATEGORY_DETAIL_ENDPOINT, CALENDAR_CATEGORY_LIST_ENDPOINT, CALENDAR_CREATE_ITEM_ENDPOINT,
    CALENDAR_DAY_LIST_ENDPOINT,
    CALENDAR_ITEMS_LIST_ENDPOINT,
    PROFILE_DETAIL_ENDPOINT, RECIPE_CATEGORY_LIST_ENDPOINT, RECIPE_LIST_ENDPOINT
} from "../../helpers/endpoints";
import Navbar from '../../components/Navbar';
import SideMenu from '../../components/GeneralComponents/SideMenu';
import {SegmantHeader} from "../../components/GeneralComponents/MyCostumComponents";
import MyLoader from "../../components/MyLoader";
import FirstGrid from '../../components/Program/ChooDateComponents/FirstGrid';
import SecondGrid from '../../components/Program/ChooDateComponents/SecondGrid';
import SelectedRecipeCategory from "../../components/Program/ChooDateComponents/SelectedRecipeCategory";
import {CalendarCategoryData} from "../../components/Program/ChooDateComponents/GeneralComponents";
import SelectedCalendarCategory from "../../components/Program/ChooDateComponents/SelectedCalendarCategory";



class ChoosedDate extends React.Component{

    state = {
        token: localStorage.getItem('token'),
        visible: false,

        toggleFirstGrid: true,
        dateData: false,
        profileData: false,

        recipeCategories: false,
        selectedRecipeCategory: false,
        selectedCategoryID: null,
        storeRecipeCategories:[],

        selectedCalendarCategory: false,
        calendarCategories: false
    };

    componentWillMount() {
        const {date} = this.props.match.params;
        this.setState({date:date});
        this.getDateData(this.state.token, date);
        this.getProfileData();
        this.getRecipeCategories();
        this.storeRecipeCategories();
    }

    componentDidUpdate() {
        if (this.state.dateData.id !== undefined && this.state.calendarCategories === false){
            this.getCalendarCategories(this.state.dateData.id);
        }
    }

    getDateData(token, date) {
        const endpoint = CALENDAR_DAY_LIST_ENDPOINT + '?date_name='+ date;
        const thisComp = this;
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData => {
                if (respData.length > 0){
                    const tod_data = respData[0];
                    thisComp.setState({
                        dateData: tod_data,
                        doneLoading: true
                    });
                } else {
                    const data = {
                        date: date,
                        user: this.state.profileData.id
                    };
                    fetch(CALENDAR_DAY_LIST_ENDPOINT, lookupOptionPOST(token, data))
                    .then(resp=>resp.json())
                    .then(respData => {
                        thisComp.setState({
                            dateData: respData,
                            doneLoading: true
                        })
                    })
                }
            })
    }

    getProfileData(){fetchData(this.state.token, PROFILE_DETAIL_ENDPOINT+ localStorage.getItem('profile_id')+'/', 'profileData', this)}

    getCalendarCategories(date_id){
        const thisComp = this;
        const endpoint = CALENDAR_CATEGORY_LIST_ENDPOINT + '?day_related=' + date_id;
        fetch(endpoint, lookupOptionIncludeToken(this.state.token))
        .then(resp=>resp.json()).then(respData=>{
            thisComp.setState({
                calendarCategories:respData
            });
            thisComp.getProfileData();
        })
    }

    getCalendarItems(){fetchData(this.state.token, CALENDAR_ITEMS_LIST_ENDPOINT, 'calendarItems', this)}
    getRecipeCategories(){fetchData(this.state.token, RECIPE_CATEGORY_LIST_ENDPOINT, 'recipeCategories', this)}
    storeRecipeCategories(){fetchData(this.state.token, RECIPE_CATEGORY_LIST_ENDPOINT, 'storeRecipeCategories', this)}
    getProductCategories(){fetchData(this.state.token, RECIPE_CATEGORY_LIST_ENDPOINT, 'productCategories', this)}


    handleSelectCategory = (id, title) => {
        const thisComp = this;
        const endpoint = RECIPE_LIST_ENDPOINT + '?category=' + id;
        fetch(endpoint, lookupOptionIncludeToken(this.state.token))
            .then(resp=> resp.json()).then(respData=>{
                thisComp.setState({
                    recipes:respData,
                    selectedRecipeCategory: title,
                    selectedCategoryID:id,
                    recipeCategories:false
                })
        });
    };

    handleCalendarCategory= (id) => {
        const endpoint = CALENDAR_CATEGORY_DETAIL_ENDPOINT + id+ '/';
        const thisComp = this;
        fetch(endpoint, lookupOptionIncludeToken(localStorage.getItem('token')))
            .then(resp=>resp.json()).then(respData=>{
                thisComp.setState({
                    selectedCalendarCategory:respData,
                    toggleFirstGrid: false
                })
        })
    };

    resetCalendarCategory = () => {
        this.setState({
            toggleFirstGrid:true,
            selectedCalendarCategory: false
        })
    };

    reloadSelectedCategory  = () => {
        this.getSelectedCalendarCategory(this.state.selectedCalendarCategory.id)
    };

    addRecipe = (recipe_id, qty) => {
        const thisComp = this;
        const data = {
            qty: qty,
            recipe_id: recipe_id,
            date: this.state.dateData.date,
            category_id: this.state.selectedCategoryID
        };
        console.log(data);
        fetch(CALENDAR_CREATE_ITEM_ENDPOINT, lookupOptionPOST(this.state.token, data))
            .then(resp=>resp.json()).then(respData=>{
                thisComp.setState({
                    calendarCategories: false,
                });
                thisComp.reloadComponentAfterRecipeAdd()
        })
    };

    reloadComponentAfterRecipeAdd(){
        this.getCalendarCategories(this.state.dateData.id);
        this.getProfileData();
        this.getDateData(this.state.token, this.state.dateData.date);
    }

    closeRecipeCategory = () => {this.setState({selectedRecipeCategory:false, recipeCategories:this.state.storeRecipeCategories })};


    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
         const {date, visible} = this.state;
         const {dateData, profileData, calendarCategories, recipeCategories, selectedRecipeCategory} = this.state;
         const {toggleFirstGrid, selectedCalendarCategory}  = this.state;
         return (
             <div>
                 <Navbar handleShowClick={this.handleShowClick} />
                 <Sidebar.Pushable as={Segment}>
                    <SideMenu
                        handleSidebarHide={this.handleSidebarHide}
                        visible={visible}
                    />

                     <Sidebar.Pusher dimmed={visible} style={{height: '150vh'}}>
                         <Container style={{ marginTop: '7em' }}>
                             <Grid container>
                                 <Grid.Row>
                                     <Grid.Column mobile={16} tablet={16} computer={16}>
                                        <Segment>
                                            <SegmantHeader title={date} />
                                            <br />
                                            {toggleFirstGrid ?
                                                <Grid>
                                                    {calendarCategories ?
                                                        <FirstGrid
                                                            dateData={dateData}
                                                            profileData={profileData}
                                                            calendarCategories={calendarCategories}
                                                            handleCalendarCategory={this.handleCalendarCategory}
                                                            reloadSelectedCategory = {this.reloadSelectedCategory}
                                                        />
                                                        : <MyLoader/>}
                                                        </Grid>
                                                :
                                                <SelectedCalendarCategory
                                                    calendarCategory={selectedCalendarCategory}
                                                    resetCalendarCategory={this.resetCalendarCategory}

                                                />
                                            }
                                            {selectedRecipeCategory ?
                                                <SelectedRecipeCategory
                                                    recipes={this.state.recipes}
                                                    category={selectedRecipeCategory}
                                                    closeCategory={this.closeRecipeCategory}
                                                    addRecipe={this.addRecipe}
                                                />
                                                : <br />
                                            }
                                            {recipeCategories ?
                                                <SecondGrid
                                                    recipeCategories={recipeCategories}
                                                    handleSelectCategory={this.handleSelectCategory}
                                                />: <br />
                                            }
                                        </Segment>
                                     </Grid.Column>
                                 </Grid.Row>
                             </Grid>
                         </Container>
                     </Sidebar.Pusher>
                 </Sidebar.Pushable>
             </div>
         )
    }

}


export default withRouter(ChoosedDate);