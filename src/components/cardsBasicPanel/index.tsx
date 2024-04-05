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
import { Dismiss24Regular, ArrowAutofitContent24Filled } from "@fluentui/react-icons";
import { CommandsButton } from "../commandButton";
import { BasicCard } from "../basicCard";
import { SeachCommandsInput } from "../seachCommandsInput";
import { Subscriptions } from "../../types";
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


export const CardsPanel = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customSize] = React.useState(400);
  const [isBasicMode, setIsBasicMode] = React.useState(true);



  const changeMode = () => {
    setIsBasicMode(!isBasicMode);
  }

  const onClickBack = () => {
    console.log('onClickBack', isBasicMode)
    if (!isBasicMode) {
      changeMode()
    } else {
      setOpen(false)
    }
  }

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

   interface ChildCardProps {
    title: string;
    subcription: Subscriptions;
    description: string;
  
  }


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


  // 
  function renderBodyForChildCards (): JSX.Element {
    return <DrawerBody>
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
  }


  function renderBodyForBasicCards (): JSX.Element {
    return <DrawerBody>
      <div className={styles.root}>
        <div>
          {
            basicCardNames.map((name) => {
              return <BasicCard 
              name={name}
              changeMode = {changeMode}
              />
            })
          }
        </div>
      </div>
    </DrawerBody>
  }

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
         <Button size="small" 
         icon={<ArrowAutofitContent24Filled 
          />}
          onClick={() => {
            console.log('onClickBack', isBasicMode);
            onClickBack()
          
          }}
          style={{
            marginRight: "10px",
          
          }}
            >
            back
        </Button>
           <SeachCommandsInput/>
          </DrawerHeaderTitle>
        </DrawerHeader>

       {
          isBasicMode ? 
          renderBodyForBasicCards() : 
          renderBodyForChildCards()
       }
      </OverlayDrawer>

      <div className={styles.main}>
        <Button appearance="primary" onClick={() => setOpen(true)}>
          Open Commands
        </Button>
      </div>
    </div>
  );
};
