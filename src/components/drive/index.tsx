import { useState, useEffect } from "react";
import { FluentProvider, Theme } from "@fluentui/react-components";
import { MainTopPanel } from "../topPanel";
import { FilesTabs } from "../filesTab";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { IExampleFileNodeModel} from "../../types/files";

export interface DriveProps {
    theme: Partial<Theme>;
    changeTheme: () => void;
    changeDriveMode: () => void;
    changeAuth: () => void;
}

export const Drive = (props: DriveProps) => {
    const [files, setFiles] = useState<IExampleFileNodeModel[]>([]); // Change 'any' to the type of your files

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('go GET EXAMPLES');
                let fetchedFiles: IExampleFileNodeModel[] = await ApiUserFilesNode.getExamplesFilesNode();
                console.log('fetchedFiles', fetchedFiles);
                setFiles(fetchedFiles);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchData();
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
            <FilesTabs examples={files} />
        </FluentProvider>
    );
};
