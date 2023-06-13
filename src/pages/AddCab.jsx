/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploader from '../components/ImageUploader';
// import { useDispatch } from 'react-redux';

const AddCab = () => {
  const [imageUrl, setImageUrl] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // const dispatch = useDispatch();
  // const [imageUrl, setImageUrl] = useState('');
  // const cloudinaryRef = useRef();
  // useEffect(() => {
  //   cloudinaryRef.current = window.cloudinary;
  // }, []);

  const handleFormSubmit = (data) => {
    console.log(data);
    console.log(imageUrl);
    // const obj = { name, date, cab, city };
    // dispatch(createReservation(obj));
    reset();
  };
  return (
    <div className="py-8 space-y-12 bg-lime-50 h-screen overflow-auto">
      <h1 className="flex justify-center text-xl md:text-3xl font-bold">
        Add a New Cab for Rentals
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 px-4 md:px-10 lg:px-20 xl:px-40 md:gap-x-8"
      >
        <div className="">
          <label htmlFor="model">
            Cab Model
            <input
              type="text"
              name="model"
              id="model"
              placeholder="eg. Corolla, Camry, etc"
              {...register('model', {
                required: true,
                message: 'Please enter the cab model',
              })}
            />
          </label>
          {errors.model && (
            <span className="text-red-500 text-base">
              {errors.model.message}
            </span>
          )}
        </div>
        <div className="">
          <label htmlFor="manufacturer">
            Manufacturer
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              placeholder="eg. Ford, Toyota, etc"
              {...register('manufacturer', {
                required: true,
                message: 'Please enter the manufacturer name',
              })}
            />
          </label>
          {errors.manufacturer && (
            <span className="text-red-500 text-base">
              {errors.manufacturer.message}
            </span>
          )}
        </div>
        <div className="">
          <label htmlFor="transmission">
            Transmission
            <input
              type="text"
              name="transmission"
              id="transmission"
              placeholder="manual or automatic"
              {...register('transmission', {
                required: true,
                message: 'Please enter a transmission type',
              })}
            />
          </label>
          {errors.transmission && (
            <span className="text-red-500 text-base">
              {errors.transmission.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="rental_price">
            Rental Price (USD)
            <input
              type="number"
              name="rental_price"
              id="rental_price"
              placeholder="e.g 200, 500, 5000, 10000"
              {...register('rental_price', {
                required: true,
                message: 'Please enter a rental prize for this cab',
              })}
            />
          </label>
          {errors.rental_price && <span>{errors.rental_price.message}</span>}
        </div>
        <div>
          <label htmlFor="discount">
            Discount (%)
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="e.g 5, 10, 20, 30"
              {...register('discount', {
                required: true,
                message: 'Please enter a rental discount',
              })}
            />
          </label>
          {errors.discount && <span>{errors.discount.message}</span>}
        </div>
        <div>
          <label htmlFor="engine_type">
            Engine Type
            <input
              type="text"
              name="engine_type"
              id="engine_type"
              placeholder="2.5L V6 or 2.0L I4"
              {...register('engine_type', {
                required: true,
                message: 'Please enter an engine type',
              })}
            />
          </label>
          {errors.engine_type && <span>{errors.engine_type.message}</span>}
        </div>
        <div>
          <label htmlFor="cab">
            Seating Capacity
            <input
              type="number"
              name="seating_capacity"
              id="seating_capacity"
              {...register('seating_capacity', {
                required: true,
                message: 'Please enter the seating capacity',
              })}
            />
          </label>
          {errors.seating_capacity && (
            <span>{errors.seating_capacity.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="body_type">
            Body Type
            <input
              type="text"
              name="body_type"
              id="body_type"
              placeholder="sedan, suv"
              {...register('body_type', {
                required: true,
                message: 'Please enter the body type',
              })}
            />
          </label>
          {errors.body_type && <span>{errors.body_type.message}</span>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description">
            Description
            <textarea
              rows={5}
              type="text"
              name="description"
              id="description"
              {...register('description', {
                required: true,
                message: 'Please enter the car description',
              })}
            />
          </label>
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div className="md:col-span-2">
          <h5 className="block font-semibold text-base">Image</h5>
          <ImageUploader setImageUrl={setImageUrl} />
          {errors.image_url && <span>{errors.image_url.message}</span>}
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-lime-500 w-full flex gap-2 items-center text-white rounded-md justify-center text-2xl px-8 py-3"
          >
            Add New Cab
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCab;
