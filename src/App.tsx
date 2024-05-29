import './App.css'
import { useEffect, useState } from 'react'
import { FluentProvider, webLightTheme, webDarkTheme, teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components'
import Login from './components/loginPage/index.tsx'
import { Drive } from './components/drive/index.tsx'
import { auth } from './firebase/index.tsx'
import { AppConfiguration } from './config/index.ts'
import { ApiUserNode } from './api/ApiUser/index.ts'
import { LocalStorageHelper } from './helpers/localstorageHelper.ts'
import { UserProfile } from './users/index.ts'
import { ProgressBarProvider } from './components/progressBar/progressContext.tsx'
import { MainSpread } from './components/spread/index.tsx'
import { activateLanguage } from './localization/localization.ts'
function App() {


  const [theme, setTheme] = useState(webDarkTheme);

  const [driveMode, setDriveMode] = useState(true);

  const [isAuth, setIsAuth] = useState(false);
  
  let loclastrgLanguage = LocalStorageHelper.getCurrentLanguage() ? LocalStorageHelper.getCurrentLanguage() : 'en';

  const [currentLanguage, setCurrentLanguage] = useState(loclastrgLanguage);

  const [fileName, setFileName] = useState('Test FileName');

  const setFileNameHandler = (name: string) => {
    setFileName(name);
  }

  const changeAuth = () => {
    setIsAuth(!isAuth);
  }

  const changeDriveMode = () => {
    console.log('changeDriveMode');
    setDriveMode(!driveMode);
  }

  const updateLanguage = (langCode: string) => {
    console.log('updateLanguage', langCode);

    //set code to local storage
    LocalStorageHelper.setCurrentLanguage(langCode);
    activateLanguage(langCode);
    setCurrentLanguage(langCode);
  }
  // Функция для изменения темы
  const toggleTheme = () => {
    // Переключайте между темами при каждом вызове
    //randomTheme();
    //setTheme((prevTheme) => (prevTheme === teamsDarkTheme ? teamsLightTheme : teamsDarkTheme));
    let randomTheme = Math.floor(Math.random() * 2);
    switch (randomTheme) {
      case 0:
        setTheme((prevTheme) => (prevTheme === webDarkTheme ? webLightTheme : webDarkTheme));
        break;
      case 1:
        setTheme((prevTheme) => (prevTheme === teamsDarkTheme ? teamsLightTheme : teamsDarkTheme));
        break;
    }
  };


  useEffect(() => {
    // init config
    AppConfiguration.initConfig(false);

    activateLanguage(currentLanguage ? currentLanguage : 'en');
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
      <FluentProvider theme={theme}>
      <ProgressBarProvider>
      <Drive
      changeAuth={changeAuth}
      changeDriveMode={changeDriveMode}
      changeTheme={toggleTheme}
      updateLanguage={updateLanguage}
      setFileNameHandler={setFileNameHandler}

      />
      </ProgressBarProvider>
      </FluentProvider>
     )
    } else {
      return (
      <FluentProvider theme={theme}>
        <MainSpread
        changeAuth={changeAuth}
        changeDriveMode={changeDriveMode}
        changeTheme={toggleTheme}
        fileId={2}
        fileName={fileName}
        src='files'
        updateLanguage={updateLanguage}
        />
      </FluentProvider>
      )
    }
  }
}

export default App
