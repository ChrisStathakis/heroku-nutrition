import React from 'react';
import {withRouter} from 'react-router';
import { Container, Header, Icon, Responsive, Segment, Sidebar, Menu } from 'semantic-ui-react'
import SideMenu from '../../components/GeneralComponents/SideMenu';
import Navbar from '../../components/Navbar'
import FirstGrid from '../../components/Homepage/FirstGrid';
import moment from "moment/moment";
import {
    CALENDAR_DAY_LIST_ENDPOINT,
    CALENDAR_CATEGORY_LIST_ENDPOINT,
    CALENDAR_ITEMS_LIST_ENDPOINT,
    USER_DATA_ENDPOINT,
    CALENDAR_ITEM_DETAIL_ENDPOINT
} from "../../helpers/endpoints";
import {lookupOptionPOST, lookupOptionIncludeToken, lookupOptionPUT} from "../../helpers/functions_helpers";
import SecondGrid from '../../components/Homepage/SecondGrid';
import ThirdGrid from '../../components/Homepage/ThirdGrid';
import HomepageNewRecipe from '../../components/Homepage/NewRecipe';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            token: localStorage.getItem('token'),
            profile_data: {},
            today_items: {},
            today_data: {},
            today_movement: {},
            showDetails: false,
            choosed_category_title: '',
            details_data: {},

            toggleNewRecipe: false,
            doneLoading: false

        }
    }

    fetchProfileData(token){
        const thisComp = this;
        fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData => {
            thisComp.setState({
                profile_data: respData
            })
            
        })
    }

    fetchTodayDataItems(token, today_id){
        const thisComp = this;
        const endpoint = CALENDAR_CATEGORY_LIST_ENDPOINT + '?day_related='+ today_id;
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData =>{
                thisComp.setState({
                    today_items: respData,
                    doneLoadingItems: true
                })
            })
    };

    onCloseSegment=() => {
        this.setState({
            showDetails: false
        })
    };



    changeToggleRecipe = () => {
        this.setState({
            toggleNewRecipe: !this.state.toggleNewRecipe
        })
    };

    fetchTodayData(token) {
        const today = moment(new Date()).format('YYYY-MM-DD');
        const endpoint = CALENDAR_DAY_LIST_ENDPOINT + '?date_name='+ today;
        const thisComp = this;
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=>resp.json())
            .then(respData => {
                if (respData.length > 0){
                    const tod_data = respData[0];
                    thisComp.setState({
                        today_data: Object.assign({}, this.state.today_data, tod_data),
                        doneLoading: true
                    });
                    thisComp.fetchTodayDataItems(token, tod_data.id)
                } else {
                    const data = {
                        date: today,
                        user: this.state.profile_data.id
                    };
                    fetch(CALENDAR_DAY_LIST_ENDPOINT, lookupOptionPOST(token, data))
                    .then(resp=>resp.json())
                    .then(respData => {
                        thisComp.setState({
                            today_data: Object.assign({}, this.state.today_data, respData),
                            doneLoading: true
                        })
                        
                    })
                }
            })
    }

    fetchCategoryData =(category_id, tag_category) => {
        const endpoint = CALENDAR_ITEMS_LIST_ENDPOINT + '?category_related=' + category_id;
        console.log('fetch category', endpoint)
        const thisComp = this;
        fetch(endpoint, lookupOptionIncludeToken(this.state.token))
        .then(resp=>resp.json())
        .then(respData => {
            thisComp.setState({
                details_data: respData,
                choosed_category_title: tag_category,
                showDetails: true
            })
        })
    };

    pickRecipe = (recipe_id, category_id, qty) => {
        let fetch_category_id = '';
        const calendar_category_endpoint = CALENDAR_CATEGORY_LIST_ENDPOINT + '?day_related='+this.state.today_data.id+'&category_related='+category_id;
        const thisComp = this;
        fetch(calendar_category_endpoint, lookupOptionIncludeToken(this.state.token))
            .then(resp=>resp.json())
            .then(respData=>{
                if(respData.length > 0) {
                    fetch_category_id = respData[0].id
                } else {
                    const data = {
                        day_related: this.state.today_data.id,
                        category_related: category_id
                    };
                    fetch(CALENDAR_CATEGORY_LIST_ENDPOINT, lookupOptionPOST(this.state.token, data))
                        .then(resp=>resp.json())
                        .then(respData=>{
                            fetch_category_id = respData.id
                        })
                }
                const calendar_day_endpoint = CALENDAR_ITEMS_LIST_ENDPOINT + '?recipe_related='+recipe_id+'&category_related='+fetch_category_id;
                fetch(calendar_day_endpoint, lookupOptionIncludeToken(this.state.token))
                    .then(resp=>resp.json())
                    .then(respData=>{
                        if(respData.length > 0){
                            const new_qty = parseFloat(respData[0].qty) + qty;
                            const new_data = {
                                recipe_related: respData[0].recipe_related,
                                category_related: respData[0].category_related,
                                qty: new_qty
                            };
                            const put_endpoint = respData[0].url;
                            fetch(put_endpoint, lookupOptionPUT(this.state.token, new_data))
                                .then(resp=>resp.json())
                                .then(respData=>{
                                    console.log('new data', respData)
                                    thisComp.setState({})
                                })
                        } else {
                            console.log('new_item', recipe_id, fetch_category_id, qty);
                            const data = {
                                recipe_related: recipe_id,
                                category_related: fetch_category_id,
                                qty: qty
                            }
                            fetch(CALENDAR_ITEMS_LIST_ENDPOINT, lookupOptionPOST(this.state.token, data))
                                .then(resp=>resp.json())
                                .then(respData=>{
                                    console.log('new data', respData)
                                    thisComp.setState({})
                                })
                        }
                    })
            })
    };
    
    componentDidMount() {
        const token = localStorage.getItem('token');
        this.fetchProfileData(token);
        this.fetchTodayData(token);
    }

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });


    render() {
        const {doneLoading, visible} = this.state;
        const {profile_data} = this.state;
        const {toggleNewRecipe} = this.state;
        return(
            <div>
                <Navbar handleShowClick={this.handleShowClick} />
                <Sidebar.Pushable as={Segment}>
                    <SideMenu
                        handleSidebarHide={this.handleSidebarHide}
                        visible={visible}
                    />
                <Sidebar.Pusher dimmed={visible}>
                <Container style={{ marginTop: '7em' }}>
                    <Header as='h2' icon textAlign='center'>
                        <Icon color='teal' name='chart bar' circular />
                        <Header.Content>{this.state.today_data.date}</Header.Content>
                    </Header>
                    {doneLoading ? <FirstGrid profile_data={profile_data} /> : <p>no data</p>}
                    <br /> <br />
                    {toggleNewRecipe ?<HomepageNewRecipe pickRecipe={this.pickRecipe} changeToggleRecipe={this.changeToggleRecipe} />
                        :
                        <SecondGrid
                            today_data={this.state.today_data}
                            today_items={this.state.today_items}
                            pickCategory={this.fetchCategoryData}
                            changeToggleRecipe={this.changeToggleRecipe}
                        />
                    }
                    {this.state.showDetails ?
                        <ThirdGrid 
                            details_data={this.state.details_data}
                            category_title={this.state.choosed_category_title}
                            onCloseSegment={this.onCloseSegment}
                        />
                        :''
                    }
                </Container>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
   </div>
    )
    }
}

export default withRouter(Homepage);
