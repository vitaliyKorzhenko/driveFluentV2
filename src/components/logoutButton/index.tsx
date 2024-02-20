//create function component for logout button use fluentv2 with icon and text
import { SignOut24Regular } from "@fluentui/react-icons";
import { CompoundButton, CompoundButtonProps } from "@fluentui/react-components";

export const LogoutButton = (props: CompoundButtonProps) => (
  <CompoundButton
    icon={<SignOut24Regular />}
    appearance="outline"
    {...props}
    shape="circular"
  >
    Logout
  </CompoundButton>
);