import './App.css'
import { useEffect, useState } from 'react'
import { FluentProvider, webLightTheme, webDarkTheme, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components'
import { SpreadsheetComponent } from './components/speadsheet/index.tsx'
import { MainTopPanelSpread } from './components/topPanelSpread/index.tsx'
import Login from './components/loginPage/index.tsx'
import { Drive } from './components/drive/index.tsx'
import { auth } from './firebase/index.tsx'
import { AppConfiguration } from './config/index.ts'
import { ApiUserNode } from './api/ApiUser/index.ts'
import { LocalStorageHelper } from './helpers/localstorageHelper.ts'
import { UserProfile } from './users/index.ts'
function App() {


  const [theme, setTheme] = useState(webDarkTheme);

  const [driveMode, setDriveMode] = useState(true);

  const [isAuth, setIsAuth] = useState(false);

  const changeAuth = () => {
    setIsAuth(!isAuth);
  }

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


  useEffect(() => {
    // init config
    AppConfiguration.initConfig(false);
    // Listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        const email = user.email ? user.email : '';
        // User is signed in
        ApiUserNode.loginWithEmailNode(email).then((res) => {
          console.log('res', res);
          if (!res) {
            console.log('User not found');
          }
          LocalStorageHelper.setUserId(res.toString());
          UserProfile.setCurrentUserId(res.toString());
          
        }
        ).catch((error) => {
          console.log('error', error);
        }); 
        setIsAuth(true);
      } else {
        // User is signed out
        setIsAuth(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!isAuth) {
  return (
    <FluentProvider>
    <Login
    changeAuth={changeAuth}
    />
    </FluentProvider>
  )
  } else {
    if (driveMode) {
     return (
      <Drive
      changeAuth={changeAuth}
      changeDriveMode={changeDriveMode}
      changeTheme={toggleTheme}
      theme={theme}
      />
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
          changeAuth={changeAuth}
          />
          <SpreadsheetComponent/>
          </FluentProvider>
      )
    }
  }
}

export default App
