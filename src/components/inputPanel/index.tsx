import * as React from "react";
import {
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { Command } from "../../types/commands";

export interface InputPanelProps {
  isOpen: boolean;
  closeInputPanel: () => void;
  command: Command
}

export const InputPanel = (props: InputPanelProps) => {
  const [open, setOpen] = React.useState(props.isOpen);
  const [customSize] = React.useState(400);
  const [currentCommand, setCurrentCommand] = React.useState<Command>(props.command); // Добавьте тип для данных, которые вы ожидаете получить

  console.log('InputPanel', props.isOpen, props.command);
  
  React.useEffect(() => {
    setOpen(props.isOpen);
    setCurrentCommand(props.command);
  }
  , [props.isOpen, props.command]);

 
  return (
    <div>
      <OverlayDrawer
        open={open}
        position="end"
        onOpenChange={(_, state) => {
          setOpen(state.open);
          props.closeInputPanel();
        }}
        style={{ width: `${customSize}px` }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => {
                  setOpen(false);
                  props.closeInputPanel();
                }}
              />
            }
          >
          </DrawerHeaderTitle>
        </DrawerHeader>
            {
              currentCommand ? 
              <div>
                <h1>{currentCommand.title}</h1>
                <p>{currentCommand.description}</p>
              </div> :
              <div>
                <h1>Command not found</h1>
              </div>
            }
      
      </OverlayDrawer>
    </div>
  );
};
