import { BaseLayout } from "@components/ui/layout";
import { MarketplaceHeader } from "@components/ui/marketplace";
import { Button, Divider, Message } from "@components/ui/commons";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useState } from "react";
import { useWeb3 } from "@components/providers/web3";
import { normalizeOwnedCourse } from "@utils/normalize";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 phone:text-sm border-gray-300 rounded-md"
        placeholder="0x1234ab..."
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <div className="ml-2" />
      <Button
        label="Verify"
        type="primary"
        size="big"
        handleOnAction={() => {
          onVerify(email);
        }}
      />
    </div>
  );
};

export default function ManagedCourses() {
  const [proofOwnership, setProofOwnership] = useState({});
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({ state: "all" });
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { web3, contract } = useWeb3();
  const { managedCourses } = useManagedCourses(account);

  const verifyCourse = (email, { hash, proof }) => {
    if (!email) return;
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: hash,
      }
    );
    proofToCheck === proof
      ? setProofOwnership({
          ...proofOwnership,
          [hash]: true,
        })
      : setProofOwnership({
          ...proofOwnership,
          [hash]: false,
        });
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({
        from: account.data,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const activateCourse = async (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  const deactivateCourse = async (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  const searchCourse = async (courseHash) => {
    const re = /[0-9A-Fa-f]{6}/g;

    if (courseHash && courseHash.length == 66 && re.test(courseHash)) {
      const course = await contract.methods.getCourseByHash(courseHash).call();

      if (course.owner != "0x0000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)({ courseHash }, course);
        setSearchedCourse(normalized);
        return;
      }
    }

    setSearchedCourse(null);
  };

  const renderCard = (course, isSearched) => {
    return (
      <ManagedCourseCard
        key={course.ownedCourseId}
        course={course}
        isSearched={isSearched}
      >
        <VerificationInput
          onVerify={(email) => {
            verifyCourse(email, {
              hash: course.hash,
              proof: course.proof,
            });
          }}
        />
        {proofOwnership[course.hash] && (
          <div className="mt-2">
            <Message>Verified!</Message>
          </div>
        )}
        {proofOwnership[course.hash] === false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof</Message>
          </div>
        )}
        {course.state === "purchased" && (
          <div className="mt-4">
            <Button
              label="Activate"
              type="green"
              size="big"
              handleOnAction={() => activateCourse(course.hash)}
            />
            <span className="ml-2" />
            <Button
              label="Deactivate"
              type="red"
              size="big"
              handleOnAction={() => deactivateCourse(course.hash)}
            />
          </div>
        )}
      </ManagedCourseCard>
    );
  };

  if (!account.isAdmin) {
    return null;
  }

  const filteredCourses = managedCourses.data
    ?.filter((course) => {
      if (filters.state === "all") return true;
      return course.state === filters.state;
    })
    .map((course) => renderCard(course));

  return (
    <section className="relative max-w-7xl mx-auto flex flex-col items-center">
      <MarketplaceHeader />
      <div className="body-content-layout grid grid-cols-1">
        <CourseFilter
          onSearchSubmit={searchCourse}
          onFilterSelect={(value) => setFilters({ state: value })}
        />
        {searchedCourse && (
          <div>
            <h1 className="text-2xl font-bold p-5">Search:</h1>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h1 className="text-2xl font-bold p-5">All Courses:</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && (
          <Message type="warning">No Courses to display</Message>
        )}
      </div>
      <Divider />
    </section>
  );
}

ManagedCourses.Layout = BaseLayout;
