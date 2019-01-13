import React from 'react';
import {Message} from 'semantic-ui-react';



export const ErrorMessage = function(props) {
    return (
        <div>
            {props.error_messages.map((error, index)=>(
                <Message
                    error
                    header='Πρόβλημα!'
                    content={error}
                    key={index}
                />
            ))
            }
        </div>
    )
  };