import CreateNoteForm from "../components/CreateNoteForm";

const CreateNotePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-md mx-auto bg-white py-8 px-10 shadow-xl border border-gray-100 rounded-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Add note</h1>
          <p className="text-sm text-gray-600">Fill form below add note</p>
        </div>
        <CreateNoteForm />
      </div>
    </div>
  );
};

export default CreateNotePage;
