/**
 * Created by Bien on 2017-05-23.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader />
            { props.notes.map((note) => {
                return <NoteListItem key={note._id} note={note}/>
            })}
            NoteList { props.notes.length }
        </div>
    );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};
export default createContainer(() => {
    Meteor.subscribe('notes');
//keys in here are props in the component
    return {
        notes: Notes.find().fetch()
    };

}, NoteList);