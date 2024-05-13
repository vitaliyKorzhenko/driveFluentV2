import * as React from "react";
import { Switch } from "@fluentui/react-components";
import { IOptionItem } from "../../../types/options";
import { ChildOptionCheckbox } from "../childOptionCheckBox";
import { OptionNumberInput } from "../optionNumberInput";
import { OptionStringInput } from "../optionStringInput";

export interface OptionCheckboxProps {
    option: IOptionItem;
    childOptions?: IOptionItem[];
}

export const OptionParentCheckbox = (props: OptionCheckboxProps) => {

 const [checked, setChecked] = React.useState(props.option.value.toString() == 'true' ? true : false);
    return ( 
        <>
    <Switch
    // shape="circular"
    label={props.option.name}
    checked={checked}
    onChange={(_event) => {
        setChecked(!checked);
    }}
    />
    <div style={{marginLeft: '20px'}}>
    {props.childOptions && props.childOptions.map((childOption: IOptionItem, index: number) => (
       childOption.nodename == 'checkbox' ?
       <ChildOptionCheckbox
         key={index}
            option={childOption}
            isVisble={checked}
         />
         :
         childOption.nodename == 'number' || childOption.nodename == 'numberint' ?
            <OptionNumberInput
            key={index}
            option={childOption}
            isVisible={checked}
            />
            :
            childOption.nodename == 'string' ?
            <OptionStringInput
            key={index}
            option={childOption}
            />
            :
            <></>
        
    ))}
    </div>
    </> 
    )
}
