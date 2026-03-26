import { useState } from "react";
const useForm = () => {
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
  return {
    form,
    setForm,
    handleChange,
    resetForm,
  };
};

export default useForm;
