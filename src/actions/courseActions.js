import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  // It's good idea to return promise as the calling code will know when it resolves.
  // Hey dispatcher go tell all the stores that a course was just created.
  return courseApi.saveCourse(course).then(savedCourse => {
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.CREATE_COURSE
        : actionTypes.UPDATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

export function deleteCourse(id) {
  // debug 2
  debugger;
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
