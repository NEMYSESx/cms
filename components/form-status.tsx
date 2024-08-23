import { FaExclamationTriangle } from "react-icons/fa";
import { CheckCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export interface FormStatusProps {
  message?: string;
  isError?: boolean;
}

export const FormStatus = ({ message, isError }: FormStatusProps) => {
  if (!message) return null;

  return (
    <div
      className={cn("p-2 rounded-md flex items-center gap-x-2 text-sm mt-3", {
        "bg-destructive/15 text-destructive": isError,
        "bg-emerald-500/15 text-emerald-500": !isError,
      })}
    >
      {isError ? (
        <FaExclamationTriangle className="h-4 w-4" />
      ) : (
        <CheckCheckIcon className="h-4 w-4" />
      )}

      <p> {message}</p>
    </div>
  );
};
