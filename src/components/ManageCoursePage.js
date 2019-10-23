import React from "react";

const ManageCoursePage = props => {
  debugger;
  return (
    <>
      <h2>Manage Course</h2>
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
