// import React from 'react';
// import { Form, Link, useNavigate, useLoaderData } from 'react-router-dom';

// const NoAppointment = () => {
//   return (
//     <section className="h-screen flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold mb-4">Brak zadań na ten dzień</h1>
//       <p className="text-lg text-gray-600">
//         Wybrana data nie posiada żadnych zaplanowanych zadań.
//       </p>
//       <Link to="/appointments" className="btn mt-8">
//         Powrót do kalendarza
//       </Link>
//     </section>
//   );
// };

// export default NoAppointment;

const NoAppointment = ({ selectedDate }) => {
  return (
    <div className="text-center">
      <h2>Brak zadań na wybrany dzień: {selectedDate}</h2>
      {/* Optionally add a button to schedule an appointment */}
      <button className="btn btn-primary">Umów się na wizytę</button>
    </div>
  );
};

export default NoAppointment;