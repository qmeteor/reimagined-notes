/**
 * Created by Bien on 2017-05-19.
 */
import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users';

if(Meteor.isServer) {

    describe('users', function () {
        it('should allow valid email address', function () {
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };
            const result = validateNewUser(testUser);

            expect(result).toBe(true);
        });

        it('should reject invalid email', function() {

            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };


            expect(() => {
                validateNewUser(testUser);
            }).toNotThrow();
        });
    });
}

// const add = (a, b) => {
//     if(typeof b !== 'number') {
//         return a + a;
//     }
//
//     return a + b;
// };
//
// const square = (a) => a * a;
//
// describe('add', function() {
//     it('should add two numbers', function() {
//         const result = add(11, 9);
//
//
//         expect(result).toBe(20);
//     });
//
//     it('should double single number', function () {
//         const result = add(44);
//         expect(result).toBe(88);
//     });
//
//
// });
//
// describe('square', function() {
//     it('should square a number', function() {
//         const result = square(11);
//
//         expect(result).toBe(121);
//     });
//
// });

