import { DeleteButton, EditButton, VisualizeButton } from "../../components/buttons/table-button";

export const headProductData = () => {
    const header = ["Name", "Release date", "Quantity", "Description", "Category", "Brand", "Discount", "Price", "Images", "Edit", "Delete"]
    return header.map((obj: any, index: number) => (
      <th key={index} className='text-center'>{obj}</th>
    ))
  }

export const bodyProductData = (data: any) => {
  return data.map((obj: any, index: number) => {
    const formattedDate = obj.release_date.split('T')[0];
    return <tr key={index} className='text-center'>
      <td>{obj.name}</td>
      <td>{formattedDate}</td>
      <td>{obj.quantity}</td>
      <td>{obj.description}</td>
      <td>{obj.category}</td>
      <td>{obj.brand}</td>
      <td>{obj.discount}</td>
      <td>{obj.price}</td>
      <td><VisualizeButton/></td>
      <td><EditButton/></td>
      <td><DeleteButton/></td>
    </tr>
  });
}

// Hacer esto para user y tambien record