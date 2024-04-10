export interface BasicCommand {
    id: number;
    title: string;
    description: string;
    language: string;
    isActive: boolean;
    groupId: string;
    comands: Command[];
}


export interface Command {
    id: number;
    title: string;
    description: string;
    visbilility: boolean;
    isenabled: boolean;
    commandIdOld: string;
    subscription: string
    window: JSON;
    advancedwindow: JSON;
}