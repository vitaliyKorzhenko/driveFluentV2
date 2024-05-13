import * as React from "react";
import {
  makeStyles,
  shorthands,
  useId,
  Button,
  Input,
  Label,
} from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";
import { IOptionItem } from "../../../types/options";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    // Prevent the example from taking the full width of the page (optional)
    width: "100%",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
});


export interface OptionNumberInputProps {
    option: IOptionItem;
    isVisible: boolean;
}

const ClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<Delete24Regular />}
      size="small"
    />
  );
};

export const OptionNumberInput = (props: OptionNumberInputProps) => {
  const styles = useStyles();

  const afterId = useId("content-after");

  console.log('OptionNumberInput', props.option);
  const [value, setValue] = React.useState<string>(props.option.value !== undefined && props.option.value !== null ? props.option.value.toString() : "");
  if (props.isVisible) {
  return (
     <div className={styles.root}>
        <div>
        <Label htmlFor={afterId}>{props.option.name}</Label>
        <Input
        type="number"
          contentAfter={<ClearButton aria-label="clear" />}
          id={afterId}
         value={value}
            onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </div>
  );
  } else {
    return <></>
  }
};