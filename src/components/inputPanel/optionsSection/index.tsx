import React from 'react';
import { Link } from '@fluentui/react-components';
import {
    ClearFormatting24Regular
  } from "@fluentui/react-icons";
import { IOptionItem } from '../../../types/options';
import OptionList from '../optionList';
import { OptionCheckbox } from '../optionCheckbox';
import { OptionNumberInput } from '../optionNumberInput';
interface VariablesSectionProps {
    items: IOptionItem[];
}

const OptionSections: React.FC<VariablesSectionProps> = ({ items }) => {
   
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
            item.nodename == "number" || item.nodename == 'numberint' ?
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
            <ClearFormatting24Regular  type='primary'/>
                     <Link >Reset Options</Link>

        </div>
        </div>
    );
};

export default OptionSections;
