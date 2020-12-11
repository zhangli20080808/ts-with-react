import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'small'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    href?: string;
    children: React.ReactNode;
}

const button: React.FC<BaseButtonProps> = props => {
    const {disabled, size, href, btnType, children} = props;
    // btn btn-lg btn-primary
    const classes = classnames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === ButtonType.Link && disabled
    });
    if (btnType === ButtonType.Link) {
        return (
            <a className={classes} href={href}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={classes} disabled={disabled}>
                {children}
            </button>
        );
    }
};

const defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
};

button.defaultProps = defaultProps;
export default button;
