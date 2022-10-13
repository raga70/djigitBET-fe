import {styled} from "@mui/system";
import {NavLink} from "react-router-dom";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;

  
  &:focus,  &:visited, &:link, &:active {
    text-decoration: none;
  }

  &:hover{
    
  
  }
  
  
  
`;
export default StyledLink;