import Shape from "@/components/ui/shapes/Shape";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Pick a Template",
    description: "Fill in the blanks and see results in real-time.",
    image: "/resumeSteps/step1.png",
  },
  {
    id: 2,
    title: "Customize Your Layout",
    description: "Give your document a professional and elegant look.",
    image: "/resumeSteps/step2.png",
  },
  {
    id: 3,
    title: "Hit 'Download!'",
    description: "Download your resume, apply, get more interviews.",
    image: "/resumeSteps/step3.png",
  },
];
const ResumeSteps = () => {
  return (
    <div className="py-16 px-4 md:px-20">
      <h2 className="text-center text-5xl font-bold mb-12">
        Build your <span className="text-primary">resume</span> in 3 steps
      </h2>

      <div className="flex flex-col gap-8 relative">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center rounded-2xl p-6 text-center
              ${step.id === 2 ? "ml-auto" : ""} `}
          >
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-primary flex gap-6">
              <h2 className="text-6xl font-bold">{step.id}.</h2>
              <div>
                <h3 className="text-4xl font-bold mb-2">{step.title}</h3>
                <p className="text-md">{step.description}</p>
              </div>
            </div>
          </div>
        ))}

        <Shape
          type="triangle"
          className="absolute bottom-48 right-10 animate-bounce"
          size={70}
        />
        <Shape
          type="square"
          className="absolute top-10 right-10 animate-bounce"
          size={70}
        />
        <Shape
          type="rectangle"
          className="absolute top-64 left-96 animate-bounce"
          size={70}
        />
      </div>
    </div>
  );
};

export default ResumeSteps;
