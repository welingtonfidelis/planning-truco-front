interface Props {
  textToCopy: string;
  onSuccess?: () => void;
}

export const copyToClipboard = (props: Props) => {
  const { textToCopy, onSuccess } = props;

  navigator.clipboard.writeText(textToCopy).then(() => {
    if (onSuccess) onSuccess();
  });
};
