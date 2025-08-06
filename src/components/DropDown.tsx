import { useState } from "react";

export default function DropDown({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left w-full">
      <button
        className="w-full"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {title}
      </button>

      <div className={`${open ? "block" : "hidden"} w-full`}>
        {" "}
        <div className="grid [grid-template-columns:repeat(7,auto)]">
          {children}
        </div>
      </div>
    </div>
  );
}
