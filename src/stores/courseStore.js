import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
// This is store that's going to store state.
// It's private to store and only way to update it is thorugh dispatcher.
let _courses = [];

class CourseStore extends EventEmitter {
  // This will allow our react components to subscribe our store, so they will be notified
  // when changes occurs.
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    // Find accepts a predicate which returns boolean
    return _courses.find(course => course.slug === slug);
  }
}

const store = new CourseStore();

// It's catching the action dispatched by dispatcher.dispatch.
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      // debug 3
      debugger;
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    // nothing to do here.
  }
});

export default store;
