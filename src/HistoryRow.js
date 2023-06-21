const HistoryRow = ({booking}) => {
  return (
    <p>
      <strong>{booking.lastUpdated}: </strong>
      {booking.author} booked desk {booking.desk} for {booking.name} on{" "}
      {booking.date}
    </p>
  )
}

export default HistoryRow
