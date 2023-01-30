import styled from "styled-components";
import { COLORS } from "../../util/Colors";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  gap: 1rem;
  padding: 0.5rem;
  &:hover {
    background-color: #ededed;
  }
`;
const IndexContainer = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: center;
  min-width: 2rem;
  color: ${COLORS["bg-dark-grey"]};
`;

const ImageContainer = styled.div`
  img {
    //TODO: Convert img size to inline-size tag
    width:64px;
    height: auto;
    display: block;
  }

  @media (max-width: 768px){
    display: none;
  }
`;

const TitleContainer = styled.div`
  flex: 1 0 0;
  white-space: nowrap;
  overflow: hidden;
`;

const Subtitle = styled.h6`
  color: ${COLORS["text-light"]};
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 20px;
  /* font-family: "Poppins", sans-serif; */
`;
const MainTitle = styled.h6`
  font-size: 19px;
  margin-bottom: 0;
  line-height: 19px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;


const ValueContainer = styled.div`
  font-size: 14px;
`


export function ListItem(props) {
  return (
    <ItemContainer>
      <IndexContainer>
        {" "}
        <span>{props.index}</span>
      </IndexContainer>
      <ImageContainer>
        <img src={props.imgSrc}></img>
      </ImageContainer>
      <TitleContainer>
        <Subtitle>{props.subtitle}</Subtitle>
        <MainTitle>{props.title}</MainTitle>
      </TitleContainer>
      <ValueContainer>
          <span>{props.value}</span>
      </ValueContainer>
    </ItemContainer>
  );
}
