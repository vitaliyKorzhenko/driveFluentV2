import React from 'react';
import { Divider, Label } from '@fluentui/react-components';
import { IPreferencesOptions } from '../types';
import { PrefFont } from '../prefFont';
import { PrefFontSize } from '../prefFontSize';
import { PrefsCheckBox } from '../prefsCheckBox';

interface PreferencesOptionsSection {
    name: string;
    items: IPreferencesOptions[];
}

const OptionSections: React.FC<PreferencesOptionsSection> = ({ name, items }) => {
   

   
    console.log('items', items);

    return (
        <div style={{
            width: '100%',     
        }}>
            <Divider appearance="strong">
                <Label size='large' style={{fontWeight: 'bold'}}>
                {name}
                </Label>
            </Divider>
           {items.map((item: IPreferencesOptions, index: number) => (
                <div key={index}
                style={{
                    width: '90%',
                    padding: '5px',
                }}
                >
                    {
                        item.nodename == 'font' ?
                        <PrefFont 
                        option={item}
                        />
                        :
                        item.nodename == 'fontsize' ?
                        <PrefFontSize
                        option={item}
                        />
                        :
                        item.nodename == 'checkbox' ?
                        <PrefsCheckBox
                        item={item}
                        />
                        :
                        <></>
                    }
                </div>
            ))}
        </div>
    );
};

export default OptionSections;
