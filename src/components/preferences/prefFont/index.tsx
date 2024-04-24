import * as React from "react";
import { Label, Select } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";


interface IPrefFontProps {
    option: IPreferencesOptions;
}


export const PrefFont = (props: IPrefFontProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(props.option.value);


  return (
    <>
      <Label required={true}>{props.option.name}</Label>
      <Select 
      defaultValue={selectedValue}
      onChange={(_ev, data) =>{
        setSelectedValue(data.value as string);
      }}
      >
        {
            props.option.select.split('\\n').map((item: string) => {
                return <option key={item} value={item}>{item}</option>
            })
        }
      </Select>
    </>
  );
};