import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="px-4 md:px-20 py-16">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        About <span className="text-primary">FutureResume</span>
      </h2>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Marketplace-pana.svg"
            alt="Marketplace Illustration"
            width={600}
            height={400}
            className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            <span className="font-semibold text-primary">Future Resume</span> is
            a product of <span className="font-semibold">FutureLabs</span> — a
            global innovation & digital skill learning center. Future Resume was
            born of the need to create a new way for job-seekers to connect with
            recruiters.
          </p>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Our best hands got to work with one goal: helping you find a great
            job faster. We ensure that all our template designs meet industry
            standards and are accepted by leading HR departments. With us, you
            can create an impressive resume that makes a lasting first
            impression!
          </p>

          <button className="bg-primary text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-primary/90 transition duration-300">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
