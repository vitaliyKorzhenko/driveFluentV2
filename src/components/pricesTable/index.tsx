import {
    CheckmarkCircle24Regular,
    Dismiss24Regular

} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
} from "@fluentui/react-components";

const items = [
  {
    pro: { label: "All Basic Data& Charts", icon: <CheckmarkCircle24Regular style={{color: 'green'}} /> },
    premium: { label: "All Basic Data& Charts", icon: <CheckmarkCircle24Regular style={{color: 'green'}} /> },
   
  },
  {
    pro: { label: "Regression Model", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/> },
    premium: { label: "Regression Model", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/> },
  },
  {
    pro: {label: "Anova & Multivariate Analysis", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/>},
    premium: {label: "Anova & Multivariate Analysis", icon: <CheckmarkCircle24Regular style={{color: 'green'}} />},
  },
  {
    pro: {label: "Non-Parametric Statistics", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/>},
    premium: {label: "Non-Parametric Statistics", icon: <CheckmarkCircle24Regular style={{color: 'green'}} />},
  },
  {
    pro: {label: "Time Series & Survival Analysis", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/>},
    premium: {label: "Time Series & Survival Analysis", icon: <Dismiss24Regular style={{color: 'red'}}/>},
  },
  {
    pro: {label: "Feature on request", icon: <CheckmarkCircle24Regular style={{color: 'green'}}/>},
    premium: {label: "Feature on request", icon: <Dismiss24Regular style={{color: 'red'}}/>}

  },
];

const buttonItems = [
    {
        pro: {label: "8.49 /month", key: 'buttonMonthly'},
        premium: {label: "12.74 /month", key: 'buttonMonthly'},
      },
      {
        pro: {label: "84.99 /year", key: 'buttonYearly'},
        premium: {label: "127.49 /year", key: 'buttonYearly'},
      }
];

const columns = [
  { columnKey: "pro", label: "PRO" },
  { columnKey: "premium", label: "PREMIUM" },
];

export const TablePrices = () => {
  return (
    <Table size="small" aria-label="Table with small size" style={{backgroundColor: '#F5FFFA'}}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.columnKey} 
            style={{
                backgroundColor: '#1E90FF',
                color: 'white'
                
            }}
            >
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.pro.label}>

            <TableCell>
              <TableCellLayout media={item.pro.icon}>
                {item.pro.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={item.premium.icon}>
                {item.premium.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
            {buttonItems.map((buttonItem) => (
               <TableRow>
                     <TableCell>
                     <Button
                      content={buttonItem.pro.label}
                      key={buttonItem.pro.key}
                      style={{
                        backgroundColor: '#1E90FF',
                        color: 'white',
                        width: '100%'
                      }}
                      >
                        {buttonItem.pro.label}
                        </Button>
                     </TableCell>
                     <TableCell>
                     <Button
                      content={buttonItem.premium.label}
                      key={buttonItem.premium.key}
                      style={{
                            backgroundColor: '#1E90FF',
                            color: 'white',
                            width: '100%'
                      }}
                      >
                        {buttonItem.premium.label}
                        </Button>
                     </TableCell>
               </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};