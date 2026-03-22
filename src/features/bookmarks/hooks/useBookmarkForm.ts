import { useState } from "react";

export const useBookmarkForm = () => {
  const [form, setForm] = useState({
    url: "",
    title: "",
    notes: "",
    tags: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ url: "", title: "", notes: "", tags: "" });
  };

  return { form, setForm, handleChange, resetForm };
};
