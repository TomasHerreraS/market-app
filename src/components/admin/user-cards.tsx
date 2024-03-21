import { Card, Stack } from "react-bootstrap";
import { Role, Users } from "../../utils/type";
import '../../styles/user-cards.css';
import { truncateText } from "../../utils/market-functions/truncate-text";
import DeleteButton from "../buttons/delete-button";

interface UsersCardsProps {
users: Users
onDelete: any;
}

type BothProps = UsersCardsProps & Role;


const UserCards = ({ users, role, onDelete }: BothProps) => {
  
  const handleDelete = (email: string) => {
    onDelete(email);
  }
  return (
    <Card className="user-cards">
      {role !== 3 ? (
      <Stack direction="horizontal" className="justify-content-between">
      <Card.Title className="user-name">{truncateText(`${users.firstname} ${users.lastname}`, 10)}</Card.Title>
      <DeleteButton onDelete={() => handleDelete(users.email)}/>
      </Stack>
      ):
      <Card.Title className="user-name">{truncateText(`${users.firstname} ${users.lastname}`, 10)}</Card.Title>
      }
      <Stack className="justify-content-between">
      <div>
        <p className="user-info">Role:<span style={{fontWeight: "300"}}>{users.rol_id === 1 ? "Admin" : "Client"}</span></p>
        <p className="user-info">Phone:<span style={{fontWeight: "300"}}>{users.phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')}</span></p>
        <p className="user-info">Email:<span style={{fontWeight: "300"}}>{users.email}</span></p>
        <p className="user-info">Address:<span style={{fontWeight: "300"}}>{users.address}</span></p>
      </div>
        <p className="user-info">Date:<span style={{fontWeight: "300"}}>{users.date.toDateString().slice(0,10)}, {users.date.toLocaleTimeString()}</span></p>
      </Stack>
    </Card>
  );
};

export default UserCards;
