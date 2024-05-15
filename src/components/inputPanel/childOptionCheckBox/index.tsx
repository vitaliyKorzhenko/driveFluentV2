import * as React from "react";
import { Switch } from "@fluentui/react-components";
import { IOptionItem } from "../../../types/options";

export interface OptionChildCheckboxProps {
    option: IOptionItem;
    isVisble: boolean;
}

export const ChildOptionCheckbox = (props: OptionChildCheckboxProps) => {

 const [checked, setChecked] = React.useState(props.option.value.toString() == 'true' ? true : false);

 if (props.isVisble) {

    return ( 
    <Switch
    label={props.option.name}
    checked={checked}
    onChange={(_event) => {
        setChecked(!checked);
    }}
    />
    )
} else {
    return <></>;
}
}
