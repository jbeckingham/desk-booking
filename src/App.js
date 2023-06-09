import "./App.css"
import "semantic-ui-css/semantic.min.css"
import moment from "moment"

import {initializeApp} from "firebase/app"
import {Menu, Header} from "semantic-ui-react"
import Readme from "./Readme"
import History from "./History"
import Book from "./book"
import {range, map} from "ramda"
import {AgGridReact} from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  getFirestore,
  Timestamp,
} from "firebase/firestore"

import {useState, useEffect} from "react"
import config from "./config"

const app = initializeApp(config.FIREBASE_CONFIGURATION)

const db = getFirestore(app)

const App = () => {
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState("book")

  const start = moment().startOf("week").add(0, "days")

  const queryStart = start.clone().toDate()
  const end = moment().add(10, "weeks").endOf("week")

  const daysArray = range(0, end.diff(start, "days"))

  const days = map(
    day => ({
      date: start.add(1, "days").format("DD/MM/YY"),
      day: start.add(0, "days").format("dddd").substring(0, 3),
    }),
    daysArray
  )

  const q = query(
    collection(db, "desks")
    // where("date", ">=", Timestamp.fromDate(queryStart))
  )

  useEffect(() => {
    onSnapshot(q, querySnapshot => {
      const bookingsData = []
      querySnapshot.forEach(doc => {
        bookingsData.push(doc.data())
      })
      console.log("bookingsData", bookingsData)
      setBookings(bookingsData)
    })
  }, [])

  const setBooking = async () => {
    const result = await addDoc(collection(db, "bookings"), {
      date: "110623",
      desk: "4",
      bookings: [{author: "Jen", name: "Hannah", timestamp: Date.now()}],
    })
  }

  const gridOptions = {
    columnDefs: [
      {headerName: "Day", field: "day"},
      {headerName: "Date", field: "date"},
      {headerName: "Desk1", field: "desk1"},
      {headerName: "Desk2", field: "desk2"},
      {headerName: "Desk3", field: "desk3"},
      {headerName: "Desk4", field: "desk4"},
      {headerName: "Desk5", field: "desk5"},
      {headerName: "Desk5", field: "desk5"},
      {headerName: "Desk6", field: "desk6"},
      {headerName: "Desk7", field: "desk7"},
      {headerName: "Desk8", field: "desk8"},
    ],
    onCellValueChanged: function (params) {
      console.log("cellValueChanged", params)
    },
  }

  const handleChange = e => {
    console.log("event", e)
  }

  const defaultColDef = {
    editable: true,
    width: "120px",
  }

  //setBooking()

  return (
    <div className="App">
      <Menu inverted className="tealBackground">
        <Menu.Item
          name="book"
          active={activeTab === "book"}
          onClick={() => setActiveTab("book")}
        />
        <Menu.Item
          name="readme"
          active={activeTab === "readme"}
          onClick={() => setActiveTab("readme")}
        />
        <Menu.Item
          name="history"
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
      </Menu>
      {activeTab === "readme" ? <Readme /> : null}
      {activeTab === "history" ? <History /> : null}
      {activeTab === "book" ? <Book days={days} /> : null}
      <div
        className="ag-theme-alpine"
        style={{
          height: "1000px",
        }}
      >
        <AgGridReact
          {...gridOptions}
          rowEditingStarted={handleChange}
          rowData={days}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  )
}

export default App
