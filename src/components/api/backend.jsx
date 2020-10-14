import http from '../Reuseable/http';
const endPoint="http://localhost:5000/api"
export function callTravels( ) {
  return http.get(`${endPoint}/bus`);
}
export function submitRegister(data) {
  return http.post(`${endPoint}/register`, {
    email: data.email,
    password: data.password,
    phone:data.tel,
    fullname:data.full_name
  })
}
export function submitLogin(data) {
  return http.post(`${endPoint}/login`, {
    email: data.email,
    password: data.password,
     
  })
}
export function deleteTravel(id) {
  return http.delete(`${endPoint}/travel/${id}`)
}
export function submitBus(data) {
  return http.post(`${endPoint}/bus`, {
    driver: data.driver, 
    seats: data.seats,
    plate:data.plate
     
  })
}
export function getTravels() {
  return http.get(`${endPoint}/travel`)
}
export function submitTravel(travel,id) {
  return http.post(`${endPoint}/travel`, {
    busId:id,
    place:travel.from,
    destination:travel.destination,
     fare:travel.fare,
    time: travel.time,
    
  })
}
export function submitBooking(booking) {
  return http.post(`${endPoint}/booking`,{
travelId:booking._id
  })
}
export function getReceipt(bookId) {
  return http.get(`${endPoint}/booking/${bookId}`);
}
export function getTravelList() {
  return http.get(`${endPoint}/travel`)
}
export function getBooking(id) {
  return http.get(`${endPoint}/travel/info/${id}`)
}