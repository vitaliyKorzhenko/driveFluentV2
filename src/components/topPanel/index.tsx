import {
  Apps24Regular,
  TextSubscript24Filled,
  DarkTheme24Filled,
  LocalLanguage24Regular,
  Question24Regular,
  People24Regular,
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
import { CardsChildPanel } from "../cardsCommandPanel";

const languages: string[] = [
  'English',
  'French',
  'Spanish',
  'German',
  'Italian',
  'Українська'
];

const additionalItems: string[] = [
  'About',
  'Feedback',
];
  

export interface MainTopPanelProps extends ToolbarProps {
  /**
   * The title of the application.
   */
 changeTheme?: () => void;
}

export const MainTopPanel = (props: MainTopPanelProps) => (
  <Toolbar aria-label="Default" {...props} style={{backgroundColor: '#1E90FF#1E90FF'}}>

    <ToolbarButton
      aria-label="StatPlus.io"
      appearance="primary"
      icon={<Apps24Regular />}
      title="StatPlus.io"
    >
      StatPlus.io
    </ToolbarButton>
    <ToolbarButton
      aria-label="Generate Random Theme"
      title="Random Theme"
      onClick={props.changeTheme}
    >
      RandomTHEME!
    </ToolbarButton>
    <ToolbarButton
      aria-label="Subscription"
      icon={<TextSubscript24Filled />
    }
    >
      FREE
    </ToolbarButton>
    <ToolbarDivider />
    <ToolbarButton
      aria-label="Dark Theme"
      icon={<DarkTheme24Filled />}
    />
    <Menu>
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
    </Menu>
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
    <ToolbarButton
      aria-label="User"
      icon={<People24Regular />} 
    />
    <FeedbackDialog />
    <UserPanel/>
    <SubscriptionPanel/>
    <CardsChildPanel/>
  </Toolbar>
);
