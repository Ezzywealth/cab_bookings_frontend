/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../redux/slices/reservationSlice';

const NewReservation = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = useSelector((state) => state.user);
  const { cabs } = useSelector((state) => state.fetchCab);
  const [selectedCab, setSelectedCab] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = ({ date, cab, city }) => {
    console.log('started');
    const obj = { user_id: user.id, reserve_date: date, cab_id: cab, city };
    console.log(obj);
    dispatch(createReservation(obj));
    setSelectedCab('');
    reset();
  };

  return (
    <main className="flex w-full h-screen px-4 bg-reserve-bg bg-reserve-color bg-blend-multiply text-white bg-center bg-cover overflow-auto items-center gap-12 justify-center pt-20">
      <section className="">
        <h1 className="flex tracking-widest justify-center font-weight text-xl md:text-3xl lg:text-4xl mb-8 font-bold">
          Book a Ride with Carbooky!
        </h1>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full mb-12"
        >
          <div className="flex flex-col">
            <label htmlFor="city">
              City
              <input
                type="text"
                name="city"
                id="city"
                {...register('city', {
                  required: true,
                  message: 'Please enter your city',
                })}
              />
            </label>
            {errors.city && <span>{errors.city.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="date">
              Date
              <input
                type="date"
                name="date"
                id="date"
                {...register('date', {
                  required: true,
                  message: 'Please select a date',
                })}
              />
            </label>
            {errors.date && <span>{errors.date.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="Cab">
              Cab Model
              <select
                name="cab"
                id="cab"
                {...register('cab', {
                  required: 'Please choose a cab',
                })}
                value={state?.model || selectedCab}
                onChange={(e) => setSelectedCab(e.target.value)}
              >
                <option value="" disabled>
                  Select a cab
                </option>
                {cabs.map((cab) => (
                  <option key={cab.id} value={cab.id}>
                    {cab.model}
                  </option>
                ))}
              </select>
            </label>
            {errors.cab && <span>{errors.cab.message}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="Cab">
              Username
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name}
                {...register('name', {
                  required: true,
                  message: 'Please choose a name',
                })}
              />
            </label>
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-white hover:bg-[#e4e1e1] transition-all duration-300 ease-linear w-full mt-8 flex gap-2 items-center text-gray-800 rounded-md justify-center text-2xl px-8 py-3"
            >
              Reserve Now
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewReservation;
