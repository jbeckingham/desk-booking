import "./App.css"
import "semantic-ui-css/semantic.min.css"
import moment from "moment"

import {initializeApp} from "firebase/app"
import {Menu} from "semantic-ui-react"
import Readme from "./Readme"
import History from "./History"
import Book from "./Book"
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
  setDoc,
} from "firebase/firestore"

import {useState, useEffect} from "react"
import config from "./config"

const app = initializeApp(config.FIREBASE_CONFIGURATION)

const db = getFirestore(app)

const App = ({user}) => {
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState("book")

  // todo: add where clause for date to only get relevant desk data
  const q = query(collection(db, "desks"))

  useEffect(() => {
    onSnapshot(q, querySnapshot => {
      const bookingsData = []
      querySnapshot.forEach(doc => {
        bookingsData.push({...doc.data(), id: doc.id})
      })
      setBookings(bookingsData)
    })
  }, [])

  const setBooking = async data => {
    const match = bookings.find(
      booking => data.date === booking.date && data.desk === booking.desk
    )
    const lastUpdatedString = moment(new Date()).format("LLLL")

    if (match) {
      await setDoc(doc(db, "desks", match.id), {
        name: data[data.desk],
        date: data.date,
        desk: data.desk,
        author: user.name,
        lastUpdated: lastUpdatedString,
      })
    } else {
      await addDoc(collection(db, "desks"), {
        name: data[data.desk],
        date: data.date,
        desk: data.desk,
        author: user.name,
        lastUpdated: lastUpdatedString,
      })
    }
  }

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
      {activeTab === "history" ? <History bookings={bookings} /> : null}
      {activeTab === "book" ? (
        <Book bookings={bookings} setBooking={setBooking} />
      ) : null}
    </div>
  )
}

export default App
