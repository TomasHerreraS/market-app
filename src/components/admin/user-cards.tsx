import { Card, Stack } from "react-bootstrap";
import { Users } from "../../utils/type";
import '../../styles/user-cards.css';

interface UsersCardsProps {
users: Users
}

const UserCards = ({ users }: UsersCardsProps) => {

  return (
    <Card className="user-cards">
      <Card.Title className="user-name">{users.firstname} {users.lastname}</Card.Title>
      <Stack className="justify-content-between">
      <div>
        <p className="user-info">Role:<span style={{fontWeight: "300"}}>{users.rol_id === 1 ? "Admin" : "Client"}</span></p>
        <p className="user-info">Phone:<span style={{fontWeight: "300"}}>{users.phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}</span></p>
        <p className="user-info">E-mail:<span style={{fontWeight: "300"}}>{users.email}</span></p>
        <p className="user-info">Address:<span style={{fontWeight: "300"}}>{users.address}</span></p>
      </div>
        <p className="user-info">Date:<span style={{fontWeight: "300"}}>{users.date.toDateString().slice(0,10)}, {users.date.toLocaleTimeString()}</span></p>
      </Stack>
    </Card>
  );
};

export default UserCards;
