import React from "react";
import { FluentProvider, Theme } from "@fluentui/react-components";
import { MainTopPanelSpread } from "../topPanelSpread";
import { SpreadsheetComponent } from "../speadsheet";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";


export interface SpreadProps {
  theme: Partial<Theme>;
  changeTheme: () => void;
  changeDriveMode: () => void;
  changeAuth: () => void;
  fileId: number;
  src: string;
}

class MainSpread extends React.Component<SpreadProps> {

   

    constructor(props: SpreadProps) {
        super(props);
    }


   async componentDidMount() {
     try {
      console.log('MainSpread componentDidMount');
      let file = await ApiUserFilesNode.openFileNode(this.props.fileId);

      console.log(file);
      let fileData = file.file_data;
      let data = JSON.parse(fileData);
      console.log('DATA',typeof data);
      let objData = JSON.parse(data);
     
      if (objData.workbook !== undefined) {
        console.log('Workbook exists in data');
        const workbook = objData.workbook;
        // Теперь у вас есть доступ к объекту 'workbook', вы можете выполнять с ним необходимые операции
        console.log('Workbook:', workbook);
        let sheet = workbook.sheets["Sheet1"];
        console.log('Sheet:', sheet);
    } else {
        console.log('Workbook does not exist in data');
    }
      
     } catch (error) {
        console.error('MainSpread Error: ', error);
      
     }
   }

  

  render() {
    return (
      <FluentProvider
        theme={this.props.theme}
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <MainTopPanelSpread
          changeTheme={this.props.changeTheme}
          changeDriveMode={this.props.changeDriveMode}
          changeAuth={this.props.changeAuth}
        />
        <SpreadsheetComponent />
      </FluentProvider>
    );
  }




 
}

export { MainSpread };
