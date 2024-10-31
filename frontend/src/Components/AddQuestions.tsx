// Import necessary Firebase modules
import { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddQuestions() {
  const [customId, setCustomid] = useState("");
  const [questionTxt, setQuestion] = useState("");
  const [hint, setHint] = useState("");
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const options = [
    { value: "easy", label: "Easy 😎" },
    { value: "medium", label: "Medium 😬" },
    { value: "hard", label: "HARD 🔥" },
  ];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      questions: [
        {
          customId: customId.trim(),
          hint: hint.trim(),
          questionText: questionTxt.trim(),
          difficulty: difficulty,
        },
      ],
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios.defaults.withCredentials = true;

    axios
      .post("/api/admin/questions/add", data, config)
      .then((response) => {
        //    reset form for new values
        setCustomid("");
        setDifficulty("");
        setHint("");
        setQuestion("");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Drawer open={drawerOpen} onOpenChange={setOpenDrawer}>
        <DrawerTrigger>Add Challange</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Append Question Here</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="items-center p-8 pt-0">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Id</Label>
              <Input
                required={true}
                type="text"
                value={customId}
                onChange={(e) => setCustomid(e.target.value)}
              />
            </div>
            <br />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Challange Text</Label>
              <Input
                required={true}
                type="text"
                value={questionTxt}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <br />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Hint</Label>
              <Input
                required={true}
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
              />
            </div>
            <br />
            <Select required={true} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DrawerFooter>
              <Button type="submit" variant="outline">
                Append 💥
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
