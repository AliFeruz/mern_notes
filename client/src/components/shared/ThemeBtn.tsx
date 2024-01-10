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
          <div className="flex gap-4 items-center">
          <MoonIcon className="h-[30px] w-[30px] text-cyan-900" />
          <p className="text-zinc-800 text-xl">Change Theme</p>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
          <SunIcon className="h-[30px] w-[30px] text-cyan-600" />
          <p className="text-cyan-500 text-xl">Change Theme</p>
          </div>
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
