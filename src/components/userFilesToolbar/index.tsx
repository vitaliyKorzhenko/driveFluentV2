import {
    Circle24Regular
  } from "@fluentui/react-icons";
  import {
    Toolbar,
    ToolbarButton,
    ToolbarDivider,
  } from "@fluentui/react-components";
  import type { ToolbarProps } from "@fluentui/react-components";
import { CreateFileDialog } from "../createFileDialog";
 
  export interface UserFilesToolbarProps extends ToolbarProps {
    /**
     * The title of the application.
     */
    refreshFiles?: () => void;
  }
  
  export const UserFilesToolbar = (props: UserFilesToolbarProps) => (
    <Toolbar aria-label="Default" {...props} style={{backgroundColor: '#1E90FF#1E90FF'}}>
  
        <ToolbarButton
            aria-label="StatPlus.io"
            appearance="primary"
            icon={<Circle24Regular />}
            title="Refresh"
            onClick={() => {
                console.log("CLICKED REFRESH 1111");
                if (props.refreshFiles) {
                    console.log("CLICKED REFRESH 2222");
                    props.refreshFiles();
                }
            }}
            >
                Refresh
            </ToolbarButton>
  
      <ToolbarDivider />
      <CreateFileDialog
      refreshFiles={props.refreshFiles}
        
      />
    
    </Toolbar>
  );
  