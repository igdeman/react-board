import { UPDATE_LISTS } from "./actionTypes";
import AppStore from "../AppStore";

export default class UpdateLists
{
    type = UPDATE_LISTS;

    constructor(lists)
    {
        this.lists = lists;
    }
    
    execute(onCompleteHandler)
    {
        const state = {...AppStore.state};
        state.lists = [...this.lists];
        onCompleteHandler?.(state);
    }
}