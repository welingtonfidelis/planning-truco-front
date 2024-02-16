export interface Props {
    title: string;
    onConfirmButtonText?: string;
    onCloseButtonText?: string;
    isOpen: boolean;
    onConfirmLoading?: boolean;
    showActionButtons?: boolean;
    extraActionButton?: JSX.Element;
    onConfirm?: () => void;
    onClose: () => void;
  }