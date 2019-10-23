import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CourseForm from "./CourseForm";
import * as coureApi from "../api/courseApi";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      coureApi.getCourseBySlug(slug).then((_course) => {
        setCourse(_course);
      });
    }
  }, [props.match.params.slug])

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
      _errors.title = "Title is required"
    }
    if (!course.authorId) {
      _errors.authorId = "Author ID is required"
    }
    if (!course.category) {
      _errors.category = "Category is required"
    }
    setErrors(_errors);
    return Object.keys(_errors).length === 0
  }

  function handleSubmit(event) {
    // We want to handle event submit client side. So first this we need to do is:
    event.preventDefault();
    if (!formIsValid()) return;
    coureApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
    </>
  );
};

export default ManageCoursePage;
