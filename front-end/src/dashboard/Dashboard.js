import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export const Dashboard = ({ date }) => {
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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}
