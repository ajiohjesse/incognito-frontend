import { LoaderCircleIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface SpinnerProps {
  loading: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
  spinnerClassName?: string;
  childrenClassName?: string;
}

const Spinner = ({
  loading,
  title,
  children,
  className,
  spinnerClassName,
  childrenClassName,
}: SpinnerProps) => {
  return (
    <span className={cn("relative w-max", className)}>
      {loading && (
        <span className="absolute inset-0 grid place-items-center">
          <LoaderCircleIcon
            className={cn(
              "size-4 animate-spin duration-1000 will-change-transform",
              spinnerClassName,
            )}
          />
          <span className="sr-only">{title}</span>
        </span>
      )}
      <span
        className={cn(loading ? "invisible" : "visible", childrenClassName)}
      >
        {children}
      </span>
    </span>
  );
};

export default Spinner;
