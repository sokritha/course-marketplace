import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((acc, course, index) => {
      acc[course.id] = course;
      acc[course.id].index = index;
      return acc;
    }, {}),
  };
};

// Output resulot of acc
// {
//     "1410474": {
//         course1,
//         index: 0
//      },
//     ...
// }
