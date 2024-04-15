import * as React from "react";
import {
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Tab,
  TabList,
} from "@fluentui/react-components";
import {
  Calendar24Regular,
  DocumentRegular,
} from "@fluentui/react-icons";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { Command } from "../../types/commands";
import { translate } from "../../localization/localization";

export interface InputPanelProps {
  isOpen: boolean;
  closeInputPanel: () => void;
  command: Command
}

export const InputPanel = (props: InputPanelProps) => {
  const [open, setOpen] = React.useState(props.isOpen);
  const [customSize] = React.useState(600);
  const [currentCommand, setCurrentCommand] = React.useState<Command>(props.command); // Добавьте тип для данных, которые вы ожидаете получить

  const [selectedTab, setSelectedTab] = React.useState("Variables");

  console.log('InputPanel', props.isOpen, props.command);
  
  React.useEffect(() => {
    setOpen(props.isOpen);
    setCurrentCommand(props.command);
  }
  , [props.isOpen, props.command]);

 

  const renderTabs = () => {
    return (
      <>
        <Tab
        style = {{color: 'black', padding: '10px'}}
         icon={<DocumentRegular />} value="variables"
         onClick={() => setSelectedTab("variables")}

         >
           {translate('ui.tab.variables', 'Variables')}
        </Tab>
        <Tab icon={<Calendar24Regular />} 
        value="examples"
        onClick={() => setSelectedTab("Help")}
        >
          {translate('ui.label.help', 'Help')}
        </Tab>
      </>
    );
  };

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
          <h3>{currentCommand.title}</h3>
        </DrawerHeader>
        <TabList defaultSelectedValue="myfiles">{renderTabs()}
            
        </TabList>
            {
                selectedTab == "variables" ?
                <div>
                    <h1>Variables</h1>
                </div> :
                selectedTab == "Help" ?
                <div>
                    <h1>Help</h1>
                </div> :
                <div>
                    <h1>Variables</h1>
                </div>
            }
      
      </OverlayDrawer>
    </div>
  );
};
