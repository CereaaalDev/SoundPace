import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  background-image: url(${props => props.imgURL});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 3px solid white;
`;


export function Avatar(props){
    return(
        <AvatarContainer imgURL={props.imgSrc}/>
    )
};