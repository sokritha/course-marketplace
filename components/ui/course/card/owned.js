import Image from "next/image";

const STATE_COLORS = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red",
};

export default function OwnedCourseCard({ children, course }) {

  return (
    <div className="bg-white border shadow overflow-hidden phone:rounded-lg mb-3">
      <div className="flex flex-col tabletLandscape:flex-row">
        <div className="flex-1">
          <div className="relative w-full h-72 tabletLandscape:h-full next-image-wrapper">
            <Image
              src={course.coverImage}
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="flex items-center justify-between text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{course.title}</span>
              <span
                className={`text-xs text-${STATE_COLORS[course.state]}-700 bg-${
                  STATE_COLORS[course.state]
                }-200 rounded-full p-2`}
              >
                {course.state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.price} ETH
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5  sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.ownedCourseId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Proof</dt>
                <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
