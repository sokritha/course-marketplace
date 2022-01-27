import { Divider } from "@components/ui/commons";
import { CourseSection } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketplaceHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  return (
    <>
      <section className="relative max-w-7xl mx-auto flex flex-col items-center">
        <MarketplaceHeader />
        <CourseSection courses={courses} />
        <Divider />
      </section>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
