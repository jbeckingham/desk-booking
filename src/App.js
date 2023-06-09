import "./App.css"
import "semantic-ui-css/semantic.min.css"
import moment from "moment"

import {initializeApp} from "firebase/app"
import {Menu, Header} from "semantic-ui-react"
import Readme from "./readme"
import History from "./history"
import Book from "./book"
import {range, map} from "ramda"

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

  const start = moment().startOf("week").add(1, "days")
  const queryStart = start.clone().toDate()
  const end = moment().add(10, "weeks").endOf("week")

  const daysArray = range(0, end.diff(start, "days"))
  const days = map(
    day => ({
      date: start.add(1, "days").format("DD/MM/YY"),
    }),
    daysArray
  )

  const q = query(
    collection(db, "desks"),
    where("date", ">=", Timestamp.fromDate(queryStart))
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
    </div>
  )
}

export default App
