import styled from "styled-components";
import { FeautureCard } from "../../components/feautureCard";
import { COLORS } from "../../util/Colors";
import AnalyzeIcon from "../../assets/icons/analyze.svg"
import TiltShape from "../../assets/icons/tilt.svg"
import LupeIcon from "../../assets/icons/lupe.svg"
import NewIcon from "../../assets/icons/new.svg"

const SectionContainer = styled.div`
  width: 100vw;
  background-color: ${COLORS["bg-white"]};
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1500px;
  flex: 1;
  gap: 1rem;
`;

const Divider = styled.div`
  min-width: 100vw;
  transform: rotate(180deg);
  img{
    width: 100%;
  }
`;

export function InfoCards() {
  return (
    <>
      <Divider>
        <img src={TiltShape}/>
      </Divider>
      <SectionContainer>
        <InfoCardsContainer>
          <FeautureCard
            icon={AnalyzeIcon}
            title="Analysiere deine Musik"
            description="Lass deine Songs analyiseren und entdecke neue Eigenschaften deiner Lieblingsongs"
          />
          <FeautureCard
            icon={LupeIcon}
            title="Entdecke neue Kobinationen"
            description="Filtere und kombiniere deine Songs nach Geschwindigkeit, Tanzbarkeit und vielem mehr."
          />
          <FeautureCard
            icon={NewIcon}
            title="Kreiere neue Playlists"
            description="Kombiniere deine Musik auf ganz andere Art und Weise"
          />
        </InfoCardsContainer>
      </SectionContainer>
    </>
  );
}
