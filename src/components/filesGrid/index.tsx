import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  DeleteRegular,
  DoubleSwipeUpRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  TableColumnId,
  DataGridCellFocusMode,
} from "@fluentui/react-components";
import { IUserFileNodeModel } from "../../types/files";
import { UserFilesToolbar } from "../userFilesToolbar";
import { EditFileDialog } from "../editFileDialog";
import React from "react";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { useProgressBar } from "../progressBar/progressContext";

type FileCell = {
  id: number;
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type FileSizeCell = {
  label: string;
  size: number;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  fileSize?: FileSizeCell;

};


function parseSizeToMbLabel(size: number | null | undefined): string {
  if (!size) {
    return "0 MB";
  }
  return `${(size / 1024).toFixed(2)} MB`;
}


const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
  switch (columnId) {
    case "singleAction":
      return "none";
    case "actions":
      return "group";
    default:
      return "cell";
  }
};

export interface FilesGridProps {
  files: IUserFileNodeModel[],
  refreshFiles?: () => void;
}

function parseNodeModelsToItems(files: IUserFileNodeModel[]): Item[] {
  let author1: AuthorCell = { label: "Vitaliy Korzhenko", status: 'available' };
  let author2: AuthorCell = { label: "Alex Simachov", status: 'busy' };
  
  return files.map((file: IUserFileNodeModel) => {
    let mathRandom = Math.round(Math.random());
    return {
      file: {id: file.id, label: file.file_name, icon: mathRandom ? <DocumentRegular /> : <FolderRegular /> },
      fileSize: { label: file.file_size.toString(), size: file.file_size },
      lastUpdated: { label: new Date().toLocaleDateString(), timestamp: Date.now() },
      author: mathRandom ? author1 : author2
    }
  });
}
      
export const FilesGrid = (props: FilesGridProps) => {

  const [isOpenEditFileDialog, setIsOpenEditFileDialog] = React.useState(false);
  const [fileId, setFileId] = React.useState(0);
  const [fileName, setFileName] = React.useState('');

  const { startProgressBar, stopProgressBar } = useProgressBar(); 
  const handleEditFile = (fileId: number, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsOpenEditFileDialog(true);
  };

  const handleDuplicateFile = async (fileId: number) => {
    try {
      startProgressBar();
      await ApiUserFilesNode.duplicateFileNode(fileId);
      stopProgressBar();
    } catch (error) {
      console.error("duplicateFileNode Error: ", error);
    }
  }

  const closeEditFileDialog = () => {
    setIsOpenEditFileDialog(false);
  }


  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "file",
      compare: (a, b) => {
        return a.file.label.localeCompare(b.file.label);
      },
      renderHeaderCell: () => {
        return "File";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout 
          media={item.file.icon}
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
          
          }}
          >
            {item.file.label}
          </TableCellLayout>
        );
      },
    }),
   
    createTableColumn<Item>({
      columnId: "lastUpdated",
      compare: (a, b) => {
        return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
      },
      renderHeaderCell: () => {
        return "Last updated";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout
            style={{
              fontWeight: "bold",
              color: 'red'
            }}
            >
            {item.lastUpdated.label}
            </TableCellLayout>
        )
      },
    }),   
    createTableColumn<Item>({
      columnId: "fileSize",
      compare: (a, b) => {
        return a.fileSize && b.fileSize? a.fileSize.size - b.fileSize.size : 0;
      },
      renderHeaderCell: () => {
        return "File size";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout
            style={{
              fontWeight: "bold",
              color: 'green'
            }}
            >
            {parseSizeToMbLabel(item.fileSize?.size)}
            </TableCellLayout>
        )
        return item.fileSize?.label;
      },
    }),
  
    createTableColumn<Item>({
      columnId: "singleAction",
      renderHeaderCell: () => {
        return "Single action";
      },
      renderCell: () => {
        return <Button
        style={{
          width: "100%",
        
          color: "#1E90FF",
  
        }}
         icon={<OpenRegular />}>
          Open
          </Button>;
      },
    }),
    createTableColumn<Item>({
      columnId: "actions",
      renderHeaderCell: () => {
        return "Actions";
      },
      renderCell: (item: Item) => {
        return (
          <>
            <Button style={
              {color: 'orange'}} 
            aria-label="Edit" 
            icon={<EditRegular />} 
            onClick={() => {
              console.log('edit file', item.file.id, item.file.label);
              handleEditFile(item.file.id, item.file.label);
            }}
            />
            <Button style={{color: 'red'}} aria-label="Delete" icon={<DeleteRegular />} />
            <Button 
            style= {{color: 'green'}} 
            aria-label="Duplicate" 
            onClick={async () => {
              console.log('duplicate file', item.file.id);
              await handleDuplicateFile(item.file.id);
              props.refreshFiles && props.refreshFiles();
            }}
            icon={<DoubleSwipeUpRegular />} 

            />
          </>
        );
      },
    }),
  ];

  return (
    <>
    <UserFilesToolbar
      refreshFiles={props.refreshFiles}
     />
    <DataGrid
      items={parseNodeModelsToItems(props.files)}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.file.label}
      style={
        {
          width: "100%",
          height: "100%",
        }
      }
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell, columnId }) => (
              <DataGridCell focusMode={getCellFocusMode(columnId)}>
                {renderCell(item)}
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
    <EditFileDialog 
     refreshFiles={props.refreshFiles}
      open={isOpenEditFileDialog}
      fileId={fileId}
      fileName={fileName}
      closeDialog={closeEditFileDialog}

      />
    </>
  );
};