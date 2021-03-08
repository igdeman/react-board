import { GET_DATA } from "./actionTypes";
import data from "../../data/data.json";

export default class GetData
{
    type = GET_DATA;

    execute(onCompleteHandler)
    {
        const state = {lists:[...data.lists]};
        state.lists = state.lists.map((list, index)=>{
            return {id:`list-${index}`, ...list}
        });
        onCompleteHandler?.(state);
    }
}