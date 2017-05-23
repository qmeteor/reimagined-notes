/**
 * Created by Bien on 2017-05-23.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall('notes.insert')
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: React.PropTypes.array.isRequired
};

export default createContainer(() => {

    return {
        meteorCall: Meteor.call
    };

}, NoteListHeader);