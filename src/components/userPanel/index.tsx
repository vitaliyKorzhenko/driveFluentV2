import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Label,
  useId,
  tokens,
  makeStyles,
  Input,
  shorthands,
  Persona,
  ToolbarButton,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { PersonRegular, PhoneRegular, MailRegular, People24Regular } from "@fluentui/react-icons";
import { SubscriptionButton } from "../subscritionButton";
import { LogoutButton } from "../logoutButton";
import { AccountButton } from "../accountButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
  main: {
    display: "grid",
    justifyContent: "flex-start",
    gridRowGap: tokens.spacingVerticalXXL,
  },

  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },
});


export const UserPanel = () => {
  const styles = useStyles();
 

  const [open, setOpen] = React.useState(false);
  const [customSize] = React.useState(400);

  const beforeId = useId("content-before");


  return (
    <div>
      <OverlayDrawer
        open={open}
        position="end"
        onOpenChange={(_, state) => setOpen(state.open)}
        style={{ width: `${customSize}px` }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
           <AccountButton/>
           <SubscriptionButton/>
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.root}>
            <div>
            <Persona
        presence={{ status: "available" }}
        size="medium"
        name="Vitaliy Korzhenko"
        avatar={{ color: "colorful" }}
        secondaryText="vitaliykorzenkoua@gmail.com"
      />
            </div>
          
            <div>
              <Label htmlFor={beforeId}>First name</Label>
              <Input contentBefore={<PersonRegular />} id={beforeId} />
      </div>
      <div>
              <Label htmlFor={beforeId}>Last name</Label>
              <Input contentBefore={<PersonRegular />} id={beforeId} />
      </div>
      <div>
              <Label htmlFor={beforeId}>Phone</Label>
              <Input contentBefore={<PhoneRegular/>} id={beforeId} />
      </div>
      <div>
              <Label typeof="email" htmlFor={beforeId}>Email</Label>
              <Input contentBefore={<MailRegular/>} id={beforeId} />
      </div>
            <div>
              <LogoutButton/>
            </div>
          </div>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
      <ToolbarButton
      aria-label="User"
      icon={<People24Regular />} 
      onClick={() => setOpen(true)}
    />
      </div>
    </div>
  );
};
