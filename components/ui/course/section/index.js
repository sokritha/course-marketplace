import { CourseList } from "..";

export default function CourseSection({ courses }) {
  return (
    <div className="body-content-layout">
      <h1 className="text-black font-bold text-2xl mb-8">Most Popular</h1>
      <CourseList courses={courses} />
    </div>
  );
}
