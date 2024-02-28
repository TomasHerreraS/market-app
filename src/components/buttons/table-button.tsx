import { Button } from "react-bootstrap"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { FiTrash } from "react-icons/fi";
import '../../styles/table-buttons.css';

export const VisualizeButton = () => {
  return <Button className="visualize">
    <MdOutlineRemoveRedEye />
  </Button>
}

export const EditButton = () => {
  return <Button className="edit">
    <HiOutlinePencil />
  </Button>
}

export const DeleteButton = () => {
  return <Button className="delete">
    <FiTrash />
  </Button>
}