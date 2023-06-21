import moment from "moment"
import {Container} from "semantic-ui-react"
import DeskModel from "./DeskModel"
import {useState, useEffect} from "react"
import {range, map} from "ramda"
import {AgGridReact} from "ag-grid-react"
import axios from "axios"

const Book = ({bookings, setBooking}) => {
  const today = moment().format("DD/MM/YY")

  const [activeDate, setActiveDate] = useState(today)
  const [slackUsers, setSlackUsers] = useState([])

  const start = moment().startOf("week").add(0, "days")

  const end = moment().add(10, "weeks").endOf("week")

  const daysArray = range(0, end.diff(start, "days"))

  const defaultColDef = {
    editable: true,
    width: "100px",
  }

  const getSlackUsers = async () => {
    const result = await axios
      .get("http://localhost:3001/moneyhub-users")
      .then(response => response.data)

    return setSlackUsers(result)
  }

  useEffect(() => {
    getSlackUsers()
  }, [])

  const gridOptions = {
    columnDefs: [
      {headerName: "Day", field: "day", editable: false},
      {headerName: "Date", field: "date", editable: false, width: "110px"},
      {headerName: "Desk 1", field: "1"},
      {headerName: "Desk 2", field: "2"},
      {headerName: "Desk 3", field: "3"},
      {headerName: "Desk 4", field: "4"},
      {headerName: "Desk 5", field: "5"},
      {headerName: "Desk 6", field: "6"},
      {headerName: "Desk 7", field: "7"},
      {headerName: "Desk 8", field: "8"},
    ],
    onCellValueChanged: function (params) {
      setBooking({...params.data, desk: params.column.colId})
    },
    onRowClicked: function (params) {
      setActiveDate(params.data.date)
    },
  }

  const days = map(day => {
    const currentDay = start.add(1, "days").format("DD/MM/YY")
    return {
      date: currentDay,
      day: start.add(0, "days").format("dddd").substring(0, 3),
      1:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 1
        )?.name ?? "",
      2:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 2
        )?.name ?? "",
      3:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 3
        )?.name ?? "",
      4:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 4
        )?.name ?? "",
      5:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 5
        )?.name ?? "",
      6:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 6
        )?.name ?? "",
      7:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 7
        )?.name ?? "",
      8:
        bookings.find(
          booking => booking.date == currentDay && booking.desk == 8
        )?.name ?? "",
    }
  }, daysArray)

  return (
    <Container>
      <DeskModel
        bookings={bookings}
        activeDate={activeDate}
        slackUsers={slackUsers}
      />

      <div
        className="ag-theme-alpine"
        style={{
          height: "1000px",
        }}
      >
        <AgGridReact
          {...gridOptions}
          rowData={days}
          defaultColDef={defaultColDef}
        />
      </div>
    </Container>
  )
}

export default Book
