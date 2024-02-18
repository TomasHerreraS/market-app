import { Card, Placeholder } from "react-bootstrap";
import "../../styles/user-cards.css";

const UserSkeletons = () => {
  return (
    <Card className="user-cards">
        <Placeholder as={Card.Title} xs={12} animation="wave">
            <Placeholder xs={5}/>
        </Placeholder>
        <Placeholder as={Card.Text} xs={12} animation="wave">
            <Placeholder xs={2}/><Placeholder xs={5}/>
            <Placeholder xs={2}/> <Placeholder xs={6} />
            <Placeholder xs={2}/> <Placeholder xs={4} />
            <Placeholder xs={2}/> <Placeholder xs={3} />
        </Placeholder>
    </Card>
  )
}

export default UserSkeletons