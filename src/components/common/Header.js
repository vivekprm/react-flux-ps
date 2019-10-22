import React from "react";
import { getCourses } from "../../api/courseApi";

function Header() {
  return (
    <nav>
      <a href="/">Home</a> | <a href="/courses">Courses</a> |{" "}
      <a href="/about">About</a>
    </nav>
  );
}

export default Header;
