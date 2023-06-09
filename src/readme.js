import {Container, List} from "semantic-ui-react"

const Readme = () => (
  <>
    <Container>
      <List>
        <List.Item>
          Please use this sheet to book yourself a desk in the Runway East
          shared office. This is not optional as we cannot have more people in
          the shared desk space than we have desks so as not to disturb others
          who are working there.
        </List.Item>
        <List.Item>
          Book your desk by entering your name against your chosen desk on a
          particular date. Please don't just over-type someone's booking - if
          someone else has already booked it, book a different desk or see if
          they will swap.
        </List.Item>
        <List.Item>
          If you're only booking a desk for part of a day, add this in brackets
          afterwards. If there are lots of part-day bookings, we can add a
          morning and an afternoon option, but I don't want to over-complicate
          things. If times aren't specified, assume it's all day.
        </List.Item>
        <List.Item>
          Office address:{" "}
          <strong>
            <br />
            Runway East Temple Meads
            <br /> 101 Victoria St <br />
            Redcliffe <br />
            Bristol
            <br /> BS1 6PU
            <br />
          </strong>
        </List.Item>
      </List>
    </Container>
  </>
)

export default Readme
