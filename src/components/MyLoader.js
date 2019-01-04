import React from 'react';
import {Segment, Dimmer, Loader, Image} from 'semantic-ui-react';


class MyLoader extends React.Component {

    render() {
        return (
            <Segment>
                <Dimmer active inverted>
                <Loader inverted content='Loading' />
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        )
    }
}


export default MyLoader;