import React from "react";
import PropTypes from "prop-types";
import AppActions from "../../store/actions/AppActions";
import List from "../list/List";
import styles from "./board.module.scss";
import Add from "../add/Add";

export default class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            lists:[...props.lists],
        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onListDragStart = this.onListDragStart.bind(this);
        this.onListDragComplete = this.onListDragComplete.bind(this);
    }

    onListDragStart(e, data)
    {
        console.log("onListStartDrag");
        this.setState({draggable:{
            data,
            x: e.target.offsetLeft,
            y: e.target.offsetTop,
            mouseOffsetX: e.clientX - e.target.offsetLeft,
            mouseOffsetY: e.clientY - e.target.offsetTop,
        }}, ()=>{
            document.addEventListener("mousemove", this.onMouseMove);
            document.addEventListener("mouseup", this.onListDragComplete);
        });

    }
    onListDragEnter(e, data)
    {
        let lists = [...this.props.lists];
        lists = lists.map((list)=>{
            if(list.id === data.id)
                return this.state.draggable.data;
            else if(list.id === this.state.draggable.data.id)
                return data;
            return list;
        });
        AppActions.updateList(lists);
    }
    onListDragComplete(e)
    {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener("mouseup", this.onListDragComplete);
        this.setState({draggable:null});
    }
    onMouseMove(e)
    {
        this.setState({
            draggable:{
                ...this.state.draggable,
                x: e.clientX - this.state.draggable.mouseOffsetX,
                y: e.clientY - this.state.draggable.mouseOffsetY,
            }
        });
    }
    
    render()
    {
        return(
            <div className={styles.Board}>
                {
                    this.props.lists.map((list, index)=>{
                        return(
                            <List key={list.id} 
                                data={list} 
                                isDragging={(this.state.draggable && this.state.draggable.data.id === list.id) ? true : false}
                                onDragStart={(e)=>{
                                    this.onListDragStart(e, list);
                                }}
                                onDragEnter={(e)=>{
                                    if(this.state.draggable)
                                        this.onListDragEnter(e, list);
                                }}
                            />
                        );
                    })
                }
                {
                    (this.state.draggable) && 
                    <div 
                        className={styles.draggable}
                        style={{
                            top:`${this.state.draggable.y}px`,
                            left:`${this.state.draggable.x}px`,
                        }}
                    >
                        <List data={this.state.draggable.data} />
                    </div>
                }
                <Add
                    inputType="text"
                    openFormButtonLabel="Add another list"
                    placeholder="Enter list title..."
                    addButtonLabel="Add List"
                    onSubmit={(value)=>{
                        AppActions.createList(value);
                    }}
                />
            </div>
        );
    }
}
Board.propTypes = {
    lists:PropTypes.array.isRequired,
};