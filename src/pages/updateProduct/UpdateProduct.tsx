import { useState } from "react";
import { useParams } from "react-router-dom";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductQuery, useUpdateSingleProductMutation } from "../../redux/api/baseApi";
import Loading from "../../sharedComponents/Loading";
import { toast } from "sonner";
import Swal from "sweetalert2";

type TProduct = {
    category?: string;
    description?: string;
    img?: string;
    name?: string;
    price?: number;
    ratings?: number;
    stockQuantity?: number;
    _id?: string;
  };

const UpdateProduct = () => {
    const {id} = useParams()
    const [formValues, setFormValues] = useState<TProduct | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {data, isLoading} = useGetProductQuery(id)
    const [updateProduct] = useUpdateSingleProductMutation()

    
    if (isLoading) {
        return <Loading />
    }  
  
    const handleInputChange = (
      e:any
    ) => {
      
      const { name, value } = e.target;
      // Convert price, ratings, and stockQuantity to number
      setFormValues({
        ...formValues,
        [name]: name === 'price' || name === 'ratings' || name === 'stockQuantity' ? Number(value) : value,
      });
      console.log(formValues);
    };
    
    const handleSubmit = async (e: any) => { 
      e.preventDefault();
   
      if (!formValues) {
        return toast.error('you can not update any product')
      }
        try {
            Swal.fire({
                title: "Are you sure ?",
                text: "You won't be Update Product",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
              }).then(async(result:any) => {
                if (result.isConfirmed) {
                    const res = await updateProduct({id, ...formValues})
                    if(res.data?.success){
                      toast.success(res?.data.message)
                    }
                    setFormValues({});
                }
              });
         
        } catch (error) {
          toast.error('product create failed  ')
          console.error('Error creating product:', error);
        } finally {
          setIsSubmitting(false);
        }
    //   }
    };
  

    return (
        <div className="container mx-auto p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Update A Product</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data.data.name}
              onChange={handleInputChange}
              className={`input input-bordered w-full `}
            />
            
          </div>
  
          {/* Description */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={data.data.description}
              onChange={handleInputChange}
              className={`textarea textarea-bordered w-full `}
            />
          </div>
  
          {/* Price */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={data.data.price}
              onChange={handleInputChange}
              className={`input input-bordered w-full `}
            />
          </div>
  
          {/* Stock Quantity */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Stock Quantity</span>
            </label>
            <input
              type="number"
              name="stockQuantity"
              defaultValue={data.data.stockQuantity}
              onChange={handleInputChange}
              className={`input input-bordered w-full`}
            />
          </div>
  
          {/* Category */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              defaultValue={data.data.category}
              onChange={handleInputChange}
              className={`select select-bordered w-full `}
            >
              <option defaultChecked={data.data.category}>{data.data.category}</option>
              <option value="Hiking">Hiking</option>
              <option value="Safety">Safety</option>
              <option value="Camping Gear">Camping Gear</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Backpacks & Storage">Backpacks & Storage</option>
              <option value="Lighting & Power">Lighting & Power</option>
              <option value="Cooking & Food Supplies">Cooking & Food Supplies</option>
              <option value="Tents & Shelters">Tents & Shelters</option>
  
            </select>
          </div>
  
          {/* Image URL */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="img"
              defaultValue={data.data.img}
              onChange={handleInputChange}
              className={`input input-bordered w-full `}
            />
          </div>
  
          {/* Ratings */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Ratings</span>
            </label>
             <input
              type="number"
              name="ratings"
              step="0.1"
              min="1" 
              max="5" 
              defaultValue={data.data.ratings}
              onChange={handleInputChange}
              className={`input input-bordered w-full`}
            />
          </div>
            
             <button type="submit" className={`btn hover:bg-green-400 bg-green-400 text-white `}>
            {isSubmitting ? 'Submitting...' : 'Create Product'}
          </button> 
          
        </form>
      </div>
    );
};

export default UpdateProduct;