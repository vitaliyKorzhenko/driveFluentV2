import { Label, Select } from '@fluentui/react-components';
import React from 'react';
import { IOptionItem } from '../../../types/options';

interface OptionListProps {
   option: IOptionItem
}

//state interface

interface OptionListState {
    optionValues: string[];
    selectedValue: string;
}

class OptionList extends React.Component<OptionListProps, OptionListState> {
    constructor(props: OptionListProps) {
        let values: string[] = props.option.value.split('\\n')
        super(props);
        this.state = {
           optionValues: values,
           selectedValue: values[0],
        };

    }

    
    render() {
        return (
            <div style={{
                width: '100%',
            }}>
                
                <Label >{this.props.option.name}</Label>

   
                <Select
                    value={this.state.selectedValue}
                    style={{
                        width: '100%',
                        minWidth: '200px',
                    }}
                   // multiple={this.props.multiple}
                    onChange={(event) => this.setState({ selectedValue: event.target.value })}
                >
                    {this.state.optionValues.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            </div>
        );
 }
}


export default OptionList;
