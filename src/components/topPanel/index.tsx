import {
  Apps24Regular,
  DarkTheme24Filled,
  Question24Regular,
  MoldRegular
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { FeedbackDialog } from "../feedbackDialog";
import { UserPanel } from "../userPanel";
import { SubscriptionPanel } from "../subscriptionPanel";
import { logout } from "../../firebase";
import { VersionHelper } from "../../helpers/versionHelper";



const additionalItems: string[] = [
  'About',
  'Feedback',
];
  

export interface MainTopPanelProps extends ToolbarProps {
  /**
   * The title of the application.
   */
 changeTheme?: () => void;

 changeDriveMode?: () => void;

 changeAuth?: () => void;
}

export const MainTopPanel = (props: MainTopPanelProps) => (
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
    <ToolbarButton
      aria-label="Sign Out"
      onClick={async () => {
        await logout();
        props.changeAuth && props.changeAuth();
      }}
    >
      Sign Out
    </ToolbarButton>
    <SubscriptionPanel/>

    <ToolbarDivider />
    <ToolbarButton
      aria-label="Dark Theme"
      icon={<DarkTheme24Filled />}
      onClick={props.changeTheme}

    />
     <FeedbackDialog />
    {/* <Menu>
      <MenuTrigger>
        <ToolbarButton aria-label="ChangeLanguage" icon={<LocalLanguage24Regular />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {languages.map((language) => (
            <MenuItem key={language}>{language}</MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu> */}
    <Menu>
      <MenuTrigger>
        <ToolbarButton aria-label="Help" icon={<Question24Regular />} />
      </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {additionalItems.map((item) => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu> 
    <ToolbarDivider />  
    <UserPanel/>
  </Toolbar>
);
