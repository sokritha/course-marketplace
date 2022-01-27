import { useOwnedCourse, useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import {
  Divider,
  Modal,
  HeroSection,
  Button,
  Message,
} from "@components/ui/commons";
import { CourseCurriculum, CourseKeypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import OrderModal from "@components/ui/order/modal";
import { getAllCourses } from "@content/courses/fetcher";
import { withToast } from "@utils/toast";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const RenderStateButton = ({ courseState, modalRef, setNewPurchase }) => {
  if (courseState === "activated")
    return (
      <Button
        type="primary"
        label="Watch"
        size="big"
        handleOnAction={() => {
          console.log("You can watch the tutorial now.");
        }}
      />
    );
  if (courseState === "purchased")
    return (
      <Button
        type="primary"
        label="Waiting For Activation"
        size="big"
        handleOnAction={() => {
          console.log("Please wait until the admin activate your course.");
        }}
      />
    );
  if (courseState === "deactivated")
    return (
      <Button
        type="primary"
        label="Repurchase"
        size="big"
        handleOnAction={() => {
          setNewPurchase(false);
          modalRef.current.toggleModal();
        }}
      />
    );
  return (
    <>
      <Button
        type="primary"
        label="Purchase"
        size="big"
        handleOnAction={() => modalRef.current.toggleModal()}
      />
      <Button
        type="secondary"
        label="Add to watchlist"
        size="big"
        handleOnAction={() => console.log("Watchlist Button Clicked!")}
      />
    </>
  );
};

export default function Course({ course }) {
  const { web3, contract, isLoading } = useWeb3();
  const { account, isConnecting } = useWalletInfo();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const [busyCourse, setBusyCourse] = useState(null);

  const courseState = ownedCourse.data?.state;
  const isLocked =
    !courseState ||
    courseState === "purchased" ||
    courseState === "deactivated";

  const modalRef = useRef(null);

  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);
    const courseHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      {
        type: "address",
        value: account.data,
      }
    );

    const value = web3.utils.toWei(String(order.price));

    setBusyCourse(course.id);
    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      // proof = emailHash + courseHash
      const proof = web3.utils.soliditySha3(
        {
          type: "bytes32",
          value: emailHash,
        },
        { type: "bytes32", value: courseHash }
      );

      withToast(_purchaseCourse(hexCourseId, proof, value));
    } else {
      withToast(_repurchaseCourse(courseHash, value));
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({
          from: account.data,
          value,
        });
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourse(null);
    }
  };

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods.repurchaseCourse(courseHash).send({
        from: account.data,
        value,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourse(null);
    }
  };

  return (
    <>
      <section className="relative">
        <HeroSection
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        >
          {isConnecting ? (
            <Button type="primary" label="Loading" size="big" disabled={true} />
          ) : (
            <RenderStateButton
              courseState={courseState}
              modalRef={modalRef}
              setNewPurchase={setIsNewPurchase}
            />
          )}
        </HeroSection>
        <Modal ref={modalRef}>
          <OrderModal
            course={course}
            isNewPurchase={isNewPurchase}
            handleOnSubmit={(order) => {
              purchaseCourse(order);
              modalRef.current.toggleModal();
              setIsNewPurchase(true);
            }}
            handleOnClose={() => {
              modalRef.current.toggleModal();
              setIsNewPurchase(true);
            }}
          />
        </Modal>
      </section>
      <section className="max-w-7xl mx-auto flex flex-col items-center">
        <Divider />
        <CourseKeypoints points={course.wsl} />
        <Divider size="sm" />
        <div className="body-content-layout">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24hours.{" "}
              <i className="block font-normal">
                In case of any questions, please contact to info@example.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              We wish you happy watching of the course.
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              The course has been deactivated, due to the incorrect purchase
              data. The functionality to watch the course has been temporaly
              disabled.
              <i className="block font-normal">
                Please contact to info@example.com
              </i>
            </Message>
          )}
        </div>
        <Divider size="sm" />
        <CourseCurriculum
          locked={isLocked}
          courseState={courseState}
          isLoading={isLoading}
        />
        <Divider />
      </section>
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((course) => course.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
