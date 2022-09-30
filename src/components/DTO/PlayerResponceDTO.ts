import UserResponceDTO from "./UserResponceDTO";

export  type PlayerResponceDTO = UserResponceDTO & {
       name : String
       surname : String
       nationalIDNumber : String
       email : String
       phoneNumber : String
       WinCoefficient : number
       balance : number
}
export default PlayerResponceDTO