
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/core/ui/Dialog";

interface DeleteModalProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  message,
  open,
  onClose,
  onDelete,
}) => {
  const cancelLabel = 'Cancel';
  const deleteLabel = 'Delete';

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-secondary text-2xl">{title}</AlertDialogTitle>
          <AlertDialogDescription >
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} className="bg-secondary hover:text-primary hover:border-primary">{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className='text-destructive hover:text-destructive-foreground border-destructive bg-destructive-foreground hover:border-destructive-foreground hover:bg-destructive'>{deleteLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  );
};

export default DeleteModal;
