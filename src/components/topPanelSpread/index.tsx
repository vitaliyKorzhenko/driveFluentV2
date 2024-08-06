import {
  Apps24Regular,
  DarkTheme24Filled,
  Question24Regular,
  LocalLanguage24Regular
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  tokens,
  Label,
  MenuPopover,
  MenuList,
  MenuItem,
  Menu,
  MenuTrigger,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { UserPanel } from "../userPanel";
import { CardsPanel, CardsPanelHandle } from "../cardsBasicPanel";
import { InputPanel } from "../inputPanel";
import { Command } from "../../types/commands";
import { VersionHelper } from "../../helpers/versionHelper";
import { getAvailableLanguagesUiList, translate } from "../../localization/localization";
import React from "react";
import { FeedbackDialog } from "../feedbackDialog";
import { FindCommandsInput } from "../findCommands";


export interface MainTopPanelProps extends ToolbarProps {
  /**
   * The title of the application.
   */
  changeTheme?: () => void;
  changeDriveMode?: () => void;
  changeAuth?: () => void;
  isOpenCommnadPanel?: boolean;
  isOpenInputPanel: boolean;
  openInputPanel: (currentCommand: Command) => void;
  closeInputPanel: () => void;
  command: Command
  fileName: string;
  updateLanguage: (langCode: string) => void;


}

export const MainTopPanelSpread = (props: MainTopPanelProps) => {

  const [openFeedback, setOpenFeedback] = React.useState(false);

  const cardsPanelRef = React.useRef<CardsPanelHandle>(null);

  const openFeedbackDialog = () => {
    setOpenFeedback(true);
  }

  const closeFeedbackDialog = () => {
    setOpenFeedback(false);
  }

  return (
    <Toolbar aria-label="Default" {...props} style={{ backgroundColor: tokens.colorBrandBackground }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <ToolbarButton
          aria-label="StatPlus.io"
          appearance="primary"
          icon={<Apps24Regular />}
          title="StatPlus.io"
          onClick={() => {
            props.changeDriveMode && props.changeDriveMode();
          }}
        >
          {'StatPlus.io '}
          <Label style={{ color: 'red' }}>{'v' + VersionHelper.getVersion()}</Label>
        </ToolbarButton>
        <Label color="white" weight="semibold"> {props.fileName}</Label>

        <ToolbarButton
          aria-label="Feedback"
          onClick={openFeedbackDialog}
          icon={<Question24Regular />}
          appearance="primary"

        >

          {translate("ui.label.feedback", 'Feedback')}
        </ToolbarButton>
        <FindCommandsInput 
         onSearch={(searchText) => {
           if (cardsPanelRef.current) {
            if (searchText && searchText.length > 0) {
              if (cardsPanelRef.current ) {
                cardsPanelRef.current.openWithFilter(searchText);
              }
            }
           }
         }}
        />
        <FeedbackDialog
          open={openFeedback}
          closeDialog={closeFeedbackDialog}
        />
        {/* <SubscriptionPanel/> */}
      </div>
      <ToolbarDivider />
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <CardsPanel
          openInputPanel={props.openInputPanel}
          ref={cardsPanelRef}
        />
        <ToolbarButton
          aria-label="Dark Theme"
          icon={<DarkTheme24Filled />}
          onClick={props.changeTheme}

        />
          <Menu>
      <MenuTrigger>
        <ToolbarButton aria-label="ChangeLanguage" icon={<LocalLanguage24Regular />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList
        onSelect={(value) => {
          console.log("Selected language: ", value);
          // props.updateLanguage && props.updateLanguage(value)
        
        }}
        >
          {getAvailableLanguagesUiList().map((language) => (
            <MenuItem 
            key={language.code}
            onClick={() => {
              console.log('CLICK language: ');
              // alert('Selected language: ' + language.code)
              if (props.updateLanguage) {
                console.log('UPDATE language: ', language.code)
                props.updateLanguage(language.code);

              } else {
                console.log('NOT DEFINED UPDATE language: ');
              }
             }}
            >
            {language.display}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
        
        <ToolbarDivider />
        <UserPanel />
        <InputPanel
          isOpen={props.isOpenInputPanel}
          closeInputPanel={props.closeInputPanel}
          command={props.command}
        />
      </div>
    </Toolbar>
  )
}
