import Swal from 'sweetalert2';


export const notification = (icon: 'success' | 'error', title: string, text?: string) => {
  return Swal.fire({
    icon,
    title,
    text
  })
}