import React from 'react';
import Navbar from '../../components/Navbar';
import { Container, Segment, Sidebar, Input } from 'semantic-ui-react';
import {Grid, Card, Feed, Header, Button, Icon } from 'semantic-ui-react';
import SideMenu from '../../components/GeneralComponents/SideMenu';
import {CALENDAR_DAY_LIST_ENDPOINT, CALENDAR_ITEMS_LIST_ENDPOINT, USER_DATA_ENDPOINT} from "../../helpers/endpoints";
import {fetchData, lookupOptionIncludeToken, lookupOptionPOST} from "../../helpers/functions_helpers";
import {SegmantHeader} from "../../components/GeneralComponents/MyCostumComponents";
import DayItem from '../../components/Program/HomepageComponents/DayItem';
import MyLoader from '../../components/MyLoader';
import FeedItem from '../../components/Program/HomepageComponents/FeedItem';
import moment from 'moment';

class ProgramPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            visible: false,
            date_start: moment().startOf('isoWeek').format('YYYY-MM-DD'),
            date_end: moment().endOf('isoWeek').format('YYYY-MM-DD'),

            doneLoading: false,
            calendar_days:[],
            doneLoadingCalendarDays: false,
            calendar_items: [],
            doneLoadingCalendarItems: false
        }
    }

    componentDidMount(){
         const {token, date_start, date_end} = this.state;
        this.getProfileData(token);
        this.getCalendarDays(token, date_start, date_end);
        this.getCalendarItems(token, date_start, date_end);
    }

    getProfileData(token){fetchData(token, USER_DATA_ENDPOINT, 'profileData', this)}

    getCalendarDays(token, date_start, date_end) {
        const thisComp = this;
        const endpoint = CALENDAR_DAY_LIST_ENDPOINT + '?date_start='+date_start+'&date_end=' + date_end;
        console.log('endpoint', endpoint);
        fetch(endpoint, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            setTimeout(() => {
                thisComp.setState({calendar_days:respData, doneLoadingCalendarDays: true})}
              ,
              1000)
            })
    }

    getCalendarItems(token, date_start, date_end) {
        const thisComp = this;
        const endpoint = CALENDAR_ITEMS_LIST_ENDPOINT + '?date_start=' + date_start + '&date_end=' + date_end;
        fetch(endpoint, lookupOptionIncludeToken(token))
        .then(resp=>resp.json())
        .then(respData=>{
            setTimeout(() => {
                thisComp.setState({calendar_items:respData, doneLoadingCalendarItems: true})}
              ,
              900)
            })
    }

    pickDate = (date) => {this.props.history.push('/plan/'+ date+ '/');};

    chooseDate = (event) => {
        const date = event.target.value;
        this.props.history.push('/plan/'+ date+ '/');
    };


    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
        const { visible} = this.state;
        const { calendar_days, doneLoadingCalendarDays } = this.state;
        const { calendar_items, doneLoadingCalendarItems} = this.state;

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
                                <Grid.Column>
                                    <SegmantHeader title='Σχεδιασμός' />
                                    <Segment placeholder>
                                        <Header icon><Icon name='pdf file outline' />Επιλέξετε Ημερομηνία</Header>
                                        <Button.Group widths='3'>
                                            <Button
                                                value={moment().subtract(1, 'days').format('YYYY-MM-DD')}
                                                onClick={this.chooseDate}
                                                labelPosition='left'
                                                icon='left chevron'
                                                content='Εχτές'
                                                color='red'
                                            />
                                            <Button
                                                icon='stop'
                                                content='Σήμερα'
                                                value={moment(new Date()).format('YYYY-MM-DD')}
                                                onClick={this.chooseDate}
                                                color='blue'
                                            />
                                            <Button
                                                labelPosition='right'
                                                icon='right chevron'
                                                content='Αύριο'
                                                value={moment().add(1, 'days').format('YYYY-MM-DD')}
                                                onClick={this.chooseDate}
                                                color='teal'
                                            />
                                        </Button.Group>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column  mobile={16} tablet={8} computer={6}>
                                    <Segment><Header as='h4'>Ημέρες</Header>
                                        {doneLoadingCalendarDays ? calendar_days.map((day, index)=>(
                                            <DayItem
                                                day={day}
                                                pickDay={this.pickDate}
                                                key={index} /> ))
                                            : <MyLoader />
                                        }
                                        </Segment>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={4}>
                                    <Segment placeholder>
                                        <Header icon>
                                        <Icon name='pdf file outline' />Επέλεξε Ημερομηνία!</Header>
                                        <Input type='date' />
                                        <Button primary>Επέλεξε Ημερομηνία!</Button>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={6}>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>Τέλευταίες Καταχωρίσεις</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Feed>
                                                {doneLoadingCalendarItems ? calendar_items.map((item, index) =>(<FeedItem item={item} key={index} />)) : <MyLoader />}
                                            </Feed>
                                    </Card.Content>
                                    </Card>
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

export default ProgramPage;

