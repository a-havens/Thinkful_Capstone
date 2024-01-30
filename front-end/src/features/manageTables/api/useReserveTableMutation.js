// updates reservation
export async function putReservation(reservation, signal) {
    const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
    const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: reservation }),
        signal,
    };
    return await fetchJson(url, options, {});
}
