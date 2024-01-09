import React from "react";
import { useTheme } from "@/context/themeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeBtn = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <div className="p-2 flex-between">
      <label htmlFor="themeToggle" className="cursor-pointer">
        {themeMode === "dark" ? (
          <MoonIcon className="h-[30px] w-[30px] text-blue-900" />
        ) : (
          <SunIcon className="h-[30px] w-[30px] text-green-300" />
        )}
        <input
          type="checkbox"
          id="themeToggle"
          checked={themeMode === "dark"}
          onChange={onChangeBtn}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ThemeBtn;
