import React from "react";
import PropTypes from "prop-types";
import styles from "./add.module.scss";

export default class Add extends React.Component
{
    constructor(props)
    {
        super(props);
        this.inputFieldRef = React.createRef();
        this.state = {
            condition:"idle",
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.submit = this.submit.bind(this);
    }

    render()
    {
        const classNames = (this.state.condition === "idle") ? [styles.Add] : [styles.Add, styles.active]
        return(
            <div className={classNames.join(" ")}>
                {
                    (this.state.condition === "idle")
                    ? this.renderOpenFormButton()
                    : this.renderAddForm()
                }
            </div>
        );
    }

    renderOpenFormButton()
    {
        return(
            <button
                className={(this.props.openFormButtonClass) ? [styles.openButton, this.props.openFormButtonClass].join(" ") : styles.openButton}
                onClick={()=>{
                    this.setState({condition:"active"}, ()=>{
                        this.inputFieldRef.current.focus();
                    });
                }}
            >
                <span>+</span>
                <span>{(this.props.openFormButtonLabel) ? this.props.openFormButtonLabel : ""}</span>
            </button>
        )
    }

    renderAddForm()
    {
        return(
            <ul className={styles.form}>
                <li>
                    {
                        (this.props.inputType === "text")
                        ?   <input 
                                type="text"
                                ref={this.inputFieldRef} 
                                className={(this.props.inputFieldClass) ? [styles.inputField, this.props.inputFieldClass].join(" ") : styles.inputField} 
                                placeholder={(this.props.placeholder) ? this.props.placeholder : ""} 
                                onKeyUp={this.onKeyDown}
                            />
                        :   <textarea 
                                ref={this.inputFieldRef} 
                                className={(this.props.inputFieldClass) ? [styles.inputField, this.props.inputFieldClass].join(" ") : styles.inputField} 
                                placeholder={(this.props.placeholder) ? this.props.placeholder : ""} 
                                onKeyUp={this.onKeyDown}
                            ></textarea>
                    }
                </li>
                <li>
                    <button className={(this.props.addButtonClass) ? [styles.addButton, this.props.addButtonClass].join(" ") : styles.addButton} 
                        onClick={this.submit}
                    >{(this.props.addButtonLabel) ? this.props.addButtonLabel : "Add"}</button>
                    <button className={(this.props.closeButtonClass) ? [styles.closeButton, this.props.closeButtonClass].join(" ") : styles.closeButton} 
                        onClick={(e)=>{this.setState({condition:"idle"})}}
                    ></button>
                </li>
            </ul>
        );
    }

    onKeyDown(e)
    {
        if(e.keyCode === 13)
            this.submit();
        else if(e.keyCode === 27)
            this.setState({condition:"idle"});
    }

    submit(e)
    {
        if(this.inputFieldRef.current.value !== "")
        {
            this.props.onSubmit?.(this.inputFieldRef.current.value)
            this.inputFieldRef.current.value = "";
        }
        else
            alert("Invalid input!");
    }
}
Add.propTypes = {
    inputType:PropTypes.string,
    openFormButtonLabel:PropTypes.string,
    openFormButtonClass:PropTypes.string,
    placeholder:PropTypes.string,
    inputFieldClass:PropTypes.string,
    addButtonLabel:PropTypes.string,
    addButtonClass:PropTypes.string,
    closeButtonClass:PropTypes.string,
    onSubmit:PropTypes.func,
};