import SoundPaceLogo from '../../assets/SoundPace_logo.svg'
import styled from 'styled-components'

const LogoContainer = styled.div`

`
const LogoImage = styled.img`

`


export function Logo(props) {
    return <LogoContainer width='10px'>
        <LogoImage width={props.width ? props.width : '150px'} src={SoundPaceLogo} alt='Sound Pace Logo'/>
    </LogoContainer>
}