import React from "react";

import { CustomCheckboxProps } from "@/types/ui.types";
import { Checkbox } from "./checkbox";

// const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
//   return (
//     <label className="relative inline-block cursor-pointer">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="peer hidden"
//       />

//       <span
//         className="
//           w-[18px] h-[18px]
//           rounded-[6px]
//           bg-[#4D4F521A]
//           shadow-[0px_0px_2px_0.2px_#4D4F5240]
//           inline-block
//           transition-all
//           peer-checked:bg-[#4D4F52]
//         "
//       />


//       <span
//         className="
//           pointer-events-none
//           absolute top-[1px] left-[4px]
//           text-white text-[12px]
//           opacity-0 peer-checked:opacity-100
//           transition-opacity
//         "
//       >
//         ✔
//       </span>
//     </label>
//   );
// };

// export default CustomCheckbox;


function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => onChange(!!value)}
    />
  );

}

export default CustomCheckbox;