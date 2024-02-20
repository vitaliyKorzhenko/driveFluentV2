import * as React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { CommandsButton } from "../commandButton";
import { BasicCard } from "../basicCard";
import { SeachCommandsInput } from "../seachCommandsInput";

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
      ...shorthands.gap("10px"),
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


export const CardsPanel = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customSize] = React.useState(400);


  const basicCardNames = [
    "Basic",
    "ANOVA/MV",
    "Regression",
    "Nonparametric",
    "Time Series",
    "Survival",
    "Data",
    "Charts",
  ]

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
           <CommandsButton/>
           <SeachCommandsInput/>
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.root}>
      <div>
        {
            basicCardNames.map((name) => {
                return <BasicCard name={name}/>
            })
        }
      </div>

          </div>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Open Commands
        </Button>
      </div>
    </div>
  );
};
