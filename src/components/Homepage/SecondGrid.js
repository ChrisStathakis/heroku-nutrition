import React from 'react';
import { Grid, Card, Feed, Icon, Checkbox, Table, Button, Segment, Header } from 'semantic-ui-react';


class SecondGrid extends React.Component {

    toggleNewRecipe = () => {
        this.props.changeToggleRecipe()
    };

    pickCategory = (id, tag_category) =>{
        this.props.pickCategory(id, tag_category)
    };

    render() {
        const today_items = this.props.today_items;
        
        return (
            <Segment placeholder>
            <Header as='h4'
                    color='blue'
                    icon='database'
                    content='Δεδομένα επιλεγμένου διαστήματος' attached='top' textAlign='center' inverted
            />
            <br /> <br />
            <Grid container>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Card>
                            <Card.Content>
                                <Card.Header>Σημερινά Δεδομένα - {this.props.today_data.date}</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                <Feed.Event>
                                    <Icon name='home' />
                                    <Feed.Content>
                                    <Feed.Date content={this.props.today_data.calories} />
                                    <Feed.Summary>Θερμίδες</Feed.Summary>
                                </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Icon name='home' />
                                    <Feed.Content>
                                    <Feed.Date content={this.props.today_data.protein} />
                                    <Feed.Summary>Πρωτεϊνες</Feed.Summary>
                                </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Icon name='home' />
                                    <Feed.Content>
                                    <Feed.Date content={this.props.today_data.carbs} />
                                    <Feed.Summary>Υδατάνθρακες</Feed.Summary>
                                </Feed.Content>
                                </Feed.Event>
                                <Feed.Event>
                                    <Icon name='home' />
                                    <Feed.Content>
                                    <Feed.Date content={this.props.today_data.fat} />
                                    <Feed.Summary>Λίπος</Feed.Summary>
                                </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Card.Content>
                    </Card>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={8} computer={12}>
                        <Table color='red' celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Κατηγορία</Table.HeaderCell>
                                    <Table.HeaderCell>Θερμίδες</Table.HeaderCell>
                                    <Table.HeaderCell>Πρωτεϊνες</Table.HeaderCell>
                                    <Table.HeaderCell>Υδατάνθρακες</Table.HeaderCell>
                                    <Table.HeaderCell>Λίπος</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {today_items.length > 0 ? today_items.map((item, index)=>(
                                    <TableData key={index} pickCategory={this.pickCategory} item={item} />
                                    )
                                ) :
                                <Table.Row>
                                    <Table.Cell collapsing></Table.Cell>
                                    <Table.Cell>No data</Table.Cell>
                                </Table.Row>
                                }
                            </Table.Body>

                        <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='5'>
                            <Button onClick={this.toggleNewRecipe}
                                    color='teal'
                                    floated='right'
                                    icon labelPosition='left'
                                    size='small'
                            >
                                <Icon  name='add' /> Προσθήκη
                            </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Footer>
                    </Table>
                    </Grid.Column>                          
                </Grid.Row>
            </Grid>
            <br /><br />
            </Segment>
        )
    }
}


class TableData extends React.Component {

    pickCategory = () => {
        this.props.pickCategory(this.props.item.id, this.props.item.tag_category_related)
    };

    render() {
        const { item } = this.props;
        return (
            <Table.Row>
                <Table.Cell collapsing><Button onClick={this.pickCategory} floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='edit' /> Επεξεργασία
                </Button></Table.Cell>
                 <Table.Cell>{item.tag_category_related}</Table.Cell>
                <Table.Cell>{item.calories} calories</Table.Cell>
                <Table.Cell>{item.protein} gr</Table.Cell>
                <Table.Cell>{item.carbs} gr</Table.Cell>
                <Table.Cell>{item.fat} gr</Table.Cell>
            </Table.Row>
        )
    }
}


export default SecondGrid;