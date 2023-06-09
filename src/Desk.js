import moment from "moment"
import {Container, Grid, Image} from "semantic-ui-react"
const Desk = ({bookings, number}) => {
  const person = bookings.find(booking => booking.desk == number)
  const slackData = [
    {
      image: "https://i.ebayimg.com/images/g/7fAAAOSwe-NgXQsy/s-l1600.jpg",
      name: "Jen Beckingham",
    },
    {image: "", name: "Vicki Edwards"},
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
      name: "Hannah",
    },
  ]
  const userProfile = person
    ? slackData.find(row => row.name === person.name)
    : null
  return (
    <>
      {person ? (
        <>
          {userProfile?.image ? <Image src={userProfile.image} avatar /> : null}
          {person.name}
        </>
      ) : null}
    </>
  )
}

export default Desk
