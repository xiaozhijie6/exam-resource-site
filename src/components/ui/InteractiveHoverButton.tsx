import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
}

const InteractiveHoverButton = forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", icon, className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`group relative w-full cursor-pointer overflow-hidden rounded-full border border-slate-200 bg-white px-6 py-3 text-center font-semibold text-slate-900 transition-colors hover:border-academic-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {/* Default text — slides right and fades on hover */}
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {text}
        </span>
        {/* Hover text — slides in from left */}
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-full bg-academic-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>{text}</span>
          {icon || <ArrowRight className="h-4 w-4" />}
        </div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
