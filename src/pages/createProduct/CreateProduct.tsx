/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useProductCreateMutation } from '../../redux/api/baseApi';
import { toast } from 'sonner';

type TProduct = {
  category: string;
  description: string;
  img: string;
  name: string;
  price: number;
  ratings: number;
  stockQuantity: number;
  _id?: string;
};

type TProductValidateError = {
  category?: string;
  description?: string;
  img?: string;
  name?: string;
  price?: string;
  ratings?: string;
  stockQuantity?: string;
};

const initialProduct: TProduct = {
  category: '',
  description: '',
  img: '',
  name: '',
  price: 0,
  ratings: 0,
  stockQuantity: 0,
};

const CreateProduct = () => {
  const [formValues, setFormValues] = useState<TProduct>(initialProduct);
  const [formErrors, setFormErrors] = useState<Partial<TProductValidateError>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createProduct] = useProductCreateMutation()

  const handleInputChange = (
    e:any
  ) => {
    
    const { name, value } = e.target;

    // Convert price, ratings, and stockQuantity to number
    setFormValues({
      ...formValues,
      [name]: name === 'price' || name === 'ratings' || name === 'stockQuantity' ? Number(value) : value,
    });
  };

  const validate = (): Partial<TProductValidateError> => {
    const errors: Partial<TProductValidateError> = {};

    if (!formValues.name) errors.name = 'Product name is required';
    if (!formValues.description || formValues.description.length < 20)
      errors.description = 'Description must be at least 20 characters';
    if (formValues.price <= 0) errors.price = 'Price must be greater than 0';
    if (formValues.stockQuantity <= 0) errors.stockQuantity = 'Stock quantity must be greater than 0';
    if (!['Hiking', 'Safety', 'Camping Gear', 'Outdoor', 'Backpacks & Storage','Lighting & BiPowerOff','Cooking & Food','Tents & Shelters'].includes(formValues.category)) {
      errors.category = 'Please select a valid category';
    }
    if (!formValues.img) errors.img = 'Image URL is required';

    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        // console.log('Product created:', formValues);
        const response =await createProduct(formValues).unwrap();
        if(response.success){
          toast.success(response?.message)
        }
        setFormValues(initialProduct); // Reset form
      } catch (error) {
        toast.error('product create failed  ')
        console.error('Error creating product:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formValues?.name}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${formErrors?.name ? 'border-red-500' : ''}`}
          />
          {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors?.name}</p>}
        </div>

        {/* Description */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formValues?.description}
            onChange={handleInputChange}
            className={`textarea textarea-bordered w-full ${formErrors.description ? 'border-red-500' : ''}`}
          />
          {formErrors.description && <p className="text-red-500 text-xs italic">{formErrors.description}</p>}
        </div>

        {/* Price */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            value={formValues?.price}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${formErrors.price ? 'border-red-500' : ''}`}
          />
          {formErrors.price && <p className="text-red-500 text-xs italic">{formErrors.price}</p>}
        </div>

        {/* Stock Quantity */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Stock Quantity</span>
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formValues?.stockQuantity}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${formErrors.stockQuantity ? 'border-red-500' : ''}`}
          />
          {formErrors.stockQuantity && <p className="text-red-500 text-xs italic">{formErrors.stockQuantity}</p>}
        </div>

        {/* Category */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="category"
            value={formValues?.category}
            onChange={handleInputChange}
            className={`select select-bordered w-full ${formErrors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select Category</option>
            <option value="Hiking">Hiking</option>
            <option value="Safety">Safety</option>
            <option value="Camping Gear">Camping Gear</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Backpacks & Storage">Backpacks & Storage</option>
            <option value="Lighting & Power">Lighting & Power</option>
            <option value="Cooking & Food Supplies">Cooking & Food Supplies</option>
            <option value="Tents & Shelters">Tents & Shelters</option>

          </select>
          {formErrors.category && <p className="text-red-500 text-xs italic">{formErrors.category}</p>}
        </div>

        {/* Image URL */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            name="img"
            value={formValues?.img}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${formErrors.img ? 'border-red-500' : ''}`}
          />
          {formErrors.img && <p className="text-red-500 text-xs italic">{formErrors.img}</p>}
        </div>

        {/* Ratings */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Ratings</span>
          </label>
          <input
            type="number"
            name="ratings"
            value={formValues?.ratings}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className={`btn hover:bg-green-400 bg-green-400 text-white ${isSubmitting ? 'loading' : ''}`}>
          {isSubmitting ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
