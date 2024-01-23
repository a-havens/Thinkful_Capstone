import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations"
import {next, previous} from "../utils/date-time"
import { today } from "../utils/date-time";

export const Dashboard =() => {
  const [date, setDate] = useState(today());
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

useEffect(() => {
  const abortController = new AbortController();
  setReservationsError(null);
  
  listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch((error) => {
      console.error("Error fetching reservations:", error);
      setReservationsError(error);
    });

  return () => abortController.abort();
}, [date])

function handlePrevious(event){
  event.preventDefault()
 setDate(previous(date))

}

function handleNext(event){
  event.preventDefault()
  setDate(next(date))
}

return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div className='d-md-flex mb-3'>
        <button className='col-3' type='button' onClick={handlePrevious}>Previous</button>
        <button className="col-3" type="button" onClick={handleNext}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} date={date} />
    </main>
  )
};
