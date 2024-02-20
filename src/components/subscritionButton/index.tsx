import { CompoundButton } from "@fluentui/react-components";
import { PaymentRegular } from "@fluentui/react-icons";
import type { CompoundButtonProps } from "@fluentui/react-components";

export const SubscriptionButton = (props: CompoundButtonProps) => (
  <CompoundButton
    icon={<PaymentRegular />}
    secondaryContent=""
    shape="circular"
    style={{
        backgroundColor: "#1E90FF",
        color: "white",
    }}
    {...props}
  >
    FREE
  </CompoundButton>
);