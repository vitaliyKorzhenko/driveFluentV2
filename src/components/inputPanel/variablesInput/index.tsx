import { Label, Select } from '@fluentui/react-components';
import React from 'react';

interface VariablesInputProps {
    size: number;
    multiple: boolean;
    defaultValue: string;
    options: { key: string; text: string }[];
    label: string;
    description: string;
}

//state interface

interface VariablesInputState {
    selectedValue: string;
}

class VarRangeSingle extends React.Component<VariablesInputProps, VariablesInputState> {
    constructor(props: VariablesInputProps) {
        super(props);
        this.state = {
            selectedValue: props.defaultValue,
        };

    }

    
    render() {
        return (
            <div style={{
                width: '100%',
            }}>
                <Label weight="semibold">{this.props.label}</Label>
                <Select
                    value={this.state.selectedValue}
                    style={{
                        width: '100%',
                        minWidth: '200px',
                    }}
                   // multiple={this.props.multiple}
                    onChange={(event) => this.setState({ selectedValue: event.target.value })}
                >
                    {this.props.options.map((option) => (
                        <option key={option.key} value={option.key}>
                            {option.text}
                        </option>
                    ))}
                </Select>
            </div>
        );
    }
}

export default VarRangeSingle;
