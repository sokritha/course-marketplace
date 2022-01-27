import { useRouter } from "next/router";
import Image from "next/image";
import { Message } from "@components/ui/commons";

export default function HeroSection({
  hasOwner,
  title,
  description,
  image,
  children,
}) {
  const router = useRouter();

  return (
    <div className="hero-layout">
      {/* Content */}
      <div className="hero-title-layout">
        <div className="w-9/12 flex flex-col items-center py-8 tabletLandscape:items-start">
          {hasOwner && (
            <span
              className={`text-sm font-bold text-green-700 bg-green-200 rounded-full p-2 mb-2`}
            >
              You are owner of:
            </span>
          )}
          <h1 className="text-4xl text-gray-900 tracking-tight font-extrabold phone:text-center mb-8 tabletLandscape:text-left desktop:text-5xl bigDesktop:text-6xl">
            <span className="block desktop:inline">{title} </span>
            {router.pathname === "/" && (
              <span className="block text-blue-600 desktop:inline">
                developer!
              </span>
            )}
          </h1>
          <p className="text-gray-600 text-lg text-center tabletLandscape:text-left mb-6">
            {description}
          </p>
          <div className="flex gap-2">{children}</div>
        </div>
      </div>

      {/* Image Background */}
      <div className="hero-background-layout">
        <Image
          src={image}
          alt={title}
          className="phone:w-full phone:h-full tabletPortrait:w-11/12 h-11/12 tabletLandscape:w-full tabletLandscape:h-full tabletLandscape:clip-path-slant-up-right"
          layout="fill"
        />
        {/* <img
          src={image}
          alt={title}
          className="phone:w-full phone:h-full tabletPortrait:w-11/12 h-11/12 tabletLandscape:w-full tabletLandscape:h-full tabletLandscape:clip-path-slant-up-right"
        /> */}
      </div>
    </div>
  );
}
