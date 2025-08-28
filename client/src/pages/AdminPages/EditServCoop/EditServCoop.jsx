import React, { useContext, useEffect, useState } from 'react'
import { FormEditServCoop } from "../../../components/FormEditServCoop/FormEditServCoop";
import { fetchData } from '../../../helpers/axiosHelper';
import { createCoopSchema } from '../../../schemas/createCoopSchema';
import { validateForms } from '../../../helpers/validateForms';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';

const initialValues = {
  service_name: "",
  service_description: "",
  image: "",
};

export const EditServCoop = () => {
    const [datosForm, setDatosForm] = useState(initialValues);
  const [valErrors, setValErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServCoop = async() => {
  try {      
      const res = await fetchData(`/services/editservcoop/${id}`, "get" , null , token);
      console.log(res);
      setDatosForm(res.data.result?.[0]);
      
    } catch (error) {
      console.log(error);
    }
  }
  fetchServCoop();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosForm({ ...datosForm, [name]: value });
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
      const { valid, errors } = validateForms(createCoopSchema, datosForm);
      setValErrors(errors);
      if (valid) {
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(datosForm));
        if (file) {
          if (file.name.length > 200) {
            setFileError(
              "Los caracteres que admiten la imagen son 200 caracteres"
            );
            return;
          } else {
            newFormData.append("file", file);
          }
        }
        let res = await fetchData("/services/editservicecoop","put",newFormData,token);
        navigate("/servicesCoop");
      }
    } catch (error) {
      setValErrors({});
    }
  };
  return (
    <FormEditServCoop
    handleChange={handleChange}
      onSubmit={onSubmit}
      datosForm={datosForm}
      handleFile={handleFile}
      fileError={fileError}
      valErrors={valErrors}
      cancel={cancel}
    />


    
  )
}
export default EditServCoop ;
