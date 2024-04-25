import { Label, Select } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";


interface IPrefFontProps {
    option: IPreferencesOptions;
}


export const PrefFontSize = (props: IPrefFontProps) => {


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>
      <Label size="medium" style={{fontWeight: 'bold'}}>{props.option.name}</Label>
      <Select 
      style={{
        width: '350px'
      
      }}
      defaultValue={props.option.value}>
        {
            props.option.select.split('\\n').map((item: string) => {
                return <option key={item} value={item}>{item}</option>
            })
        }
      </Select>
    </div>
  );
};