import { useState } from "react";
import { FormServCoop } from "../../../components/FormServCoop/FormServCoop";
import { useNavigate } from "react-router";
import { validateForms } from "../../../helpers/validateForms";
import { fetchData } from "../../../helpers/axiosHelper";
import { createCoopSchema } from "../../../schemas/createCoopSchema";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";

const initialValues = {
  service_name: "",
  service_description: "",
  image: "",
};

export const CreateServCoop = () => {
  const [datesForm, setdatesForm] = useState(initialValues);
  const [valErrors, setValErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdatesForm({ ...datesForm, [name]: value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate("/admin/servCoop")
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //Comprobación de que los datos metidos se cumplan
      const { valid, errors } = validateForms(createCoopSchema, datesForm);
      setValErrors(errors);
      if (valid) {
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(datesForm));
        if (file) {
          if (file.name.length > 200) {
            setFileError("Los caracteres que admiten la imagen son 200 caracteres");
            return;
          } else {
            newFormData.append("file", file);
          }
        }
        //LLamada al back para la creación de un servicio
        let res = await fetchData("/services/createservicecoop","post",newFormData,token);        
        navigate("/servicesCoop");
      }
    } catch (error) {
      console.log(error);
      setValErrors({});
    }
  };

  return (
    <FormServCoop
      handleChange={handleChange}
      onSubmit={onSubmit}
      datesForm={datesForm}
      handleFile={handleFile}
      fileError={fileError}
      valErrors={valErrors}
      cancel={cancel}
    />
  );
};

export default CreateServCoop;
