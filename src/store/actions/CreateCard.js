import { CREATE_CARD } from "./actionTypes";
import AppStore from "../AppStore";

export default class CreateCard
{
    type = CREATE_CARD;

    constructor(listId, cardName)
    {
        this.cardName = cardName;
        this.listId = listId;
    }
    
    execute(onCompleteHandler)
    {
        const state = {...AppStore.state};
        const list = state.lists.find((item)=>{
            if(item.id === this.listId)
                return true;
            return false;
        })
        list.cards.push({name:this.cardName});
        const lists = state.lists.map((item)=>{
            if(item.id === list.id)
                return list;
            return item;
        });
        onCompleteHandler?.({lists});
    }
}