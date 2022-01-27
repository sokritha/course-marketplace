import { BaseLayout } from "@components/ui/layout";
import { MarketplaceHeader } from "@components/ui/marketplace";
import { Button, Divider, Message } from "@components/ui/commons";
import { OwnedCourseCard } from "@components/ui/course";
import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link";
import { useWeb3 } from "@components/providers";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const { requireInstall } = useWeb3();

  return (
    <section className="relative max-w-7xl mx-auto flex flex-col items-center">
      <MarketplaceHeader />
      <div className="body-content-layout grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <div>
            <Message type="warning">
              <div>You don&apos;t own any courses</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        )}
        {account.isEmpty && (
          <div>
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}
        {requireInstall && (
          <div>
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}
        {ownedCourses.data?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button label="Watch the course" type="primary" size="big" />
          </OwnedCourseCard>
        ))}
      </div>
      <Divider />
    </section>
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

OwnedCourses.Layout = BaseLayout;
