import {Common} from "../utils/enums";

declare global {
    interface Note {
        id: string;
        title: string;
        content: string;
        created: string;
        updated: string;
    }
}
export {};


export interface Emits {
    (event: Common.toggleMenu, value: boolean): void;
    (event: Common.toggleDeleteModal, value: boolean): void;
    (event: Common.addNewNote, value?: boolean): void;
    (event: Common.searchMode, value?: boolean): void;
}
