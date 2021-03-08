import { EventEmitter } from "events";
import ActionDispatcher from "../flux/Dispatcher";

let _state = {};

class AppStore extends EventEmitter
{
    constructor()
    {
        super();
        this.setMaxListeners(Infinity);
        ActionDispatcher.register(this.actionHandler);
    }

    get state(){return Object.freeze(Object.assign({}, _state))}

    actionHandler = (action) =>
    {
        action.execute((state) => {
            const data = {
                ..._state,
                ...state,
                action: action
            }
            _state = data;
            this.emit("change", action, state);
        });
    }
}
export default new AppStore();