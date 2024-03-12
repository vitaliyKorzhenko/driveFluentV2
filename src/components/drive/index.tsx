import { useState, useEffect } from "react";
import { FluentProvider, Theme } from "@fluentui/react-components";
import { MainTopPanel } from "../topPanel";
import { FilesTabs } from "../filesTab";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { IExampleFileNodeModel, IUserFileNodeModel} from "../../types/files";
import { UserProfile } from "../../users";

export interface DriveProps {
    theme: Partial<Theme>;
    changeTheme: () => void;
    changeDriveMode: () => void;
    changeAuth: () => void;
}

export const Drive = (props: DriveProps) => {
    const [exampleFiles, setExampleFiles] = useState<IExampleFileNodeModel[]>([]); 

    const [userFiles, setUserFiles] = useState<IUserFileNodeModel[]>([]);

    useEffect(() => {
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
                let userId = UserProfile.getCurrentUserIdNumber();
                console.log('userId', userId);
                if (!userId) {
                    console.error("Error fetching files: User not found");
                    return;
                }
                let fetchedFiles: IUserFileNodeModel[] = await ApiUserFilesNode.getUserFilesNode(userId);
                console.log('USER FILES', fetchedFiles);
                setUserFiles(fetchedFiles);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        }
        //feth user files

        fetchDataExamles();
        //fetch user files
        fetchUserFiles();
    }, []);

    return (
        <FluentProvider
            theme={props.theme}
            style={{
                height: '100vh',
                width: '100vw',
            }}
        >
            <MainTopPanel
                changeTheme={props.changeTheme}
                changeDriveMode={props.changeDriveMode}
            />
            <FilesTabs 
            examples={exampleFiles}
            userFiles={userFiles}
             />
        </FluentProvider>
    );
};
