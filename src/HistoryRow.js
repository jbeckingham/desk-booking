import moment from "moment"

const HistoryRow = ({booking}) => {
  const dateString = moment(booking.date.toDate()).format("LL")
  const lastUpdatedString = moment(booking.lastUpdated.toDate()).format("LLLL")

  return (
    <p>
      <strong>{lastUpdatedString}: </strong>
      {booking.author} booked desk {booking.desk} for {booking.name} on{" "}
      {dateString}
    </p>
  )
}

export default HistoryRow
