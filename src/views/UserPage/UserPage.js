import React from 'react';
import { Grid, Column, Segment, Sidebar, Header, Icon, Container } from 'semantic-ui-react';
import {PROFILE_DETAIL_ENDPOINT, USER_DATA_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";
import Navbar from '../../components/Navbar';
import InfoGrid from "../../components/UserPage/InfoGrid";
import FormGrid from "../../components/UserPage/FormGrid";
import MyLoader from "../../components/MyLoader";
import ProfileGrid from "../../components/UserPage/ProfileGrid";
import SideMenu from "../../components/GeneralComponents/SideMenu";


const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class UserPage extends  React.Component {

    state = {
        token: localStorage.getItem('item'),
        doneLoading:false,
        user_data:false,
        profile_data:false,
        visible: false
    };

    getUser(token){
        const thisComp = this;
        console.log(USER_DATA_ENDPOINT);
        fetch(USER_DATA_ENDPOINT, lookupOptionIncludeToken(token))
            .then(resp=>resp.json()).then(respData=>{
                thisComp.setState({user_data:respData});
                thisComp.getProfile(token, respData.id, thisComp);
            })
    }

    getProfile(token, user_id, thisComp){
        const endpoint = PROFILE_DETAIL_ENDPOINT + user_id + '/';
        fetch(endpoint, lookupOptionIncludeToken(token))
            .then(resp=> resp.json()).then(respData=>thisComp.setState({profile_data:respData, doneLoading:true}))
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.getUser(token)
    }
    handleChange = (e, { value }) => this.setState({ value });
    reload = () => this.componentDidMount();
    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
        const {user_data, profile_data, doneLoading, visible} = this.state;
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
                            <Header as='h2' icon textAlign='center'>
                                <Icon color='teal' name='address card' circular />
                                <Header.Content>{user_data.tag_username}</Header.Content>
                            </Header>
                            {doneLoading ?
                                 <Grid>
                                     <InfoGrid user_data={user_data} />
                                     <FormGrid user_data={user_data} reload={this.reload} />
                                     <ProfileGrid user_data={user_data} profile_data={profile_data} reload={this.reload} />
                                 </Grid> : <MyLoader/>
                            }
                            </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default UserPage;