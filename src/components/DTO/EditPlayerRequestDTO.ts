import {EditUserRequestDTO} from "./EditUserRequestDTO";

export type EditPlayerRequestDTO = EditUserRequestDTO & {
    name: String,
    surname: String,
    nationalIDNumber: String,
    email: String,
    phoneNumber: String
}
export default EditPlayerRequestDTO
 
   

      
   
