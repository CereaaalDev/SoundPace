import styled from "styled-components";
import { COLORS } from "../../util/Colors";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  gap: 1rem;
  padding: 1rem 2rem;

  &:hover {
    background-color: #ededed;
  }
`;
const IndexContainer = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: center;
  min-width: 4rem;
`;

const ImageContainer = styled.div`
  img {
    width: 50px;
    height: auto;
    margin: auto;
    display: block;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
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
`;

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
    </ItemContainer>
  );
}
