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
    Textarea,
} from "@fluentui/react-components";
import { UserProfile } from "../../users";
import { ApiUserNode } from "../../api/ApiUser";
import { translate } from "../../localization/localization";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export interface FeedbackDialogProps {
    open: boolean;
    closeDialog: () => void;
}

export const FeedbackDialog = (props: FeedbackDialogProps) => {
    const styles = useStyles();
    const [feedback, setFeedback] = React.useState("");
    const handleSubmit = async(ev: React.FormEvent) => {
        ev.preventDefault();
        alert("form submitted!");

        try {
            const userId = UserProfile.getCurrentUserId();
            if (!userId) {
                console.error("Error fetching files: User not found");
                return;
            }
            if (!feedback || feedback === '') {
                console.error("Error fetching files: Feedback not found");
                return;
            }
            await ApiUserNode.sendFeedback(userId, feedback);
            setFeedback('');
            props.closeDialog();
            //close dialog

        } catch (error) {
            
        }
    };

    React.useEffect(() => {
        setFeedback('');
    }
    , [props.open]);

    return (
        <Dialog 
        modalType="non-modal"
        open={props.open}
        onOpenChange={(_ev, data) => {
            if (!data.open) {
               props.closeDialog();
            }
        }}
        >
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit}>
                    <DialogBody>
                        <DialogTitle>{translate('ui.label.feedback', 'Feedback')}</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Field required>
                                <Textarea
                                    appearance="outline"
                                    placeholder="type here..."
                                    resize="both"
                                    value={feedback}
                                    onChange={(ev) => {
                                        setFeedback(ev.target.value);
                                    
                                    }}
                                />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" appearance="primary">
                                {translate('ui.label.submit', 'Submit')}
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
};