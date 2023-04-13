import axios from "axios";
async function getLawyersData(){
    const response = await axios.get("https://lawbud-backend.onrender.com/user/getAllUsers");
    // console.log(response.data);
    return response.data;
}
async function getLawyersCategories(){
    const response = await axios.get("https://lawbud-backend.onrender.com/specialisation/getAllSpecialisations");
    console.log(response.data);
    return response.data;
}
export { getLawyersData, getLawyersCategories };