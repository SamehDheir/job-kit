"use client";
import Button from "../ui/Button";
import Image from "next/image";
import Shape from "../ui/shapes/Shape";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center md:items-start gap-10 py-16">
      <div className="flex-1 text-center lg:text-left mt-16 relative">
        <h1 className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-16">
          Create a <span className="text-primary">resume</span> that secures
          your <span className="text-primary">dream job</span>
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-8 sm:mb-16">
          Build a resume that piques the interest of recruiters and gets you
          hired. It’s fast and easy to use.
        </p>
        <div className="flex justify-center ">
          <Button variant="primary" className="px-20">
            Try for free
          </Button>
          <Shape
            type="rectangle"
            className="absolute bottom-0 right-10 animate-bounce"
          />
        </div>

        <Shape
          type="square"
          className="absolute top-[-50px] left-10 animate-bounce"
        />
      </div>

      <div className="flex-1 relative">
        <Image
          src="/hero-image.svg"
          alt="Hero Image"
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />

        <Shape
          type="square"
          className="absolute bottom-0 right-0 animate-bounce"
        />
        <Shape
          type="triangle"
          className="absolute top-0 right-0 animate-bounce"
          size={70}
        />
      </div>
    </div>
  );
};

export default Hero;
