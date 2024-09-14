/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../sharedComponents/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useDeleteSingleProductMutation } from "../../redux/api/baseApi";

const ProductManagement = () => {

    const products = useAppSelector(state=>state.products.data)

    const [deleteSingleProduct] = useDeleteSingleProductMutation()
    // Confirm Deletion
    const confirmDelete = (id: string) => {
      Swal.fire({
        title: "Are you sure ?",
        text: "You won't be delete Product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result:any) => {
        if (result.isConfirmed) {
            const res = await deleteSingleProduct(id)
            console.log(res);
            
            if(res.data?.success){
              toast.success(res?.data.message)
            }
        }
      });
    };

    if (!products) {
      return <Loading />
    }

    return (
        <div className="overflow-x-auto">
        {/* Create New Product Button */}
      <Link to="/create-product" className="btn bg-green-500 mt-4 ml-4 text-white">
        Create New Product
      </Link>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products!.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.img} alt={product.name} className="w-20 h-20 object-cover" />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <div className="flex space-x-2">
                  {/* Edit Button */}
                  <Link to={`/update-product/${product._id}`} className="btn text-white bg-green-400 btn-sm">
                    Update
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() => confirmDelete(product._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
    );
};

export default ProductManagement;