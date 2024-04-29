import { useState, useEffect } from "react";
import { FluentProvider, Theme } from "@fluentui/react-components";
import { MainTopPanel } from "../topPanel";
import { FilesTabs } from "../filesTab";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { IExampleFileNodeModel, IUserFileNodeModel} from "../../types/files";
import { UserProfile } from "../../users";
import { useProgressBar } from "../progressBar/progressContext"; // Импорт контекста прогресса
import { Progress } from "../progressBar";

export interface DriveProps {
    theme: Partial<Theme>;
    changeTheme: () => void;
    changeDriveMode: () => void;
    changeAuth: () => void;
    updateLanguage: (langCode: string) => void;

}

export const Drive = (props: DriveProps) => {
    const [exampleFiles, setExampleFiles] = useState<IExampleFileNodeModel[]>([]); 

    const [userFiles, setUserFiles] = useState<IUserFileNodeModel[]>([]);

    const [trashedUserFiles, setTrashedUserFiles] = useState<IUserFileNodeModel[]>([]);

    const { startProgressBar, stopProgressBar } = useProgressBar(); // Получение функции для изменения прогресса

    const fetchDataExamles = async () => {
        try {
            console.log('go GET EXAMPLES');
            let fetchedFiles: IExampleFileNodeModel[] = await ApiUserFilesNode.getExamplesFilesNode();
            console.log('fetchedFiles', fetchedFiles);
            setExampleFiles(fetchedFiles);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const fetchUserFiles = async () => {
        try {
            console.log('go GET USER FILES');
            startProgressBar(); // Запуск прогресса
            let userId = UserProfile.getCurrentUserIdNumber();
            console.log('userId', userId);
            if (!userId) {
                console.error("Error fetching files: User not found");
                return;
            }
            // startProgressBar(); // Запуск прогресса
            let fetchedFiles: IUserFileNodeModel[] = await ApiUserFilesNode.getUserFilesNode(userId);
            //filter trashed files
            let userFiles = fetchedFiles.filter((file) => !file.is_trashed);
            console.log('USER FILES', fetchedFiles);
            let trashedFiles = fetchedFiles.filter((file) => file.is_trashed);
            stopProgressBar(); // Остановка прогресса
            setUserFiles(userFiles);
            setTrashedUserFiles(trashedFiles);
            // stopProgressBar(); // Остановка прогресса
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }
    useEffect(() => {
       
        //feth user files
        fetchUserFiles();
        fetchDataExamles();
        //fetch user files
      
    }, []);

    return (
        <FluentProvider
            theme={props.theme}
            style={{
                height: '100vh',
                width: '100vw',
                // padding: '0px',
                // margin: '0px',
                
            }}
        >
            <MainTopPanel
                changeTheme={props.changeTheme}
                changeDriveMode={props.changeDriveMode}
                updateLanguage={props.updateLanguage}
                theme={props.theme}
            />
            <FilesTabs 
            examples={exampleFiles}
            userFiles={userFiles}
            refreshFiles={fetchUserFiles}
            trashFiles={trashedUserFiles}
            changeDriveMode={props.changeDriveMode}
             />
              <Progress/>
        </FluentProvider>
    );
};


