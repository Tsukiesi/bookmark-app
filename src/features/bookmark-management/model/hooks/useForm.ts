import { useState } from "react";
const useForm = () => {
  const [form, setForm] = useState({
    url: "",
    title: "",
    notes: "",
    tags: [] as string[],
  });
  const [newTagValue, setNewTagValue] = useState<string>("");
  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addNewTag = () => {
    if (newTagValue.trim()) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTagValue.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, "")],
      }));
      setNewTagValue("");
    }
  };

  const handleTagsChange = (value: string) => {
    setNewTagValue(value);
  };

  const resetTagInput = () => {
    setNewTagValue("");
  };

  const resetForm = () => {
    setForm({ url: "", title: "", notes: "", tags: [] });
    resetTagInput();
  };
  return {
    form,
    setForm,
    handleChange,
    handleTagsChange,
    resetTagInput,
    resetForm,
    newTagValue,
    addNewTag,
  };
};

export default useForm;
