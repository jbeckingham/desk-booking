import moment from "moment"
import {Container, Grid} from "semantic-ui-react"
import Desk from "./Desk"
const DeskModel = ({bookings}) => {
  const selectedDate = "09/06/23"

  const bookingsForDate = bookings.filter(booking => {
    return moment(booking.date.toDate()).format("DD/MM/YY") === selectedDate
  })
  return (
    <Grid celled verticalAlign>
      <Grid.Row>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="1" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="2" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="3" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="4" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="5" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="6" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="7" />
        </Grid.Column>
        <Grid.Column width={4}>
          <Desk bookings={bookingsForDate} number="8" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default DeskModel
