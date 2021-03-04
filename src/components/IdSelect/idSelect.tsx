import React from "react";
import {Select} from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
    extends Omit<SelectProps,
        "value" | "onChange" | "defaultOptionName" | "options"> {
    value: string | number | undefined | null;
    onChange?: (value?: number) => void;
    defaultOptionName?: string;
    options?: { value: number; label: string }[];
}

/**
 * value可以传入多种类型的值
 * onChange只会回调number和undefined类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调 undefined
 * @param props
 * @constructor
 */
const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props;
    return (
        <Select
            value={toNumber(value)}
            onChange={(value: any) => {
                if (onChange) {
                    onChange(toNumber(value) || undefined)
                }
            }}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map(option => (
                <Select.Option key={option.value} value={option.value}>
                    {option.label}
                </Select.Option>
            ))}
        </Select>
    );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
export default IdSelect;
