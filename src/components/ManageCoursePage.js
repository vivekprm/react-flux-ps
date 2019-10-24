import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    // Function that we return from useEffect is run, when component is unmounted.
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  // Since this component holds the state it contains the change handler.
  function handleChange({ target }) {
    //debugger;
    // To maintain immutability of course object state.
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) {
      _errors.title = "Title is required";
    }
    if (!course.authorId) {
      _errors.authorId = "Author ID is required";
    }
    if (!course.category) {
      _errors.category = "Category is required";
    }
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    // We want to handle event submit client side. So first this we need to do is:
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};

export default ManageCoursePage;
