import React from 'react';
import { Divider, Label } from '@fluentui/react-components';
import { IPreferencesOptions } from '../types';
import { PrefsCheckBox } from '../prefsCheckBox';
import { PrefsFormatDecimal } from '../prefsFormatdecimal';

interface PreferencesOptionsSection {
    name: string;
    items: IPreferencesOptions[];
}

const NumericFormatSections: React.FC<PreferencesOptionsSection> = ({ name, items }) => {
   

   
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
                        item.nodename == 'checkbox' ?
                        <PrefsCheckBox
                        item={item}
                        />
                        :
                        item.nodename == 'formatdecimal' ?

                        <PrefsFormatDecimal
                        option={item}
                        /> 
                        :
        
                        <></>
                    }
                </div>
            ))}
        </div>
    );
};

export default NumericFormatSections;
