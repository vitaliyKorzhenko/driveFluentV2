import React from 'react';
import { IWindowItem } from '../../../types/window';
import { VarRangeMulti } from '../varRangeMulti';
import VarRangeSingle from '../varRangeSingle';
import { Link } from '@fluentui/react-components';
import {
    Question24Regular
  } from "@fluentui/react-icons";
interface VariablesSectionProps {
    window: string;
}

const VariablesSection: React.FC<VariablesSectionProps> = ({ window }) => {
    const parsedWindow = JSON.parse(window);
    const items: IWindowItem[] = parsedWindow.items.filter((item: IWindowItem) => item.nodename === 'VarRange');

    const testOptions = [
        { key: '1', text: 'A' },
        { key: '2', text: 'B' },
        { key: '3', text: 'C' },
    ];

    console.log('VAR RANGE ITEMS', items);

    return (
        <div style={{
            width: '100%',     
        }}>
           {items.map((item: IWindowItem, index: number) => (
                <div key={index}
                style={{
                    width: '90%',
                    padding: '10px',
                }}
                >
            { item.multi ? 
            <VarRangeMulti
                options={testOptions}
                label={item.label}
                description={item.description}
            />
            :
                <VarRangeSingle
                        size={200}
                        multiple={item.multi}
                        defaultValue="1"
                        options={testOptions}
                        label={item.label}
                        description={item.description}
                    />
            }
                </div>
            ))}
             <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            margin: '40px' 
        }}>
            <Question24Regular  type='primary'/>
                     <Link >How to use this window</Link>

        </div>
        </div>
    );
};

export default VariablesSection;
