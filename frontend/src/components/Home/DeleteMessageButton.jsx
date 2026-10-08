import api from "@/api/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { userContext } from "@/context/userContext";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const DeleteMessageButton = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {getAllFeedbacks} = useContext(userContext);  

  async function deleteFeedback() {
    // setOpen(true);
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.delete(`/user/delete/feedback/${id}`);
      console.log("response : ", response.data.message);
      toast.success("feedback deleted successfully");
      getAllFeedbacks()
    } catch (error) {
      toast.error("error while deleting feedback");
      console.log("error");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100 hover:text-red-600"
            aria-label="Delete message"
          >
            <X size={17} />
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this message?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This message will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFeedback}>{loading ? "deleting..." : "Delete"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMessageButton;
