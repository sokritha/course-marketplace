import {
  AcademicCapIcon,
  LibraryIcon,
  BeakerIcon,
} from "@heroicons/react/outline";


const features = [
  {
    name: "Academic",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AcademicCapIcon,
  },
  {
    name: "Library",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LibraryIcon,
  },
  {
    name: "Researcher",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: BeakerIcon,
  },
];

export default function Footer() {

  return (
    <footer>
      <div className="p-10 bg-gray-800 text-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 tabletLandscape:grid-cols-2 desktop:grid-cols-4 gap-2">
            <div className="mb-5">
              <h4 className="text-2xl pb-4">Company</h4>
              <p className="text-gray-500">
                St. 123, District Toul Tumpong II <br />
                Commune ChamkarMon, Phnom Penh <br />
                Cambodia <br />
                <br />
                <strong>Phone:</strong>+855 23 123 123 123 <br />
                <strong>Email:</strong>info@company.com
                <br />
              </p>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">Useful Links</h4>
              <ul className="text-gray-500">
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Home
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    About us
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Services
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Terms of services
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">Our Course</h4>
              <ul className="text-gray-500">
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Web Development
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Software Development
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Web Design
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Marketing
                  </a>
                </li>
                <li className="pb-4">
                  <a href="#" className="hover:text-yellow-500">
                    Graphic design
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="pb-4">Join our Newsletter</h4>
              <p className="text-gray-500 pb-2">
                Join 25,000+ others and never miss out no new tips, tutorials,
                and more
              </p>
              <form className="flex flex-row flex-wrap">
                <input
                  type="text"
                  name=""
                  id=""
                  className="text-gray-500 w-2/3 p-2 focus:border-yellow-500"
                  placeholder="email@example.com"
                />
                <button className="p-2 w-1/3 bg-yellow-500 text-white hover:bg-yellow-600">
                  Subscribe
                </button>
              </form>
              <h4 className="mt-5 pb-4">Follows Us</h4>
              <div className="flex flex-row">
                {features.map((feature) => (
                  <div
                    className="flex items-center justify-center h-12 w-12 mr-2 bg-yellow-500 text-white "
                    key={feature.name}
                  >
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
