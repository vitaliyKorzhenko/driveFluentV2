import * as React from "react";
import {
  Button,
  Input,
  Label,
} from "@fluentui/react-components";
import { Delete24Regular, Info24Regular } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";
import { IWindowItem } from "../../../types/window";


export interface CellRangeProps {
    item: IWindowItem;
}

const ClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<Delete24Regular />}
      size="small"
    />
  );
};

export const CellRange = (props: CellRangeProps) => {


  const [value, setValue] = React.useState<string>(props.item.defaultValue  ? props.item.defaultValue.toString() : '');

  return (
    <div style={{
        width: '100%',
    }}>
       <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '5px', 
        flex: 1,  // Занимает всю доступную ширину
    }}>
        <Label required = {props.item.required}>{props.item.label}</Label>
        <Button 
            size="small" 
            icon={<Info24Regular />} 
            appearance="subtle" // Применение стиля primary
            style={{ marginLeft: '5px' }} // Маленький отступ слева
        />
        </div>
        <Input
        style={{
            width: '100%',
        
        }}
        type="number"
          contentAfter={<ClearButton aria-label="clear" />}
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    </div>
  );
};