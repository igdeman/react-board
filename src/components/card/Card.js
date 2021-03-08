import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.scss";

export default class Card extends React.Component
{
    render()
    {
        return(
            <div className={styles.Card}>
                {this.props.data.name}
            </div>
        );
    }
}
Card.propTypes = {
    data:PropTypes.object.isRequired,
};