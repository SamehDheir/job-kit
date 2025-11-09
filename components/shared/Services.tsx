import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10  py-16">
      {/* Left Section - Text */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h3 className="text-primary text-lg font-semibold uppercase tracking-wide">
          Our Services
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          You can always pick any template you like
        </h2>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          Choose from one of our expertly prepared resume types below. By using
          pre-established parts that have been endorsed by recruiters
          internationally, you can begin creating your resume in under 5
          seconds. Additionally, you can edit it to fit your preferences and
          personality before clicking{" "}
          <span className="font-semibold">Download</span>. Even if you have
          never created a resume before — it’s that SIMPLE to use!
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/Marketplace-pana.svg"
          alt="Marketplace Illustration"
          width={600}
          height={400}
          className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-2xl shadow-md"
        />
      </div>
    </section>
  );
};

export default Services;
