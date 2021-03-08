import React from "react";
import PropTypes from "prop-types";
import Card from "../card/Card";
import Add from "../add/Add";
import styles from "./list.module.scss";
import AppActions from "../../store/actions/AppActions";

export default class List extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isDragging: false,
        };
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragExit = this.onDragExit.bind(this);
    }

    onDragStart(e)
    {
        e.preventDefault();
        this.props.onDragStart?.(e);
    }
    onDragEnter(e)
    {
        if(!this.props.isDragging)
            this.props.onDragEnter?.(e);
    }
    onDragExit(e)
    {
        if(!this.props.isDragging)
            this.props.onDragExit?.(e);
    }
    
    render()
    {
        const classNames = (this.props.isDragging) ? [styles.List, styles.dragging] : [styles.List];
        if(this.props.className)
            classNames.push(this.props.className);
        return(
            <div className={classNames.join(" ")} 
                onMouseOver={this.onDragEnter}
                onMouseOut={this.onDragExit}
            >
                <div className={styles.content}>
                    <h3 draggable onDragStart={this.onDragStart}>
                        {this.props.data.name}
                    </h3>
                    {
                        this.props.data.cards.map((card, index)=>{
                            return (
                                <Card key={index} data={card} />
                            );
                        })
                    }
                    <Add 
                        openFormButtonLabel={(this.props.data.cards.length > 0) ? "Add another card" : "Add a card"}
                        openFormButtonClass={styles.addCardLabel}
                        placeholder="Enter a title for this card..."
                        inputFieldClass={styles.addCardInputField}
                        addButtonLabel="Add Card"
                        onSubmit={(value)=>{
                            AppActions.createCard(this.props.data.id, value);
                        }}
                    />
                </div>
            </div>
        );
    }
}
List.propTypes = {
    data:PropTypes.object.isRequired,
    isDragging:PropTypes.bool,
    onDragStart:PropTypes.func,
    onDragEnter:PropTypes.func,
    onDragExit:PropTypes.func,
};