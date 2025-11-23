import { TButton } from "@/types/button.types";

const Button = ({
  children,
  variant,
  className,
  type = "button",
  disabled,
  onClick,
}: TButton) => {
  const baseClasses =
    "px-6 py-2 rounded-md transition-all duration-200 font-medium hover:scale-105";

  let variantClasses = "";

  if (variant === "primary") {
    variantClasses = "bg-primary text-white hover:bg-[#E04E00] cursor-pointer";
  } else if (variant === "secondary") {
    variantClasses =
      "border border-primary text-primary hover:bg-gray-50 cursor-pointer";
  } else if (variant === "outline") {
    variantClasses =
      "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer";
  } else if (variant === "danger") {
    variantClasses = "bg-error text-white hover:bg-[#b80000] cursor-pointer";
  } else {
    variantClasses = "bg-primary text-white hover:bg-[#E04E00] cursor-pointer";
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
