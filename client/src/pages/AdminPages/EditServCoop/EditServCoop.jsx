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
  const [datesForm, setdatesForm] = useState(initialValues);
  const [valErrors, setValErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState();
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServCoop = async() => {
  try {
      //LLamada para mostrar los datos del back de un servicio especifico      
      const res = await fetchData(`/services/editservcoop/${id}`, "get" , null , token);
      console.log(res);
      setdatesForm(res.data.result?.[0]);
      
    } catch (error) {
      console.log(error);
    }
  }
  fetchServCoop();
  }, []);

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
      const { valid, errors } = validateForms(createCoopSchema, datesForm);
      setValErrors(errors);
      if (valid) {
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(datesForm));
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
        let res = await fetchData(`/services/editservcoop/${id}/${datesForm.image}`,"put",newFormData,token);
        console.log(res);
        
        navigate("/servicesCoop");
      }
    } catch (error) {
      console.log(error);
      
      setValErrors({});
    }
  };
  return (
    <FormEditServCoop
    handleChange={handleChange}
      onSubmit={onSubmit}
      datesForm={datesForm}
      handleFile={handleFile}
      fileError={fileError}
      valErrors={valErrors}
      cancel={cancel}
    />


    
  )
}
export default EditServCoop ;
