import CourseCard from "@components/ui/course/card";

export default function CourseList({ courses }) {
  return (
    <div className="relative grid gap-4 grid-cols-1 tabletPortrait:grid-cols-2 tabletLandscape:grid-cols-3 desktop:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
