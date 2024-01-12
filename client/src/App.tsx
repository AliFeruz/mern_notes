import { Route, Routes } from "react-router-dom"
import SignUpForm from "./pages/_auth/SignUpForm"
import SignInForm from "./pages/_auth/SignInForm"
import { Toaster } from "./components/ui/toaster"
import AuthLayout from "./pages/_auth/AuthLayout"
import Home from "./pages/_root/Home"
import RootLayout from "./pages/_root/RootLayout"
import { useEffect, useState } from "react"
import CreateNote from "./pages/_root/CreateNote"
import Profile from "./pages/_root/Profile"
import { ThemeProvider } from "./context/themeContext"
import NotFound from "./pages/NotFound"
import UpdateNote from "./pages/_root/UpdateNote"


function App() {
  const [isTopofPage, setIsTopofPage] = useState<boolean>(true);
  const [themeMode, setThemeMode] = useState('light');

  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopofPage(true);
      }
      if (window.scrollY !== 0) setIsTopofPage(false);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.querySelector('html')?.classList.remove('dark', 'light');
      document.querySelector('html')?.classList.add(themeMode);
    };
  }, [themeMode]);

  return (
    <main className="flex h-screen">
      <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <Routes>
      <Route element={<AuthLayout/>}>
      <Route path="/sign-up" element={<SignUpForm/>}/>
      <Route path="/sign-in" element={<SignInForm/>}/>
      </Route>
      <Route element={<RootLayout
      isTopofPage={isTopofPage}/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/createnote" element={<CreateNote/>}/>
      <Route path="/update-note/:_id" element={<UpdateNote/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="/*" element={<NotFound/>}/>
     </Routes>
      </ThemeProvider>
     <Toaster/>
    </main>
  )
}

export default App
