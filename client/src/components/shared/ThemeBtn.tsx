import { useTheme } from "@/context/themeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

const ThemeBtn = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  

  const onChangeBtn = () => {
    themeMode === "dark" ? lightTheme() : darkTheme();
  };

  return (
    <div className="flex-between">
        {themeMode === "dark" ? (
          <Button variant="ghost" className="shad-button_ghost" onClick={onChangeBtn}>
          <MoonIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
          <p className="text-zinc-800 dark:text-cyan-500 text-xl">Change Theme</p>
           </Button>
          
        ) : (
          <Button variant="ghost" className="shad-button_ghost" onClick={onChangeBtn}>
          <SunIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
          <p className="text-zinc-800 dark:text-cyan-500 text-xl">Change Theme</p>
           </Button>
        )}
       
      
    </div>
  );
};

export default ThemeBtn;
