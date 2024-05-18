import {
    makeStyles,
    Button,
    Popover,
    PopoverSurface,
    PopoverTrigger,
    tokens,
    Text
  } from "@fluentui/react-components";
  import { Info24Regular, Check24Filled } from "@fluentui/react-icons";
import { translate } from "../../localization/localization";
    
  const useStyles = makeStyles({
    contentHeader: {
      marginTop: "0",
    },
    container: {
      width: '300px',
      textAlign: 'center', // Выравнивание текста по центру
    },
    button: {
      marginTop: '20px', // Отступ между текстом и кнопкой
      width: '90%', // Ширина кнопки
    },
  });
  
  const useLayoutStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      rowGap: tokens.spacingVerticalMNudge,
    },
  });
  
  export interface InfoPropoverProps {
      description: string;
  
  }
  const InfoContent = (props: InfoPropoverProps) => {
      const styles = useStyles();
      return (
          <>
        <div className={styles.container}>
          <Text size={300}>
            {props.description}
          </Text>
        </div>
        <div>
          <Button 
            size="medium" 
            icon={< Check24Filled/>}
            className={styles.button} // Применяем стили для кнопки
          >
            {translate('ui.label.Ok', 'Ok')}
          </Button>
        </div>
      </>
      );
    };
  
  
  export const InfoLabel = (props: InfoPropoverProps) => {
    const layoutStyles = useLayoutStyles();
  
    return (
      <div className={layoutStyles.root}>
  
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
          <Button 
            size="small" 
            icon={<Info24Regular />} 
            appearance="subtle" // Применение стиля primary
            style={{ marginLeft: '5px' }} // Маленький отступ слева
        />
          </PopoverTrigger>
  
          <PopoverSurface tabIndex={-1}>
            <InfoContent description={props.description}/>
              
          </PopoverSurface>
        </Popover>
      </div>
    );
  };