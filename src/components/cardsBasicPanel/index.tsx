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
import { BasicCard } from "../basicCard";
import { SeachCommandsInput } from "../seachCommandsInput";
import { CommandCard } from "../commandCard";
import { ApiCommands } from "../../api/ApiCommands";
import { BasicCommand, Command, parseSubscription } from "../../types/commands";

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

export interface CardsPanelProps {
  openInputPanel: (command: Command) => void;
}
export const CardsPanel = (props: CardsPanelProps) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customSize] = React.useState(400);
  const [isBasicMode, setIsBasicMode] = React.useState(true);

  const [basicCommands, setBasicCommands] = React.useState<BasicCommand[]>([]); // Добавьте тип для данных, которые вы ожидаете получить

  const [commands, setCommands] = React.useState<Command[]>([]); // Добавьте тип для данных, которые вы ожидаете получить


  const changeMode = (basicCard?: BasicCommand) => {
    console.log('changeMode', basicCard)
    if (basicCard) {
    setCommands(basicCard.commands);
    setIsBasicMode(!isBasicMode);
    } else {
      setIsBasicMode(!isBasicMode);
    }
  }

  const onClickBack = () => {
    console.log('onClickBack', isBasicMode)
    if (!isBasicMode) {
      changeMode()
    } else {
      setOpen(false)
    }
  }
 // 
  function renderBodyForChildCards (): JSX.Element {
    return <DrawerBody>
      <div className={styles.root}>
        <div>
          {
            commands.map((card: Command) => {
              return <CommandCard
                description={card.description}
                subcription={parseSubscription(card.subscription)}
                title={card.title}
                onClick={() => {
                  console.log('onClick', card);
                  const window = JSON.parse(card.window);
                  console.log('window', window);
                }}
                openInputPanel={props.openInputPanel}
                coomandCard={card}
              />
            })
          }
        </div>
    </div>
  </DrawerBody>
  }


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const basicCommands = await ApiCommands.findAllCommandsByLanguage('en');
        console.log("COMMANDS", basicCommands); // Делайте что-то с полученными данными
        setBasicCommands(basicCommands);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Обработка ошибки, если это необходимо
      }
    };

    fetchData(); // Вызываем асинхронную функцию fetchData
  }, []);

  function renderBodyForBasicCards (): JSX.Element {
    return <DrawerBody>
      <div className={styles.root}>
        <div>
          {
            basicCommands.map((card) => {
              return <BasicCard 
              name={card.title}
              changeMode = {() => changeMode(card)}
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
