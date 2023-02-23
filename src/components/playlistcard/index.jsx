import styled from "styled-components";
import { COLORS } from "/src/util/Colors";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  padding: 1rem;
  background-color: ${props => props.selected ?  'rgba(29,185,84,0.22)': ""};
  transition: all ease 0.2s;

  h6 {
    margin-bottom: 0;
  }

  img{
    max-width: 80%;
    object-fit: contain;
  }

  :hover {
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`;

const Title = styled.h6`
  font-size: 15px;
  margin-bottom: 0;
  line-height: 19px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

  //Text auf 3 Zeilen beschränken
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tracks = styled.h6`
  color: ${COLORS["text-light"]};
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 20px;
`;

export function PlaylistCard(props) {
  return (
    <CardContainer selected={props.selected} onClick={props.onClick}>
      <LazyLoadImage
        src={props.imgSrc}
      />
      <Title>{props.title}</Title>
      <Tracks>{props.trackcount} {props.trackcount == 1 ? "Track":"Tracks"} </Tracks>
    </CardContainer>
  );
}
