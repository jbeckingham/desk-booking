import {Container, List} from "semantic-ui-react"
import {sortBy, prop, reverse} from "ramda"
import HistoryRow from "./HistoryRow"

const History = ({bookings}) => {
  const orderedBookings = reverse(sortBy(prop("lastUpdated"), bookings))
  return (
    <>
      <Container>
        <List>
          {orderedBookings.map(booking => (
            <List.Item>
              <HistoryRow booking={booking} />
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  )
}

export default History
