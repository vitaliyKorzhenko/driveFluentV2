import React from 'react';
import preferences from '../../../helpers/preferences.json';
import OptionSections from '../outputOptions';
import { IPreferencesOptions } from '../types';

interface PreferencesOptionsSection {

}

const PrefsTab: React.FC<PreferencesOptionsSection> = ({  }) => {

    const outOptions = preferences.sections.filter((section) => section.name == 'Output Options');

    console.log('outOptions', outOptions[0]);

    function parseItemsFromJsonToPrefOptions(item: any): IPreferencesOptions[] {
        return item.items.map((item: any) => {
            return {
                nodename: item.nodename ?? '',
                value: item.value ?? '',
                name: item.name ?? '',
                select: item.select ?? '',
                returnname: item.returnname ?? ''
            }
        })
        
    }
    return (
        <div style={{
            width: '100%',     
        }}>
           <OptionSections
            name={outOptions[0].name}
            items={parseItemsFromJsonToPrefOptions(outOptions[0])}
           />
        </div>
    );
};

export default PrefsTab;
