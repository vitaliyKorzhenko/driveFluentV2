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

type FileCell = {
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
    renderCell: () => {
      return (
        <>
          <Button style={{color: 'orange'}} aria-label="Edit" icon={<EditRegular />} />
          <Button style={{color: 'red'}} aria-label="Delete" icon={<DeleteRegular />} />
          <Button style= {{color: 'black'}} aria-label="Duplicate" icon={<DoubleSwipeUpRegular />} />
        </>
      );
    },
  }),
];

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
  files: IUserFileNodeModel[]
}

function parseNodeModelsToItems(files: IUserFileNodeModel[]): Item[] {
  let author1: AuthorCell = { label: "Vitaliy Korzhenko", status: 'available' };
  let author2: AuthorCell = { label: "Alex Simachov", status: 'busy' };
  
  return files.map((file: IUserFileNodeModel) => {
    let mathRandom = Math.round(Math.random());
    return {
      file: { label: file.file_name, icon: mathRandom ? <DocumentRegular /> : <FolderRegular /> },
      fileSize: { label: file.file_size.toString(), size: file.file_size },
      lastUpdated: { label: new Date().toLocaleDateString(), timestamp: Date.now() },
      author: mathRandom ? author1 : author2
    }
  });
}
      
export const FilesGrid = (props: FilesGridProps) => {
  return (
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
  );
};