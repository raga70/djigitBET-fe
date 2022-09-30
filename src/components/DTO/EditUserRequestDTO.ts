export enum UserType  {
    PLAYER = "PLAYER" ,
    ADMIN = "ADMIN" 
}

export type EditUserRequestDTO = {
    userID : Number,
    type : UserType,
    username : String,
    password : String,
    
}

export default EditUserRequestDTO

