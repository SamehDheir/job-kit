import { IShape } from "@/types/shape.types";
import Image from "next/image";

const Shape: React.FC<IShape> = ({ type, className, size = 50 }) => {
  const srcMap: Record<IShape["type"], string> = {
    triangle: "/shapes/triangle.svg",
    square: "/shapes/square.svg",
    rectangle: "/shapes/rectangle.svg",
  };

  return (
    <Image
      src={srcMap[type]}
      alt={`${type} shape`}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Shape;
