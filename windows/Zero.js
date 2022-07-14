import Bigtitle from "../components/Bigtitle"
import Container from "../components/Container"

function zero() {
  return (
    <Container>
        <div className="h-full flex justify-between gap-10 items-center">
            <div className="bg-black text-white w-full h-full
             flex justify-center items-center text-3xl text-center">FACCIA 3D<br />{':)'}</div>
            <div>
                <Bigtitle title={'HI!'} />
                <Bigtitle title={'I AM'} />
                <Bigtitle title={'ANDREA'} />
            </div>
        </div>
    </Container>
  )
}

export default zero