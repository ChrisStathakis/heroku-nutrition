import React from 'react';
import {Feed} from 'semantic-ui-react';

class FeedItem extends React.Component {

    render() {
        const { item } = this.props;
        console.log(item)
        return (
            <Feed.Event>
                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                <Feed.Content>
                    <Feed.Date content='1 day ago' />
                    <Feed.Summary>{item.tag_recipe_related}
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

export default FeedItem