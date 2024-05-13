import React from 'react';
import { Link } from '@fluentui/react-components';
import {
    ClearFormatting24Regular
} from "@fluentui/react-icons";
import { IOptionItem } from '../../../types/options';
import OptionList from '../optionList';
import { OptionParentCheckbox } from '../optionCheckbox';
import { OptionNumberInput } from '../optionNumberInput';
import { OptionStringInput } from '../optionStringInput';


interface OptionSectionProps {
    items: IOptionItem[];
}

interface IOptionElement {
    item: IOptionItem;
    childOptions?: IOptionItem[];
}
const OptionSections: React.FC<OptionSectionProps> = ({ items }) => {

    console.log('ALL OPTIONS', items);

    function parseOptionItems(items: IOptionItem[]): IOptionElement[] {
        if (!items || items.length == 0) {
            return [];
        }

        let optionItems: IOptionElement[] = [];
        let currentCheckBoxParentIndex = -1;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            //fix logic
            if (!item.actionEnabled && !item.indent) {
                //parent option
                optionItems.push({
                    item: item,
                    childOptions: []
                });
                //save the parent index
                if (item.nodename == 'checkbox')
                currentCheckBoxParentIndex = i;
               
            } else {
                if (currentCheckBoxParentIndex >= 0 &&
                    optionItems[currentCheckBoxParentIndex] !== undefined &&
                    optionItems[currentCheckBoxParentIndex].childOptions !== undefined &&
                    Array.isArray(optionItems[currentCheckBoxParentIndex].childOptions)) {
                    const currentParent = optionItems[currentCheckBoxParentIndex];
                    if (currentParent && currentParent.childOptions)
                        currentParent.childOptions.push(item);
                }
            }
        }

        return optionItems;
    }

    console.log("PARSE OPTION ITEMS!!!!", parseOptionItems(items));

    const optionElements: IOptionElement[] = parseOptionItems(items);
    return (
        <div style={{
            width: '100%',
        }}>
            {optionElements.map((element: IOptionElement, index: number) => (
                <div key={index}
                    style={{
                        width: '90%',
                        padding: '10px',
                    }}
                >
                    {element.item.nodename == 'list' ?
                        <OptionList
                            option={element.item}
                        />
                        :
                        element.item.nodename == 'checkbox' ?
                            <OptionParentCheckbox
                                option={element.item}
                                childOptions={element.childOptions}
                            />
                            :
                            element.item.nodename == "number" || element.item.nodename == 'numberint' ?
                                <OptionNumberInput
                                    option={element.item}
                                    isVisible={true}
                                />
                                :
                                element.item.nodename == 'string' ?
                                    <OptionStringInput
                                        option={element.item}
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
                <ClearFormatting24Regular type='primary' />
                <Link >Reset Options</Link>

            </div>
        </div>
    );
};

export default OptionSections;
