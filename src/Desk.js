import {Image} from "semantic-ui-react"
import {path} from "ramda"
const Desk = ({bookings, number, slackUsers}) => {
  const person = bookings.find(booking => booking.desk == number)

  const userProfile = person
    ? slackUsers.find(
        slackUser =>
          path(["profile", "display_name"], slackUser) === person.name
      )
    : null

  const imageUrl = userProfile
    ? path(["profile", "image_1024"], userProfile)
    : null
  return (
    <>
      {person ? (
        <>
          {imageUrl ? <Image src={imageUrl} avatar /> : null}
          {person.name}
        </>
      ) : null}
    </>
  )
}

export default Desk
