import { createStore, applyMiddleware, combineReducers } from "redux";
import {enableBatching, batchDispatchMiddleware} from 'redux-batched-actions';
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

// 
import auth from './reducers/auth';
import classes from './reducers/classes';
import university from './reducers/university';
import course from './reducers/course';
import users from './reducers/users';
import homeworks from './reducers/homeworks';
import students from './reducers/students';
import teachers from './reducers/teachers';
import forum from './reducers/forum';
import lessionPlan from './reducers/lessionPlan';
import resource from './reducers/resource';
import contact from './reducers/contact';
import forumFeedback from './reducers/forumFeedback';
import homeworkFeedback from './reducers/homeworkFeedback';
import upload from './reducers/upload';
import payment from './reducers/payment';
import homeworkComment from './reducers/homeworkComment';
import MessangerReducer from "./reducers/MessagnerReducer";
const rootReducer = combineReducers ({
    auth,
    upload,
    classes,
    university,
    course,
    users,
    homeworks,
    students,
    teachers,
    forum,
    forumFeedback,
    homeworkFeedback,
    lessionPlan,
    resource,
    contact,
    payment,
    homeworkComment,
    MessangerReducer
})

const middleware = [
    batchDispatchMiddleware,
    thunk
]

// if ( process.env.NODE_ENV == 'development' ) {
    const { logger } = require ( 'redux-logger' )
    middleware.push( logger )
// }

export default createStore ( rootReducer, composeWithDevTools(applyMiddleware(...middleware)) )