import * as React from "react";
import {
  DrawerHeader,
  OverlayDrawer,
  Button,
  Tab,
  TabList,
  Text,
  Label,
  CompoundButton,
} from "@fluentui/react-components";
import {
  Settings24Filled,
  Options24Filled,
  ChatHelp24Regular,
  ArrowStepBackRegular,
  Run24Regular,
  BracesVariable24Regular
} from "@fluentui/react-icons";
import { Command } from "../../types/commands";
import { translate } from "../../localization/localization";
import { ColumnsFor } from "./columnsFor";
import { HeadersSelect } from "./headers";
import VariablesSection from "./variablesSection";
import OptionSections from "./optionsSection";
import PrefsTab from "../preferences/prefsTab";

export interface InputPanelProps {
  isOpen: boolean;
  closeInputPanel: () => void;
  command: Command
}

export const InputPanel = (props: InputPanelProps) => {
  const [open, setOpen] = React.useState(props.isOpen);
  const [customSize] = React.useState(600);

  const [selectedTab, setSelectedTab] = React.useState("Variables");

  console.log('InputPanel', props.isOpen, props.command);

  React.useEffect(() => {
    setOpen(props.isOpen);
    //setCurrentCommand(props.command);
  }
    , [props.isOpen, props.command]);



  const renderTabs = () => {
    return (
      <>
        <Tab
          style={{ color: 'black', padding: '10px' }}
          icon={<BracesVariable24Regular />} value="variables"
          onClick={() => setSelectedTab("variables")}

        >
          {translate('ui.tab.variables', 'Variables')}
        </Tab>
        <Tab icon={<ChatHelp24Regular />}
          value="help"
          onClick={() => setSelectedTab("Help")}
        >
          {translate('ui.label.help', 'Help')}
        </Tab>
        <Tab icon={<Options24Filled />}
          value="options"
          onClick={() => setSelectedTab("Options")}
        >
          {translate('ui.label.options', 'Options')}
        </Tab>
        <Tab icon={<Settings24Filled />}
          value="preferences"
          onClick={() => setSelectedTab("Preferences")}
        >
          {translate('ui.label.prefernces', 'Preferences')}
        </Tab>
      </>
    );
  };


  //render Variables

  const renderVariables = (): JSX.Element => {
    return (
      <>
        <div style={{
          display: 'flex',
          margin: '10px',
          padding: '10px',
          width: '90%',
        }}>
          <ColumnsFor />
          <div style={{ marginLeft: 'auto' }}>
            <HeadersSelect />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            margin: '10px',
            width: '100%',

          }}
        >
          <VariablesSection
            window={props.command.window}
          />
        </div>
      </>
    )
  }


  //render Options

  const renderOptions = (): JSX.Element => {
    return (
      <>
        <div
          style={{
            display: 'flex',
            margin: '10px',
            width: '100%',

          }}
        >
          <OptionSections
            window={props.command.advancedwindow}
          />
        </div>
      </>
    )
  }

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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between', // Распределение элементов по ширине
            alignItems: 'center', // Выравнивание элементов по вертикали
            padding: '10px'
          }}>
            <Button size="small"
              icon={<ArrowStepBackRegular />}
              onClick={() => {
                props.closeInputPanel();
              }}
              style={{ marginRight: "10px" }}
            >
              {translate('ui.button.back', 'Back')}
            </Button>
            <Label size='large' weight="semibold">{props.command.title}</Label>
            <CompoundButton
              icon={<Run24Regular />}
              appearance="outline"
              shape="circular"
              style={{
                backgroundColor: "#1E90FF",
                color: "white",
              }}
            >
              {translate('ui.button.run', 'Run')}
            </CompoundButton>
          </div>

        </DrawerHeader>

        <TabList defaultSelectedValue="myfiles">{renderTabs()}

        </TabList>
        {
          selectedTab == "variables" ?
            renderVariables() :
            selectedTab == "Help" ?
              <div>
                <div style={{ padding: '10px' }}>
                  <Text size={500}>
                    {props.command.description}
                  </Text>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}>
                    <Button size="large">
                      {translate('ui.button.help', 'Help')}
                    </Button>
                  </div>
                </div>

              </div> :
              selectedTab == "Options" ?
              renderOptions() :
              selectedTab == 'Preferences' ?
              <div 
              style={{
                width: '100%',

              }}
              >
               <PrefsTab />
              </div>
              : <></>
              
        }

      </OverlayDrawer>
    </div>
  );
};
