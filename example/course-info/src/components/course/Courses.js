import React from "react";
import Total from "./Total";

const Courses = ({ courses }) =>
  courses.map((course) => (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <Total course={course} />
    </>
  ));

export default Courses;
