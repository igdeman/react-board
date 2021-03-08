import { CREATE_LIST } from "./actionTypes";
import AppStore from "../AppStore";

export default class CreateList
{
    type = CREATE_LIST;

    constructor(listName)
    {
        this.listName = listName;
    }
    
    execute(onCompleteHandler)
    {
        const state = {...AppStore.state};
        const list = {
            id:`list-${state.lists.length}`,
            name:this.listName,
            cards:[],
        };
        state.lists = [...state.lists, list];
        onCompleteHandler?.(state);
    }
}