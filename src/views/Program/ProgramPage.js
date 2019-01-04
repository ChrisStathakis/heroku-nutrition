import React from 'react';
import Navbar from '../../components/Navbar';
import { Container } from 'semantic-ui-react';
import ProgramMenu from '../../components/Program/ProgramMenu';
import Homepage from '../../components/Program/Homepage';

class ProgramPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_page: 'homepage',
            
        }
    }

    render() {
        const { selected_page} = this.state;

        return (
            <div>
                <Navbar />
                <ProgramMenu />
                <Container style={{ marginTop: '7em' }}>
                    {selected_page === 'homepage'? <Homepage />:''}
                </Container>
            </div>
        )
    }
}

export default ProgramPage;