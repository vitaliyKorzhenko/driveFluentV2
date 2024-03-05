import {
  OpenRegular,
  DocumentRegular,
  TextDescription24Regular
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
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
import { IExampleFileNodeModel } from "../../types/files";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type FileDescriptionCell = {
    label: string;
    };


type Item = {
  file: FileCell;
  author: AuthorCell;
description: FileDescriptionCell;
};

function parseNodeModelsToItems(files: IExampleFileNodeModel[]): Item[] {
  let author1: AuthorCell = { label: "Vitaliy Korzhenko", status: 'available' };
  let author2: AuthorCell = { label: "Alex Simachov", status: 'busy' };
  
  return files.map((file: IExampleFileNodeModel) => {
    let mathRandom = Math.round(Math.random());
    return {
      file: { label: file.file_name, icon: <DocumentRegular /> },
      author:  mathRandom % 2 == 1 ? author1 : author2,
      description: { label: file.description, icon: <TextDescription24Regular/> }
    };
  });
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
        <TableCellLayout media={item.file.icon}
        style={{
          fontSize: "16px",
          fontWeight: "bold",

        }}
        >
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "author",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return "Author";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
            
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
    createTableColumn<Item>({
        columnId: "description",
        compare: (a, b) => {
        return a.description.label.localeCompare(b.description.label);
        },
        renderHeaderCell: () => {
        return "Description";
        },
        renderCell: (item) => {
        return (
            <TableCellLayout>
            {item.description.label}
            </TableCellLayout>
        );
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

export interface FilesExampleGridProps {
  files: IExampleFileNodeModel[];
}
export const FilesExampleGrid = (props: FilesExampleGridProps) => {
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