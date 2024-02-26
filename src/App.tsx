import './App.css'
import { useState } from 'react'
import { FluentProvider, webLightTheme, webDarkTheme, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components'
import { MainTopPanel } from './components/topPanel/index.tsx'
import { FilesTabs } from './components/filesTab/index.tsx'
import { SpreadsheetComponent } from './components/speadsheet/index.tsx'
import { MainTopPanelSpread } from './components/topPanelSpread/index.tsx'
function App() {


  const [theme, setTheme] = useState(webDarkTheme);

  const [driveMode, setDriveMode] = useState(true);

  const changeDriveMode = () => {
    console.log('changeDriveMode');
    setDriveMode(!driveMode);
  }
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
  
  if (driveMode) {

  return (
    <FluentProvider 
    theme={theme} 
    style={{
      height: '100vh',
      width: '100vw',
    }}
    >
        <MainTopPanel 
        changeTheme={toggleTheme}
        changeDriveMode={changeDriveMode}
        />
        <FilesTabs/>
      </FluentProvider>
   
  )
} else {
  return (
    <FluentProvider 
    theme={theme} 
    style={{
      height: '100vh',
      width: '100vw',
    }}
    >
      <MainTopPanelSpread 
      changeTheme={toggleTheme}
      changeDriveMode={changeDriveMode}
      />
      <SpreadsheetComponent/>
      </FluentProvider>
  )
}
}

export default App
