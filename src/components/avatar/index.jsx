import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  
img {
  height: auto;
  min-width: 100px;
  min-height: 100px;
}


`;


export function Avatar(props){
    return(
        <AvatarContainer>
            <img src={props.imgSrc} ></img>
        </AvatarContainer>

    )
};