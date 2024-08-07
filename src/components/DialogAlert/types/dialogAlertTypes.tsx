export interface DialogAlertProps {
    isOpen: boolean;
    onOpen: () => void;
    title: string;
    message: string | JSX.Element;
  };