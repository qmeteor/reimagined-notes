/**
 * Created by Bien on 2017-05-23.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall('notes.insert', (err, res) => {
                    if (res) {
                        props.Session.set('selectedNoteId', res);
                    }
                });
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: React.PropTypes.array.isRequired,
    Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {

    return {
        meteorCall: Meteor.call,
        Session
    };

}, NoteListHeader);