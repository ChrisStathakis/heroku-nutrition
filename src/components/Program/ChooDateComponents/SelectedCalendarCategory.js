import React, {Component} from 'react';
import {Grid, Form, Segment, Table,Header, List, Button } from 'semantic-ui-react';
import {CALENDAR_ITEM_DETAIL_ENDPOINT, CALENDAR_ITEMS_LIST_ENDPOINT} from "../../../helpers/endpoints";
import {
    fetchData,
    lookupOptionDELETE,
    lookupOptionIncludeToken,
    lookupOptionPUT
} from "../../../helpers/functions_helpers";
import {CalendarCategoryData} from "./GeneralComponents";
import MyLoader from "../../MyLoader";
import {SegmantHeader} from "../../GeneralComponents/MyCostumComponents";



class SelectedCalendarCategory extends Component {

    state = {
        token: localStorage.getItem('token'),
        calendarItems: false
    };

    componentWillMount(){
        const {calendarCategory} = this.props;
        console.log('props', calendarCategory);
        this.setState({
            calendarCategory: calendarCategory
        });
        this.getCalendarItems(calendarCategory.id)
    }

    shouldComponentUpdate(nextProps) {
        const {calendarCategory} = this.state;
        if (calendarCategory !== nextProps.calendarCategory) {
            this.setState({calendarCategory:nextProps.calendarCategory})
        }
    }

    getCalendarItems(id){
        const endpoint = CALENDAR_ITEMS_LIST_ENDPOINT + '?category_related='+ id;
        const thisComp = this;
        fetch(endpoint, lookupOptionIncludeToken(this.state.token))
            .then(resp=>resp.json()).then(respData=>thisComp.setState({calendarItems: respData}))
    };

    closeWindow = () => {
        this.props.resetCalendarCategory()
    };

    handleActionCategory = (data, action) => {
        const endpoint = CALENDAR_ITEM_DETAIL_ENDPOINT + data.id + '/';
        switch (action.type){
            case 'EDIT':
                fetch(endpoint, lookupOptionPUT(this.state.token, data))
                    .then(resp=>resp.json()).then(respData=>{
                        console.log('edit', respData)
                });
            case 'DELETE':
                fetch(endpoint, lookupOptionDELETE(this.state.token))
                    .then(resp=>resp.json()).then(respData=>console.log('delww'))
        }
    };

    reloadPage = () => {
        this.props.reloadSelectedCategory();
        this.componentWillMount()
    };

    render() {
        const {calendarItems, calendarCategory} = this.state;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Segment>
                            <SegmantHeader title='Γενικές Πληροφορίες'/>
                            <Header>{calendarCategory.title}</Header>
                            <List celled ordered>
                                <List.Item>Συνολικές Θερμίδες {calendarCategory.calories} cal</List.Item>
                                <List.Item>Ανάλυση
                                    <List.List>
                                        <List.Item>Πρωτεϊνη {calendarCategory.protein} gr</List.Item>
                                        <List.Item>Υδατάνθρακες {calendarCategory.carbs} gr</List.Item>
                                        <List.Item>Λίπος {calendarCategory.fat} gr</List.Item>
                                    </List.List>
                                </List.Item>
                            </List>
                             <Button onClick={this.closeWindow} color='red' icon='cancel' content='Κλείσιμο' />
                        </Segment>
                    </Grid.Column>

                    <Grid.Column mobile={16} table={16} computer={12}>
                        <Segment>
                            <SegmantHeader title='Συνταγές Κατηγορίας'/>
                                <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Συνταγή</Table.HeaderCell>
                                        <Table.HeaderCell>Θερμίδες</Table.HeaderCell>
                                        <Table.HeaderCell>Πρωτεϊνή</Table.HeaderCell>
                                        <Table.HeaderCell>Υδατάνθρακες</Table.HeaderCell>
                                        <Table.HeaderCell>Λιπος</Table.HeaderCell>
                                        <Table.HeaderCell>Ποσότητα</Table.HeaderCell>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                    <Table.Body>
                                        {calendarItems ? calendarItems.map((item, index)=>(
                                            <CalendarCategoryData
                                                item={item}
                                                key={index}
                                                handleActionCategory={this.handleActionCategory}
                                                reloadPage={this.reloadPage}
                                            />

                                            ))
                                        :<MyLoader/>}
                                    </Table.Body>
                                </Table>
                                <Button color='green' icon='save' content='Αποθήκευση'/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

export default SelectedCalendarCategory;