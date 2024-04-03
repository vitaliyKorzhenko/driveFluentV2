import {
  Apps24Regular,
  DarkTheme24Filled,
  Question24Regular,
  MoldRegular,
  LocalLanguage24Regular
} from "@fluentui/react-icons";
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { FeedbackDialog } from "../feedbackDialog";
import { UserPanel } from "../userPanel";
import { SubscriptionPanel } from "../subscriptionPanel";
import { VersionHelper } from "../../helpers/versionHelper";
import React from "react";
import { getActiveLanguageDisplayName, getAvailableLanguagesUiList, translate } from "../../localization/localization";

export interface MainTopPanelProps extends ToolbarProps {
  /**
   * The title of the application.
   */
 changeTheme?: () => void;

 changeDriveMode?: () => void;

 changeAuth?: () => void;

 updateLanguage?: (langCode: string) => void;
}

export const MainTopPanel = (props: MainTopPanelProps) => {

  const [openFeedback, setOpenFeedback] = React.useState(false);

  const openFeedbackDialog = () => {
    setOpenFeedback(true);
  }

  const closeFeedbackDialog = () => {
    setOpenFeedback(false);
  }

  return (

  <Toolbar aria-label="Default" {...props} style={{backgroundColor: '#1E90FF#1E90FF'}}>

    <ToolbarButton
      aria-label="StatPlus.io"
      appearance="primary"
      icon={<Apps24Regular />}
      title="StatPlus.io"
    >
     { 'StatPlus.io'}
    </ToolbarButton>
    <ToolbarButton
    color="red"
    style={{
      color: 'red'
    }}
    >
      { 'v' + VersionHelper.getVersion()}
    </ToolbarButton>
    <ToolbarButton
    icon={<MoldRegular/>}
    onClick={
      () => {
        if (props.changeDriveMode)
        props.changeDriveMode();  
      
      }
    }
    >
      Go-Spread
    </ToolbarButton>
    <ToolbarButton>
      {'Language: ' +  getActiveLanguageDisplayName()}
    </ToolbarButton>
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
    <SubscriptionPanel/>

    <ToolbarDivider />
    <ToolbarButton
      aria-label="Dark Theme"
      icon={<DarkTheme24Filled />}
      onClick={props.changeTheme}

    />
    <ToolbarButton
      aria-label="Feedback"
      onClick={openFeedbackDialog}
      icon={<Question24Regular />}
    >
      {translate("ui.label.feedback", 'Feedback')}
    </ToolbarButton>
     <FeedbackDialog 
      open={openFeedback}
      closeDialog={closeFeedbackDialog}
     />
    

    <ToolbarDivider />  
    <UserPanel 
    changeAuth={props.changeAuth}
    />
  </Toolbar>
  );
};
