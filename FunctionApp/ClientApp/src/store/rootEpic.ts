import { combineEpics } from 'redux-observable';
import todoEpic from '../behavior/todo/epic';

export default combineEpics(todoEpic);