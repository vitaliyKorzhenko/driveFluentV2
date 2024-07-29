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
import { IOptionItem } from "../../types/options";
import { AppNavigate } from "../../helpers/navigateHelper";

export interface InputPanelProps {
  isOpen: boolean;
  closeInputPanel: () => void;
  command: Command
}

interface IOptionElement {
  tabName: string;
  item: IOptionItem;
}

export const InputPanel = (props: InputPanelProps) => {
  const [open, setOpen] = React.useState(props.isOpen);
  const [customSize] = React.useState(600);

  const [selectedTab, setSelectedTab] = React.useState("variables");

  const [optionElements, setOptionElements] = React.useState<IOptionElement[]>([]);

  //add option Elements
  const addOptionElement = (tabName: string, item: IOptionItem) => {
    console.log('addOptionElement', tabName, item);
    setOptionElements([...optionElements, { tabName, item }]);
  }

  console.log('InputPanel', props.isOpen, props.command);

  React.useEffect(() => {
    setOpen(props.isOpen);
    // setCurrentOptions(parseOptionAdditionTabs()); 
    //setCurrentCommand(props.command);
  }
    , [props.isOpen, props.command]);



  const parseAdwancedWindowItems = (items: any[]): IOptionItem[] => {
    if (!items || items.length == 0) {
      return [];
    }

    //loop for items
    let optionItems: IOptionItem[] = [];

    items.forEach((item: any) => {
      console.log('advancedwindow item', item);
      optionItems.push({
        nodename: item.nodename ?? '',
        name: item.name ?? '',
        value: item.value ?? '',
        tab: item.tab ?? '',
        actionEnabled: item['action-enabled'] ? item['action-enabled'] : undefined ,
        indent: item.indent ?? undefined,
        valueex: item.valueex ?? 0,
        valueshort: item.valueshort ?? '',
        currentvalue: item.currentvalue ?? '',
      });

    })
    return optionItems;
  };


  const parseOptionAdditionTabs = () => {
    let optionTabs: {tab: string, items: IOptionItem[]}[] = [];
    if (props && props.command && props.command.advancedwindow && props.command.advancedwindow.length > 0) 
    {
    let advancedwindow = JSON.parse(props.command.advancedwindow);
  console.log('OPTION TAB TABS', advancedwindow);
    if (advancedwindow) {
      const items: IOptionItem[] =parseAdwancedWindowItems(advancedwindow.items);
      console.log('PARSED ITEMS', items);
      //loop for items
      items.forEach((item) => {
        if (item.tab &&  item.tab != '') {
          let tab = optionTabs.find((tab) => tab.tab == item.tab);
          if (tab) {
            tab.items.push(item);
          } else {
            optionTabs.push({tab: item.tab, items: [item]});
        }
      } else {
        //add to default tab Options
        let tab = optionTabs.find((tab) => tab.tab == 'Options');
        if (tab) {
          tab.items.push(item);
        } else {
          optionTabs.push({tab: 'Options', items: [item]});
        }
      }
      });
    }
  }
    return optionTabs;
  };

  const renderTabs = () => {


    const tabStyle = {
      margin: '0 0px', // Устанавливаем отступы по горизонтали на 5px, а по вертикали - 0
    };

    const optionTabs = parseOptionAdditionTabs();
    return (
      <>
        <Tab
          style={{...tabStyle, color: 'black' }}
          icon={<BracesVariable24Regular />} value="variables"
          onClick={() => setSelectedTab("variables")}

        >
          {translate('ui.tab.variables', 'Variables')}
        </Tab>
       {
          optionTabs.map((optionTab) => {
            return (
              <Tab icon={<Options24Filled />}
                value={optionTab.tab}
                onClick={() => setSelectedTab(optionTab.tab)}
                style={tabStyle}
              >
                {optionTab.tab}
              </Tab>
            );
          })
       }
        <Tab icon={<ChatHelp24Regular />}
          value="help"
          onClick={() => setSelectedTab("Help")}
          style={tabStyle}
        >
          {translate('ui.label.help', 'Help')}
        </Tab>
        <Tab icon={<Settings24Filled />}
          value="preferences"
          onClick={() => setSelectedTab("Preferences")}
          style={tabStyle}
        >
          {translate('ui.tab.preferences', 'Preferences')}
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

  const updateSelectedOptions = (selectedOptions:  {tab: string, items: IOptionItem[]}) => {
    console.log('UPDATE SELECTED OPTIONS', selectedOptions, optionElements);
    for (let i = 0; i < selectedOptions.items.length; i++) {
      for (let j = 0; j< optionElements.length; j++) {
        if  
        (selectedOptions.tab == optionElements[j].tabName 
          && selectedOptions.items[i].name == optionElements[j].item.name
          && selectedOptions.items[i].nodename == optionElements[j].item.nodename
          ) {
          console.log('CURRENT VALUE', optionElements[j].item.currentvalue);
          selectedOptions.items[i] = optionElements[j].item;  
    }
  }
  console.log('NEW SELECTED OPTIONS', selectedOptions);
  return selectedOptions;
}
  }

  const renderOptions = (tabName: string): JSX.Element => {
    const options = parseOptionAdditionTabs();
    let selectedOptions = options.find((option) => option.tab == tabName);
    if (!selectedOptions) {
      return <></>;
    }

   
    selectedOptions = updateSelectedOptions(selectedOptions);
    console.log('SELECTED OPTIONS', selectedOptions);
    if (!selectedOptions) {
      return <></>;
    }
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
            items={selectedOptions.items}
            addOptionElement={addOptionElement}
            selectedTab={selectedOptions.tab}
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
            // padding: '10px'
          }}>
            <Button size="small"
              icon={<ArrowStepBackRegular />}
              onClick={() => {
                props.closeInputPanel();
              }}
              style={{ marginRight: "10px" }}
            >
              {translate('ui.label.back', 'Back')}
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
              {translate('ui.label.run', 'Run')}
            </CompoundButton>
          </div>

        </DrawerHeader>

        <TabList defaultSelectedValue="variables">{renderTabs()}

        </TabList>
        {
          selectedTab == "variables" ?
            renderVariables() :
            selectedTab == "Help" ?
              <div style={{padding: '5px', margin: '5px'}}>
                <div style={{ padding: '10px' }}>
                  <Text size={400}>
                    {props.command.description}
                  </Text>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}>
                    <Button 
                    size="large" 
                    style={{width: '100%'}}
                    icon={<ChatHelp24Regular />}
                    onClick={() => {
                      AppNavigate.openHelpLink(props.command.commandIdOld);
                    }}
                    >
                      {translate('ui.button.help', 'Help')}
                    </Button>
                  </div>
                </div>

              </div> :
  
              selectedTab == 'Preferences' ?
              <div 
              style={{
                width: '100%',

              }}
              >
               <PrefsTab />
              </div>
              : renderOptions(selectedTab)
              
        }

      </OverlayDrawer>
    </div>
  );
};
