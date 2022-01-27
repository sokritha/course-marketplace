import Image from "next/image";
import Link from "next/link";

import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";

export default function CourseCard({ course }) {
  return (
    <div className="product-card">
      <div className="product-card-image-vertical">
        <Image
          src={course.coverImage}
          alt={course.title}
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="product-card-content-vertical">
        <Link href={`/courses/${course.slug}`}>
          <a className="text-base font-semibold mb-1 bigDesktop:text-xl line-clamp-2">
            {course.title}
          </a>
        </Link>
        <p className="text-gray-500 text-xs mb-1">{course.author}</p>
        <div className="flex items-center mb-1">
          <span>4.6</span>
          <span className="flex ml-1">
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconOutline className="w-4 stroke-yellow-400" />
          </span>
          <span className="text-gray-500 text-xs ml-1">
            ({course.numberOfStudent})
          </span>
        </div>
        <p className="font-bold text-black text-base">${course.price}</p>
        <span className="text-xs inline-block mt-1 py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-600 text-white rounded-full">
          {course.type}
        </span>
      </div>
    </div>
  );
}

export function CourseCardHorizontal({ course }) {
  return (
    <div className="product-card flex">
      <div className="product-card-image-horizontal">
        <Image
          src={course.coverImage}
          alt={course.title}
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="product-card-content-horizontal">
        <Link href={`/courses/${course.slug}`}>
          <a className="text-base font-semibold mb-1 bigDesktop:text-xl line-clamp-2">
            {course.title}
          </a>
        </Link>
        <p className="text-gray-500 text-xs mb-1">{course.author}</p>
        <div className="flex items-center mb-1">
          <span>4.6</span>
          <span className="flex ml-1">
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconSolid className="w-4 stroke-yellow-400 fill-yellow-400" />
            <StarIconOutline className="w-4 stroke-yellow-400" />
          </span>
          <span className="text-gray-500 text-xs ml-1">
            ({course.numberOfStudent})
          </span>
        </div>
        <p className="font-bold text-black text-base">${course.price}</p>
        <span className="text-xs inline-block mt-1 py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-600 text-white rounded-full">
          {course.type}
        </span>
      </div>
    </div>
  );
}
