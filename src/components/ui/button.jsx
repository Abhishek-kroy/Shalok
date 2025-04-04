import { cn } from "@/lib/utils"; // Ensure this exists in your project

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}