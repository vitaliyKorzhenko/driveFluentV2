import './App.css'
import { useState } from 'react'
import { FluentProvider, webLightTheme, webDarkTheme, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components'
import { MainTopPanel } from './components/topPanel/index.tsx'
import { FilesTabs } from './components/filesTab/index.tsx'
function App() {

 
  const [theme, setTheme] = useState(webDarkTheme);

  // Функция для изменения темы
  const toggleTheme = () => {
    // Переключайте между темами при каждом вызове
    //randomTheme();
    //setTheme((prevTheme) => (prevTheme === teamsDarkTheme ? teamsLightTheme : teamsDarkTheme));
    let randomTheme = Math.floor(Math.random() * 3);
    switch (randomTheme) {
      case 0:
        setTheme((prevTheme) => (prevTheme === webDarkTheme ? webLightTheme : webDarkTheme));
        break;
      case 1:
        setTheme((prevTheme) => (prevTheme === teamsDarkTheme ? teamsLightTheme : teamsDarkTheme));
        break;
      case 2:
        setTheme((prevTheme) => (prevTheme === teamsHighContrastTheme ? webLightTheme : teamsHighContrastTheme));
        break;
    }
  };
  

  return (
    <FluentProvider 
    theme={theme} 
    style={{
      height: '100vh',
      width: '100vw',
    }}
    >
        <MainTopPanel changeTheme={toggleTheme}/>
        <FilesTabs/>
      </FluentProvider>
   
  )
}

export default App

