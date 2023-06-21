import moment from "moment"
import {Container, Grid, Header} from "semantic-ui-react"
import Desk from "./Desk"
const DeskModel = ({bookings, activeDate, slackUsers}) => {
  const selectedDate = activeDate
  const dateString = moment(activeDate, "DD/MM/YY").format("LL")

  const bookingsForDate = bookings.filter(booking => {
    return booking.date == selectedDate
  })
  return (
    <Container>
      <Header>Bookings on {dateString}</Header>
      <Grid celled verticalAlign>
        <Grid.Row style={{minHeight: "55px"}}>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="1"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="2"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="3"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="4"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{minHeight: "55px"}}>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="5"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="6"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="7"
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Desk
              slackUsers={slackUsers}
              bookings={bookingsForDate}
              number="8"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default DeskModel
