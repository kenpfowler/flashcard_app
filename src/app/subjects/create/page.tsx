import { CreateSubjectForm } from "./CreateSubjectFrom";

const CreateSubjectsPage = () => {
  return (
    <div className="flex flex-col space-y-2 justify-center">
      <h1>Create a Subject</h1>
      <CreateSubjectForm />
    </div>
  );
};

export default CreateSubjectsPage;
