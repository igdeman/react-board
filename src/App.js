import React from "react";
import AppStore from "./store/AppStore";
import Board from "./components/board/Board";
import AppActions from "./store/actions/AppActions";
export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  componentDidMount()
  {
      AppStore.on("change", this.storeHandler);
      AppActions.getData();
  }
  componentWillUnmount()
  {
      AppStore.off("change", this.storeHandler);
  }

  storeHandler = (action, state) =>
  {
    this.setState({lists:state.lists});
  }

  render()
  {
    return(<Board lists={(this.state.lists) ? this.state.lists: []} />);
  }
}
