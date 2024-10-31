import { useFirestoreData } from "../context/hooks";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { useState } from "react";
import axios from "axios";
import generatePDFWithQRCode from "@/lib/create-pdf";

export interface IQuestion {
  id: string;
  customId: string;
  difficulty: string;
  hash: string;
  hint: string;
  questionText: string;
}

export default function ListAllQuestions() {
  const { collectionData } = useFirestoreData();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function handleDelete() {
    console.log("delete");
    console.log(deleteId);
    const data = { questionId: deleteId };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    axios.defaults.withCredentials = true;
    axios
      .post("/api/admin/questions/delete", data, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setDeleteAlert(false);
  }

  function handleQr(id: string) {
    const question = collectionData.questions?.find(
      (question) => question.id === id
    );
    generatePDFWithQRCode(question.hash);
    console.log("pdf generated");
  }

  return (
    <div>
      {collectionData.questions?.length} Total Challenges
      <br />
      Heres a list of all questions in database
      {collectionData.questions?.map((question, index) => (
        <div key={index} className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{question.questionText}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p>{question.hint}</p>
            </CardContent>
            <Separator className="my-1" orientation="horizontal" />
            <CardFooter className="pb-3 pt-1 flex  justify-evenly">
              <div className="flex h-5 space-x-4 text-sm">
                <div
                  className="flex align-middle"
                  onClick={() => {
                    setDeleteAlert(true);
                    setDeleteId(question.id);
                  }}
                >
                  <IoTrashOutline size="1.5em" />
                </div>
                <Separator orientation="vertical" />
                <div
                  className="flex align-middle"
                  onClick={() => {
                    handleQr(question.id);
                  }}
                >
                  <IoQrCodeOutline size="1.5em" />
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
      <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete this question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
