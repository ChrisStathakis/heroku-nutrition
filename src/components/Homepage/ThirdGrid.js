import React from 'react';
import { Grid, Form, Table, Header, Segment, Button } from 'semantic-ui-react';

class ThirdGrid extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            toggleForm: false,
            form_initial_data:{}
        }

    }

    handleEdit = (item) => {
        this.setState({
            form_initial_data: item
        })
    };

    onCloseSegment = () => {
        this.props.onCloseSegment()
    };

    render() {
        const detail_items = this.props.details_data;
        const title = 'Επεξεργασία ' + this.props.category_title;
        console.log('details', this.state.form_initial_data);
        return (
            <Segment>
                 <Header
                     as='h4'
                     color='blue'
                     icon='database'
                     content={title}
                     attached='top'
                     textAlign='center'
                     inverted
                 />
            <Grid>
            <Grid.Column width={10}>
            <Segment>
                <Header
                    as='h2'
                    content={this.props.category_title}
                    subheader='Manage your account settings and set email preferences'
                />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Προϊόν</Table.HeaderCell>
                            <Table.HeaderCell>Ποσότητα</Table.HeaderCell>
                            <Table.HeaderCell>Θερμίδες</Table.HeaderCell>
                            <Table.HeaderCell>Πρωτεϊνη</Table.HeaderCell>
                            <Table.HeaderCell>Υδατάνθρακες</Table.HeaderCell>
                            <Table.HeaderCell>Λίπος</Table.HeaderCell>
                            <Table.HeaderCell>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {detail_items.length > 0 ? detail_items.map((item, index)=>(
                            <TableBody
                                key={index}
                                item={item}
                                handleEdit={this.handleEdit}
                            />
                        ))
                            
                        :
                        <Table.Row>
                            <Table.Cell>false</Table.Cell>
                            <Table.Cell>Unknown</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        }
                    </Table.Body>
                </Table>
                <Button onClick={this.onCloseSegment}>Κλείσιμο</Button>
            </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
            <Segment>
            <Header
                    as='h2'
                    content='Account Settings'
                />
            <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
      </Segment>
            </Grid.Column>
    
            </Grid>
            </Segment>
        )
        }
}

class TableBody extends React.Component {

    handleEdit = () => {
        this.props.handleEdit(this.props.item)
    };

    render(){
        const {item} = this.props;
        return (
            <Table.Row>
                <Table.Cell>{item.tag_recipe_related}</Table.Cell>
                <Table.Cell>{item.qty}</Table.Cell>
                <Table.Cell>{item.calories}</Table.Cell>
                <Table.Cell>{item.protein}</Table.Cell>
                <Table.Cell>{item.carbs}</Table.Cell>
                <Table.Cell>{item.fat}</Table.Cell>
                <Table.Cell>
                    <Button onClick={this.handleEdit} color='purple'>Edit</Button>
                </Table.Cell>
            </Table.Row>
        )

    }
}

export default ThirdGrid;