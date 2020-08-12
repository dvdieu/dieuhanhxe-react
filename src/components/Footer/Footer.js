import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Footer = ({
    //props
    collapse
}) => {
    return (
        <div
            id="root_footer"
            className={classNames({
                [styles.footer]: true,
                [styles.footer_collapse]: collapse
            })}
        />
    )
}

export default React.memo(Footer)