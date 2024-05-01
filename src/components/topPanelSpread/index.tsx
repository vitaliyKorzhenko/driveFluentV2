import {
  Apps24Regular,
  DarkTheme24Filled,
  Question24Regular,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  tokens,
  Label,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";
import { UserPanel } from "../userPanel";
import { CardsPanel } from "../cardsBasicPanel";
import { InputPanel } from "../inputPanel";
import { Command } from "../../types/commands";
import { VersionHelper } from "../../helpers/versionHelper";
import { translate } from "../../localization/localization";
import React from "react";
import { FeedbackDialog } from "../feedbackDialog";


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

}

export const MainTopPanelSpread = (props: MainTopPanelProps) => {

  const [openFeedback, setOpenFeedback] = React.useState(false);

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
        <Label> {props.fileName}</Label>
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
        {/* <SubscriptionPanel/> */}
      </div>
      <ToolbarDivider />
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <CardsPanel
          openInputPanel={props.openInputPanel}
        />
        <ToolbarButton
          aria-label="Dark Theme"
          icon={<DarkTheme24Filled />}
          onClick={props.changeTheme}

        />
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
