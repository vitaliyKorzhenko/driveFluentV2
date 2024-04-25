import * as React from "react";
import { Switch } from "@fluentui/react-components";
import { IPreferencesOptions } from "../types";

interface CheckedPrefsProps {
    item: IPreferencesOptions;
}


export const PrefsCheckBox = (props: CheckedPrefsProps) => {
  const [checked, setChecked] = React.useState<boolean>(props.item.value == 'true' ? true : false);;

  return (
    <Switch
      checked={checked}
      onChange={(_ev, data) => 
        {
            setChecked(typeof data.checked == 'boolean' ? data.checked : false);
            
        }
    }
      label={props.item.name}
    />
  );
};