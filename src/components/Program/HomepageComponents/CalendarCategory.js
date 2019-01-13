import React, {Component} from 'react';
import {Grid, Table, Segment} from 'semantic-ui-react';
import {CALENDAR_ITEMS_LIST_ENDPOINT} from "../../../helpers/endpoints";
import {fetchData} from "../../../helpers/functions_helpers";
import {SegmantHeader} from "../../GeneralComponents/MyCostumComponents";


class CalendarCategory extends Component {

    state = {};
    componentWillMount(){
        const {calendarCategory} = this.props;
        this.setState({
            calendarCategory: calendarCategory
        });
        this.getCalendarItems(calendarCategory.id)
    }

    getCalendarItems(id){
        const endpoint = CALENDAR_ITEMS_LIST_ENDPOINT + '?category_related=' + id;
        fetchData(endpoint, this.state.token, 'calendarItems', this)
    }

    render() {
        const {calendarItems} = this.state;
        const {calendarCategory} = this.props;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <SegmantHeader title={calendarCategory.title}/>
                        <Table>

                        </Table>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        )
    }

}