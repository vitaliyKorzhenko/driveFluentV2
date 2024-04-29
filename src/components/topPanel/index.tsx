import {
  Apps24Regular,
  DarkTheme24Filled,
  Question24Regular,
  LocalLanguage24Regular
} from "@fluentui/react-icons";
import {
  Label,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";
import type { Theme, ToolbarProps } from "@fluentui/react-components";
import { FeedbackDialog } from "../feedbackDialog";
import { UserPanel } from "../userPanel";
import { SubscriptionPanel } from "../subscriptionPanel";
import { VersionHelper } from "../../helpers/versionHelper";
import React from "react";
import { getAvailableLanguagesUiList, translate } from "../../localization/localization";

export interface MainTopPanelProps extends ToolbarProps {
  /**
   * The title of the application.
   */
 changeTheme?: () => void;

 changeDriveMode?: () => void;

 changeAuth?: () => void;

 updateLanguage?: (langCode: string) => void;

 theme: Partial<Theme>;

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

  <Toolbar aria-label="Default" {...props} style={{backgroundColor: props.theme.colorBrandBackground}}>
  <div style={{ display: 'flex', alignItems: 'center' }}>

    <ToolbarButton
      aria-label="StatPlus.io"
      appearance="primary"
      icon={<Apps24Regular />}
      title="StatPlus.io"
    >
     { 'StatPlus.io '}
     <Label style={{color: 'red'}}>{'v' + VersionHelper.getVersion()}</Label>
    </ToolbarButton>
    <SubscriptionPanel/>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>

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
    </div>
  </Toolbar>
  );
};
