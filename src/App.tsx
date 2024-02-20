import './App.css'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { MainTopPanel } from './components/topPanel/index.tsx'
import { FilesTabs } from './components/filesTab/index.tsx'
function App() {

  return (
    <FluentProvider theme={webLightTheme}>
        <MainTopPanel/>
        <FilesTabs/>
      </FluentProvider>
   
  )
}

export default App

