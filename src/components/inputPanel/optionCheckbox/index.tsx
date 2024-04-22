import * as React from "react";
import { Checkbox } from "@fluentui/react-components";
import { IOptionItem } from "../../../types/options";

export interface OptionCheckboxProps {
    option: IOptionItem;
}

export const OptionCheckbox = (props: OptionCheckboxProps) => {

 const [checked, setChecked] = React.useState(props.option.value.toString() == 'true' ? true : false);
    return ( 
    <Checkbox
    shape="circular"
    label={props.option.name}
    checked={checked}
    onChange={(_event) => {
        setChecked(!checked);
    }}
    />
    )
}
