import {Dispatcher} from "flux";

class ActionDispatcher extends Dispatcher
{
    constructor()
    {
        super();
        this.payloadStack = [];
    }
    
    dispatch(payload)
    {
        if(this._isDispatching)
            this.payloadStack.push(payload);
        else
            super.dispatch(payload);
    }
    
    _stopDispatching()
    {
        super._stopDispatching();
        if(this.payloadStack.length > 0)
        {
            const payload = this.payloadStack.shift();
            super.dispatch(payload);
        }
    }
}
export default new ActionDispatcher();