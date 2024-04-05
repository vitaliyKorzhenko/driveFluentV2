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
import { SeachCommandsInput } from "../seachCommandsInput";
import { Subscriptions } from "../../types";
import { TitleButton } from "../titleButton";
import { CommandCard } from "../commandCard";

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

export interface ChildCardProps {
    title: string;
    subcription: Subscriptions;
    description: string;
}

export const CardsChildPanel = () => {
  const styles = useStyles();


  const [open, setOpen] = React.useState(false);
  const [customSize] = React.useState(400);


  const childCards: ChildCardProps[] = [
    {
        title: "Descriptive Statistics",
        subcription: Subscriptions.FREE,
        description: "Descriptive Statistics"
    },
    {
        title: "Descriptive Statistics (use group variable)",
        subcription: Subscriptions.PRO,
        description: "Descriptive Statistics (use group variable)"
    },
    {
        title: 'One Sample T-Test',
        subcription: Subscriptions.PRO,
        description: 'One Sample T-Test'
    },
    {
        title: 'One Sample T-Test for Mean',
        subcription: Subscriptions.PRO,
        description: 'One Sample T-Test for Mean'

    },
    {
        title: 'Compare Means [T-Test]',
        subcription: Subscriptions.PRO,
        description: 'Compare Means [T-Test]'
    },
    {
        title: 'Compare Means (use summarized data)',
        subcription: Subscriptions.PRO,
        description: 'Compare Means (use summarized data)'
    },
    {
        title: 'Two-Sample z-Test for Means',
        subcription: Subscriptions.PRO,
        description: 'Two-Sample z-Test for Means'
    }
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
           <TitleButton title="Basic Statisticts"/>
           <SeachCommandsInput/>
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.root}>
            <div>
        {
            childCards.map((card: ChildCardProps) => {
                return <CommandCard
                description={card.description}
                subcription={card.subcription}
                title={card.title}
                />
            })
        }
      </div>

          </div>
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};
