import * as React from "react";
import {
  Input,
  Label,
} from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";


interface IPrefNumberInt {
    option: IPreferencesOptions;
}

export const PrefsNumberInt = (props: IPrefNumberInt) => {
  const [value, setValue] = React.useState("0");

  const onChange: InputProps["onChange"] = (_ev, data) => {
    // The controlled input pattern can be used for other purposes besides validation,
    // but validation is a useful example
    if (data.value.length <= 20) {
      setValue(data.value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>
      <Label size="large">{props.option.name}</Label> 
      <Input 
      value={value} 
      type="number"
      onChange={onChange}
      style={{
        width: '350px'
      }}
      />
    </div>
  );
};