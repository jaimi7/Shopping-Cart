import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const swal = Swal.mixin({
  confirmButtonColor: '#c2400c',
  showCancelButton: true,
  allowOutsideClick: false,
})

// Export the configured instance
export default swal
