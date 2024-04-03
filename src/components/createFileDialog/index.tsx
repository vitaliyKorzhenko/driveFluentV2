import * as React from "react";
import {
    Dialog,
    DialogTrigger,
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
import {
    Add24Regular
  } from "@fluentui/react-icons";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { UserProfile } from "../../users";
import { translate } from "../../localization/localization";
const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export interface CreateFileDialogProps {
    refreshFiles?: () => void;
}

export const CreateFileDialog = (props: CreateFileDialogProps) => {
    const styles = useStyles();
    const inputId = useId("input");
    const [fileName, setFileName] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        try {
            const userId = UserProfile.getCurrentUserIdNumber();
            if (!userId) {
                console.error("Error fetching files: User not found");
                return;
            }
            await ApiUserFilesNode.createNewFileNode(fileName, userId);
            //clear input
            setFileName('');
            //close dialog
            setOpen(false);
            //refresh files
            props.refreshFiles && props.refreshFiles();

        } catch (error) {
            console.error("Error fetching files:", error);
            
        }
    };
    return (
        <Dialog 
        modalType="non-modal"
        open={open}
        onOpenChange={(_ev, data) =>
             setOpen(data.open)}
        >
            <DialogTrigger disableButtonEnhancement>
                <Button
                appearance="subtle"
                icon={<Add24Regular/>}
                onClick={() => setOpen(true)}
                >
                    {translate('drive.create', 'Create')}
                </Button>
            </DialogTrigger>
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>Create File</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field required>
                                <Label htmlFor={inputId}>
                                   enter file name
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
                                Save
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
};