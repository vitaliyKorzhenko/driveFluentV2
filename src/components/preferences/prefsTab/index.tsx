import React from 'react';
import preferences from '../../../helpers/preferences.json';
import OptionSections from '../outputOptions';
import { IPreferencesOptions } from '../types';
import NumericFormatSections from '../numericFormatOptions';
import PreferencesStatisticsSection from '../prefsStatistics';

interface PreferencesOptionsSection {

}

const PrefsTab: React.FC<PreferencesOptionsSection> = ({  }) => {

    const outOptions = preferences.sections.filter((section) => section.name == 'Output Options');

    const numericFormatOptions = preferences.sections.filter((section) => section.name == 'Numeric Format');

    const statisticsOptions = preferences.sections.filter((section) => section.name == 'Statistics');

    console.log('outOptions', outOptions[0]);

    function parseItemsFromJsonToPrefOptions(item: any): IPreferencesOptions[] {
        return item.items.map((item: any) => {
            return {
                nodename: item.nodename ?? '',
                value: item.value ?? '',
                name: item.name ?? '',
                select: item.select ?? '',
                returnname: item.returnname ?? '',
                min: item.min ?? 0,
                max: item.max ?? 0,
            }
        })
        
    }
    return (
        <div style={{
            width: '100%',    
            height: '500px',
            overflowY: 'auto', // Enable vertical scrolling   
 
        }}>
           <OptionSections
            name={outOptions[0].name}
            items={parseItemsFromJsonToPrefOptions(outOptions[0])}
           />
           <NumericFormatSections
            name={numericFormatOptions[0].name}
            items={parseItemsFromJsonToPrefOptions(numericFormatOptions[0])
            }
            />
            <PreferencesStatisticsSection
            name={statisticsOptions[0].name}
            items={parseItemsFromJsonToPrefOptions(statisticsOptions[0])
            }
            />
        </div>
    );
};

export default PrefsTab;
