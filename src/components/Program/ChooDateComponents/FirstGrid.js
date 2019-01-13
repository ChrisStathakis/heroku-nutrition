import React, { Component } from 'react';
import {Segment, Card, Grid, List, Header, Button, Image} from 'semantic-ui-react';
import {SegmantHeader} from '../../GeneralComponents/MyCostumComponents'
import { CategoryCard } from './GeneralComponents';


class FirstGrid extends Component {



    chooseCalendarCategory = (id) => {
        this.props.handleCalendarCategory(id)
    }

    render() {
        const {dateData, profileData, calendarCategories } = this.props;

        return (
            <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Segment>
                    <SegmantHeader title='Πληροφορίες Ημέρας' />
                    <Header>Δεδόμενα Ημέρας</Header>
                    <List celled ordered>
                        <List.Item>Συνολικές Θερμίδες {dateData.calories} cal</List.Item>
                        <List.Item>
                        Ανάλυση
                        <List.List>
                            <List.Item>Πρωτεϊνη {dateData.protein} gr</List.Item>
                            <List.Item>Υδατάνθρακες {dateData.carbs} gr</List.Item>
                            <List.Item>Λίπος {dateData.fat} gr</List.Item>
                        </List.List>
                        </List.Item>
                    </List>
                    <br /> 
                    <Header>Στόχοι Ημέρας</Header>
                    <List celled ordered>
                        <List.Item>Συνολικές Θερμίδες {profileData.calories_target} cal</List.Item>
                        <List.Item>
                        Ανάλυση
                        <List.List>
                            <List.Item>Πρωτεϊνη {profileData.tag_protein_target} gr</List.Item>
                            <List.Item>Υδατάνθρακες {profileData.tag_carbs_target} gr</List.Item>
                            <List.Item>Λίπος {profileData.tag_fat_target} gr</List.Item>
                        </List.List>
                        </List.Item>
                    </List>

                    </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={12}>
                <Segment>
                    <SegmantHeader title='Ανάλυση ανα Γεύμα' />
                    <br />
                    <Card.Group>
                        {calendarCategories.map((category, index)=><CategoryCard chooseCalendarCategory={this.chooseCalendarCategory} category={category} key={index} />)}
                    </Card.Group>
                </Segment>
            </Grid.Column>
        </Grid.Row>

        )
    }
}

export default FirstGrid;