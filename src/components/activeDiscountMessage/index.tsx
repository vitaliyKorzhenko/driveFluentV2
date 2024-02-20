import {
  MessageBar,
  MessageBarBody,
  MessageBarIntent,
  Link,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

const useClasses = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("10px"),
  },
});
const intentSuccess: MessageBarIntent = "success";

const intentMessage: string  = "Activate today and get a lifetime discount.";

const intentLinkText: string = "Are you a student, a researcher or an academic?";


export const ActiveDiscountIntent = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
        <MessageBar key={intentSuccess} intent={intentSuccess}>
          <MessageBarBody>
            {intentMessage}
            <div>
                <Link href="https://www.microsoft.com" target="_blank">
                    {intentLinkText}
                </Link>
            </div>
          </MessageBarBody>
        </MessageBar>
     
    </div>
  );
};