import NominantCard from "./Card"
import { Grid } from "@mui/material"
import { Container } from "@mui/material"
const Cards = ({proposals,activeNominant}) => {
    console.log("ppp" , proposals)
    return(
        <Container>
            <Grid container spacing={{xs:2, md:3}} alignItems="center" >
                {proposals.map((proposal) => {
                    return(
                        <NominantCard key={[proposal.nominantAddress]} image={proposal.image} name={proposal.name} address={proposal.nominantAddress} activeNominant={activeNominant}/>
                    )
                
                })}
            </Grid>  
        </Container>
        
    )
}
export default Cards