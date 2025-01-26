import { composeWithDevTools } from '@redux-devtools/extension';
import { useEffect } from 'react';
import { createStore } from 'redux';

// This imports the createStore function from the Redux library. It is used to create a Redux store that holds the state of the application.

// This defines the initial state of your application. In this case, it is an empty array that will store student data.
// studentSdata is an empty array that will store student data.

// initication state*************
const initialState = {
    studentSdata: []
}

// Actions are string constants representing types of operations you can perform on the state.

// ADD_STUDENT: To add a new student to the state.
// DELETE_STUDENT: (Not implemented yet) Intended to delete a student.
// UPDATE_STUDENT: (Not implemented yet) Intended to update student details.
// Action*************
const ADD_STUDENT = 'ADD_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
// local server data*************
const improtLocalServerdata = "importLocalServerdata";



// function for adding student*************
// addStudent: A function that creates an action to add a student to the state.
export const addStudent = (student) => { //student is the data that is being sent to the reducer
    //call the fetchdata my this function 
    fetch(`http://localhost:3000/students`, {
        method: 'POST', //method is the type of request being made
        headers: {
            'Content-Type': 'application/json' //headers are the metadata of the request
        },
        body: JSON.stringify(student) //body is the data being sent to the server
    }).then((response) => {
        response.json(); //response.json() is a function that converts the response to JSON

    }) //response is the data returned by the server
        .then((data) => {
            console.log("Data added successfully", data); //then is a function that is called when the promise is resolved
            //store the data in the server
            store.dispatch({
                type: improtLocalServerdata,
                payload: data
            }) //dispatch is a function that sends an action to the reducer


        }).catch((error) => {
            console.log("error", error); //catch is a function that catches any errors that occur
        })

    return true;
}



// local server data*************
export const fetchData = async () => {
    let response = await fetch('http://localhost:3000/students')
    let data = await response.json();
    console.log("fetchData");
    // store this data in  server*************
    store.dispatch({
        type: improtLocalServerdata,
        payload: data
    })
}


// delete student*************
export const deleteStudent = (index) => {
    fetch(`http://localhost:3000/students/${index}`, {
        method: 'DELETE', //method is the type of request being made
        headers: {
            'Content-Type': 'application/json' //headers are the metadata of the request
        } //headers are the metadata of the request
    }).then((res => res.json())) //response is the data returned by the server
        .then((data) => {
            console.log("Data deleted successfully", data);
            store.dispatch({
                type: DELETE_STUDENT,
                payload: index
            }); //dispatch is a function that sends an action to the reducer
        }); //then is a function that is called when the promise is resolved
} //fetch is a function that sends a request to the server



// Reducer*************
// The Reducer is a pure function that determines how the state changes based on the action received.

// state = initialState: Sets the default state as initialState.
// action: Contains the type (what action to perform) and payload (data for the action).
// switch statement:
// Case ADD_STUDENT: Adds a new student (action.payload) to studentSdata while keeping the existing state unchanged using the spread operator ....
// Default: Returns the current state if the action type doesn't match.
export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT://value of action.type
            return {
                ...state,
                studentSdata: [...state.studentSdata, action.payload]
            }
        case DELETE_STUDENT: //value of action.type
            return {
                ...state,
                studentSdata: state.studentSdata.filter((stu, index) => index !== action.payload)

            }
        case improtLocalServerdata: //value of action.type
            return {
                ...state, //copy the state
                studentSdata: [...state.studentSdata, action.payload] //add the data to the studentSdata array
            }
        default:
            return state

    }

}

// The Redux store is created using the createStore function, with the Reducer function passed as an argument.  store.getState(): Fetches the current state of the application. Initially, it will be:

export let store = createStore(Reducer, composeWithDevTools());

console.log("initialState", store.getState());

// Dispatch*************
// store.dispatch(): Dispatches an action to the store.
// Action:
// type: ADD_STUDENT specifies that this action is adding a student.
// payload: { name: 'Rahul', age: 24 } contains the data of the student being added.
// The reducer processes this action, updates the state by adding the new student, and the state now becomes:

store.dispatch({
    type: ADD_STUDENT,
    payload: { name: 'Rahul', age: 24 }
})

// update state*************
console.log("updatedState", store.getState());

// dispatch sec student*************
// store.dispatch({
//     type: ADD_STUDENT,
//     payload: { name: 'Anitosh Halder', age: 29 }
// })

console.log("updatedState", store.getState());;

// delete student*************
store.dispatch({
    type: DELETE_STUDENT,
    payload: 0
})

// case DELETE_STUDENT: This block of code will execute when an action of type DELETE_STUDENT is dispatched.

// return { ...state, studentSdata: ... }:

// ...state: Copies the current state to ensure immutability (i.e., the original state is not directly modified).
// studentSdata: ...: Updates the studentSdata array.
// state.studentSdata.filter(...):

// The filter method creates a new array containing only the elements that satisfy the given condition.
// (student, index) => index !== action.payload:

// For each student in the array, the filter function checks if the index of the student does not match action.payload.
// If the condition is true, the student remains in the new array. If false (i.e., the index matches action.payload), the student is excluded.
// Effect of This Code:

// Removes the student at the specified index (action.payload) from studentSdata.
// Returns a new state object with the updated studentSdata.

console.log("del 1 value and updatedState", store.getState());;
// The store now contains the updated state with two students added and one student deleted. The console output will be:

// dispatch sec student*************


console.log("updatedState del after one data add", store.getState());

