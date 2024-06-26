import * as React from "react";
import { Label, Select } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";


interface IPrefFontProps {
  option: IPreferencesOptions;
}


export const PrefFont = (props: IPrefFontProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(props.option.value);


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>
      <Label size="large">{props.option.name}</Label>
      <Select
        style={{
          width: '350px'
        }}
        defaultValue={selectedValue}
        onChange={(_ev, data) => {
          setSelectedValue(data.value as string);
        }}
      >
        {
          props.option.select.split('\\n').map((item: string) => {
            return <option key={item} value={item}>{item}</option>
          })
        }
      </Select>
    </div>
  );
};