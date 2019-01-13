import React from 'react';
import {Header} from 'semantic-ui-react';



export const SegmantHeader = function(props) {
    return <Header as='h4' color='blue' icon={props.icon} content={props.title} attached='top' textAlign='center' inverted/>
  };