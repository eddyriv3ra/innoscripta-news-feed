"use client";
import React, { ForwardedRef, ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./styles.css";

interface IOption {
  value: string;
  label: string;
}

interface ISelect {
  options: IOption[];
  setValue: (v: string) => void;
  value: string;
  label: string;
}

const SelectComponent = ({ options, setValue, value, label }: ISelect) => {
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className="SelectTrigger" aria-label="News">
        <Select.Value aria-label={value}>{options.find(option => option.label === value)?.label}</Select.Value>
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">{label}</Select.Label>
              {options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface ISelectItem extends Select.SelectItemProps {
  children: ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: ISelectItem,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default SelectComponent;
