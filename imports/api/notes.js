/**
 * Created by Bien on 2017-05-19.
 */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('notes', function () {
       return Notes.find({ userId: this.userId });
    });
}

Meteor.methods({
   'notes.insert'() {
       if(!this.userId) {
           throw new Meteor.Error('not-authorized');
       }

       return Notes.insert({
          title: '',
           body: '',
           userId: this.userId,
           updatedAt: moment().valueOf() // new Date().getTime() //same thing
       });
   },
    'notes.remove'(_id) {
        //Check for userId, else throw Error
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //SimpleSchema to validate _id string with length greater than 1
        new SimpleSchema({
          _id: {
              type: String,
              min: 1
          }
        }).validate({ _id });

        Notes.remove({ _id, userId: this.userId });
        // Notes.remove to remove the note
    },
    'notes.update'(_id, updates) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).validate({
            _id,
            ...updates
        });

        Notes.update({
            _id,
            userId: this.userId
        }, {
            $set: {
                updatedAt: moment().valueOf(),
                ...updates
            }
        });
    }
});