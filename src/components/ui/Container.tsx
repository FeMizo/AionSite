import { cn } from "@/src/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Container = ({ children, className, as: Component = "div" }: ContainerProps) => {
  return (
    <Component className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
};
