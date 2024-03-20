import {
  FolderRegular,
  DocumentRegular,
  DeleteRegular,
  DualScreenUpdateRegular
} from "@fluentui/react-icons";
import {
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
import { AuthorCell, Item, parseSizeToMbLabel } from "../../helpers/fileGridHelper";
import { ApiUserFilesNode } from "../../api/ApiUserFiles/userFiles";
import { useProgressBar } from "../progressBar/progressContext";





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


export interface FilesTrashGridProps {
  refreshFiles: () => void;
  trashedFiles: IUserFileNodeModel[];
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
 

export const FilesTrashGrid = (props: FilesTrashGridProps) => {

  const { startProgressBar, stopProgressBar } = useProgressBar(); 

  const handleRestoreFile = async (fileId: number) => {
    try {
      startProgressBar();
      await ApiUserFilesNode.restoreFileNode(fileId);
      stopProgressBar();
    } catch (error) {
      console.error("deleteFileNode Error: ", error);
    }
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
      renderCell: (item: Item) => {
        return <Button
        style={{
          width: "100%",
        
          color: "orange",
  
        }}
         icon={<DualScreenUpdateRegular />
         }
         onClick={async () => {
          await handleRestoreFile(item.file.id);
          props.refreshFiles && props.refreshFiles();
         }}
         >
        
        
          Restore
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
           
            <Button 
            style={{color: 'red'}} 
            aria-label="Delete" 
            icon={<DeleteRegular 
            onClick={async () => {
              console.log('delete file', item.file.id, item.file.label);
            }
            }
            />} 
            />
          </>
        );
      },
    }),
  ];

  return (
    <DataGrid
      items={parseNodeModelsToItems(props.trashedFiles)}
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
  );
};