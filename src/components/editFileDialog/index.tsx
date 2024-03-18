import * as React from "react";
import {
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    makeStyles,
    Field,
    Label,
    Input,
    useId,
} from "@fluentui/react-components";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { UserProfile } from "../../users";
const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export interface EditFileDialogProps {
    refreshFiles?: () => void;
    open: boolean;
    fileId: number;
    fileName: string;
    closeDialog: () => void;
}

export const EditFileDialog = (props: EditFileDialogProps) => {
    const styles = useStyles();
    const inputId = useId("input");
    const [fileId, setFileId] = React.useState<number>(props.fileId);
    const [fileName, setFileName] = React.useState(props.fileName);
  
      React.useEffect(() => {
        setFileId(props.fileId);
        setFileName(props.fileName);
    }, [props.open]);

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        try {
            const userId = UserProfile.getCurrentUserIdNumber();
            if (!userId) {
                console.error("Error fetching files: User not found");
                return;
            }
            if (!fileId || fileId === 0) {
                console.error("Error fetching files: File not found");
                return;
            }

            if (!fileName || fileName === '') {
                console.error("Error fetching files: File name not found");
                return;
            }
            await ApiUserFilesNode.renameFileNode(fileId, fileName);
            //clear input
            props.closeDialog();
            props.refreshFiles && props.refreshFiles();

        } catch (error) {
            console.error("Error fetching files:", error);
            
        }
    };
    return (
        <Dialog 
        modalType="non-modal"
        open={props.open}
        onOpenChange={(_ev, data) => 
            data.open ? null : props.closeDialog()}
        >
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Rename File</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field required>
                                <Label htmlFor={inputId}>
                                   rename your file
                                </Label>
                                <Input 
                                id={inputId} 
                                value={fileName}
                                onChange={(ev) => setFileName(ev.target.value)}
                                />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" appearance="primary">
                                Rename
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
};