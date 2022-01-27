import { Divider, HeroSection, Button } from "@components/ui/commons";
import { CourseSection } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

const homePage = {
  title: "Grow your career as a",
  description:
    "Learn programming and web development the easy way! Get unlimited access to all of our clurses.",
  image:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
};

export default function Home({ courses }) {
  return (
    <>
      <section className="relative">
        <HeroSection
          title={homePage.title}
          description={homePage.description}
          image={homePage.image}
        >
          <Button
            type="primary"
            label="Get Started"
            size="big"
            handleOnAction={() => console.log("Get Started Button Clicked!")}
          />
        </HeroSection>
      </section>
      <section className="relative max-w-7xl mx-auto flex flex-col items-center">
        <Divider />
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

Home.Layout = BaseLayout;
