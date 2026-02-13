import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createNoteSchema, type CretaNoteValues } from "../lib/zod";
import { createNote } from "../lib/data";

const CreateNoteForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CretaNoteValues>({
    resolver: zodResolver(createNoteSchema),
  });

  const onSubmit = async (values: CretaNoteValues) => {
    try {
      await createNote({ title: values.title, body: values.body });
      navigate("/");
    } catch {
      alert("Create note failed");
    }
  };

  const inputStyle = `appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <div className="mt-1">
          <input
            {...register("title")}
            className={`${inputStyle} ${
              errors.title ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Title"
          />
        </div>
        {errors.title && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <div className="mt-1">
          <textarea
            {...register("body")}
            className={`${inputStyle} ${
              errors.body ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Type your note here"
          />
        </div>
        {errors.body && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.body.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {isSubmitting ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateNoteForm;
