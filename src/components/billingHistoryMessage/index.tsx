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
const intentSuccess: MessageBarIntent = "warning";

const intentMessage: string  = "You do not have an active subscription.";
const intentMessage2: string  = "Upgrade now to unlock the full potential.";


const intentLinkText: string = "Billing history";


export const BillingHistoryIntent = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
        <MessageBar key={intentSuccess} intent={intentSuccess}>
          <MessageBarBody>
            {intentMessage}
            <div>
                {intentMessage2}
            </div>
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