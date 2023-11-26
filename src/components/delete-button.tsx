import { Trash } from 'react-bootstrap-icons'
import '../styles/delete-button.css'

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const handleClick = () => {
    console.log('Delete button clicked');
    onDelete();
  };

  return (
    <Trash size={22} className='delete-button' onClick={handleClick}/>
  )
}

export default DeleteButton