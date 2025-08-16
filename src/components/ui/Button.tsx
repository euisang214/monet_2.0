import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary"|"outline"|"ghost";
  loading?: boolean;
};

export default function Button({ className, variant="primary", loading=false, children, ...rest }: Props){
  const base = "btn " + (variant==="primary" ? "btn-primary" : variant==="outline" ? "btn-outline" : "hover:bg-gray-100");
  return (
    <button className={clsx(base, className, loading && "opacity-70")} {...rest}>
      {loading ? "Loading..." : children}
    </button>
  );
}
