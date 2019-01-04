import React from 'react'
import {Grid, Card, Feed, Header, Segment, Button, Icon, Item, Image, Dimmer, Loader } from 'semantic-ui-react';
import {RECIPE_LIST_ENDPOINT, CALENDAR_DAY_LIST_ENDPOINT, CALENDAR_ITEMS_LIST_ENDPOINT} from "../../helpers/endpoints";
import {lookupOptionIncludeToken} from "../../helpers/functions_helpers";
import moment from "moment/moment";
import DayItem from './HomepageComponents/DayItem';
import MyLoader from '../MyLoader';
import FeedItem from './HomepageComponents/FeedItem';


const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />


class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            date_start: moment().startOf('isoWeek').format('YYYY-MM-DD'),
            date_end: moment().endOf('isoWeek').format('YYYY-MM-DD'),
            calendar_days:[],
            doneLoadingCalendarDays: false,
            calendar_items: [],
            doneLoadingCalendarItems: false
        }
    }


    getCalendarDays(token, date_start, date_end) {
        const thisComp = this;
        const endpoint = CALENDAR_DAY_LIST_ENDPOINT + '?date_start='+date_start+'&date_end=' + date_end;
        console.log('endpoint', endpoint)
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

    componentWillMount() {
        const {token, date_start, date_end} = this.state;
        this.getCalendarDays(token, date_start, date_end);
        this.getCalendarItems(token, date_start, date_end);
    }

    render() {
        const { calendar_days, doneLoadingCalendarDays } = this.state;
        const { calendar_items, doneLoadingCalendarItems} = this.state;
        return(
            <div>
                <Grid container>
                    <Grid.Column>
                        <Segment placeholder>
                            <Header icon>
                                <Icon name='pdf file outline' />
                                    Επιλέξετε Ημερομηνία
                            </Header>
                            <Button primary>Ημερομηνία</Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Grid container columns='3'>
                    <Grid.Column>
                        <Segment>
                            <Header as='h4'>Ημέρες</Header>
                            {doneLoadingCalendarDays ? calendar_days.map((day, index)=>(<DayItem day={day} key={index} /> )) : <MyLoader />}
                        </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment placeholder>
                    <Header icon>
                    <Icon name='pdf file outline' />
                    Σχεδίαση Αυριανής Ημέρας
                    </Header>
                    <Button primary>Πάμε!</Button>
                </Segment>
                </Grid.Column>
                <Grid.Column>
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
    </Grid>

    </div>
    )
    }
}


export default Homepage;
