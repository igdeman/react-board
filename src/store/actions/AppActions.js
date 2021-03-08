import ActionDispatcher from "../../flux/Dispatcher";
import CreateCard from "./CreateCard";
import CreateList from "./CreateList";
import GetData from "./GetData";
import UpdateLists from "./UpdateLists";

let actionId = 0;
const getActionId = () => {
    actionId++;
    return actionId;
}
class AppActions
{
    getData = () => {return this.dispatch(new GetData())};
    updateList = (lists) => {return this.dispatch(new UpdateLists(lists))};
    createList = (name) => {return this.dispatch(new CreateList(name))};
    createCard = (listId, name) => {return this.dispatch(new CreateCard(listId, name))};
    
    dispatch(action)
    {
        action.id = getActionId();
        ActionDispatcher.dispatch(action);
        return action.id;
    }
}
export default new AppActions();