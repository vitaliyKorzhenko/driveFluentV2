import * as React from "react";
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
} from "@fluentui/react-components";
import {
  CalendarMonthRegular,
  CalendarMonthFilled,
  bundleIcon,
  DocumentRegular,
  DeleteRegular   
} from "@fluentui/react-icons";
import { FilesGrid } from "../filesGrid";
import { FilesExampleGrid } from "../filesGridExample";
import { FilesTrashGrid } from "../filesGridTrash";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("50px", "20px"),
    rowGap: "20px",
    width: "100%",
    height: "100%",
  },
});

export const FilesTabs = () => {
  const styles = useStyles();


  const [selectedTab, setSelectedTab] = React.useState("myfiles");


  const renderTabs = () => {
    return (
      <>
        <Tab
        style = {{color: 'black', padding: '10px'}}
         icon={<DocumentRegular />} value="myfiles"
         onClick={() => setSelectedTab("myfiles")}
        
         >
            MY FILES
        </Tab>
        <Tab icon={<CalendarMonth />} 
        value="examples"
        onClick={() => setSelectedTab("examples")}
        >
           EXAMPLE
        </Tab>
        <Tab icon={<DeleteRegular />} 
        value="trash"
        onClick={() => setSelectedTab("trash")}
        >
            TRASH
        </Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="myfiles">{renderTabs()}
      </TabList>
        {
            selectedTab == "myfiles" ?
            <FilesGrid /> :
            selectedTab == "examples" ?
            <FilesExampleGrid /> :
            <FilesTrashGrid />
        }
    </div>
  );
};