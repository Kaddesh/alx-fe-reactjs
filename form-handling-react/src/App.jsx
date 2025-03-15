import FormikForm from "./components/FormikForm";
import RegistrationForm from "./components/RegistrationForm";


function App() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Controlled Components Form</h2>
      <RegistrationForm />

      <h2 className="text-xl font-bold mt-10 mb-4">Formik Form</h2>
      <FormikForm />
    </div>
  );
}

export default App;
