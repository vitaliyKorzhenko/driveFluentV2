import { CompoundButton } from "@fluentui/react-components";
import { MoneyRegular } from "@fluentui/react-icons";
import type { CompoundButtonProps } from "@fluentui/react-components";

export const PricesButton = (props: CompoundButtonProps) => (
  <CompoundButton
    icon={<MoneyRegular />}
    secondaryContent=""
    shape="circular"
    size="small"
    style={{
        backgroundColor: "white",
        color: "#1E90FF",
    }}
    {...props}
  >
    Show Prices in $USD
  </CompoundButton>
);