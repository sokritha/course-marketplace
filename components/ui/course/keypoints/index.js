export default function CourseKeypoints({ points }) {
  return (
    <section>
      <div className="bg-white">
        <dl className="space-y-10 tabletLandscape:space-y-0 tabletLandscape:grid tabletLandscape:grid-cols-2 tabletLandscape:gap-x-8 tabletLandscape:gap-y-10">
          {points.map((point, idx) => (
            <div className="relative" key={point}>
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Keypoint {idx + 1}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">{point}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
