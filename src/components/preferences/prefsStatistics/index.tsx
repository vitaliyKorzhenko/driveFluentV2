import React from 'react';
import { Divider, Label } from '@fluentui/react-components';
import { IPreferencesOptions } from '../types';
import { PrefsList } from '../prefsList';
import { PrefsNumberInt } from '../prefsNumberInt';

interface PreferencesOptionsSection {
    name: string;
    items: IPreferencesOptions[];
}

const PreferencesStatisticsSection: React.FC<PreferencesOptionsSection> = ({ name, items }) => {



    console.log('items', items);

    return (
        <div style={{
            width: '100%',
        }}>
            <Divider appearance="strong">
                <Label size='large' style={{ fontWeight: 'bold' }}>
                    {name}
                </Label>
            </Divider>           {items.map((item: IPreferencesOptions, index: number) => (
                <div key={index}
                    style={{
                        width: '90%',
                        padding: '10px',
                    }}
                >
                    {
                        item.nodename == 'list' ?
                            <PrefsList
                                option={item}
                            />
                            :
                            item.nodename == 'numberint'
                                ?
                                <PrefsNumberInt
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

export default PreferencesStatisticsSection;
