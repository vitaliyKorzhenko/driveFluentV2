import React from 'react';
import { Link } from '@fluentui/react-components';
import {
    Question24Regular
  } from "@fluentui/react-icons";
import { IOptionItem } from '../../../types/options';
import OptionList from '../optionList';
import { OptionCheckbox } from '../optionCheckbox';
import { OptionNumberInput } from '../optionNumberInput';
interface VariablesSectionProps {
    window: string;
}

const OptionSections: React.FC<VariablesSectionProps> = ({ window }) => {
    const parsedWindow = JSON.parse(window);

    console.log('PARSED WINDOW', parsedWindow)
    const items: IOptionItem[] = parsedWindow.items;

   
    console.log('VAR RANGE ITEMS', items);

    return (
        <div style={{
            width: '100%',     
        }}>
           {items.map((item: IOptionItem, index: number) => (
                <div key={index}
                style={{
                    width: '90%',
                    padding: '10px',
                }}
                >
            { item.nodename == 'list' ? 
              <OptionList
                option={item}
            />
            :
            item.nodename == 'checkbox' ?
            <OptionCheckbox
                option={item}
            />
            :
            item.nodename == "number" ?
            <OptionNumberInput
                option={item}
            />
            :
              <></>
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

export default OptionSections;
