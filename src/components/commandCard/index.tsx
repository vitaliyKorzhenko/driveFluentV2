
import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  shorthands,
} from "@fluentui/react-components";
import { ShareRegular, MoneyRegular, InfoRegular } from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@fluentui/react-components";
import { Subscriptions } from "../../types";

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/";

  return `${ASSET_URL}${asset}`;
};

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    width: "720px",
    maxWidth: "100%",
  },
});

export interface CommandCardProps {
    title: string;
    description: string;
    subcription: Subscriptions;
}

export const CommandCard = (props: CommandCardProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        image={
          <img
            src={resolveAsset("avatar_elvia.svg")}
            alt="Elvia Atkins avatar picture"
          />
        }
        header={
          <Body1>
            <h2>{props.title}</h2>
          </Body1>
        }
        description={<Caption1>{props.description}</Caption1>}
      />


      <CardFooter>
        <Button 
        style={{
            backgroundColor: props.subcription == Subscriptions.FREE 
            ? "#808080" :
            props.subcription == Subscriptions.PRO
            ? "#B22222" :
            "#FF4500",
            color: "white",
            borderRadius: "20px",
            padding: "5px 20px"
        
        }}
        icon={<MoneyRegular fontSize={16} />}>{
        props.subcription == Subscriptions.FREE 
        ? "Free" :
        props.subcription == Subscriptions.PRO
        ? "Pro" :
        "Premium"
         }</Button>
         <Button 
         style={{
            backgroundColor: "#1E90FF",
            color: "white",
            borderRadius: "20px",
            padding: "5px 20px"
         }}
         icon={<InfoRegular fontSize={16} />}>Info</Button>
        <Button 
        style={{
            backgroundColor: "#1C1C1C",
            color: "white",
            borderRadius: "20px",
            padding: "5px 20px"
        }}
        icon={<ShareRegular fontSize={16} />}>Share
        </Button>
      </CardFooter>
    </Card>
  );
};