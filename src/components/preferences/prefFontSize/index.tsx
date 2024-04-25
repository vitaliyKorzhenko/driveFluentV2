import { Label, Select } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";


interface IPrefFontProps {
    option: IPreferencesOptions;
}


export const PrefFontSize = (props: IPrefFontProps) => {


  return (
    <>
      <Label required={true}>{props.option.name}</Label>
      <Select defaultValue={props.option.value}>
        {
            props.option.select.split('\\n').map((item: string) => {
                return <option key={item} value={item}>{item}</option>
            })
        }
      </Select>
    </>
  );
};