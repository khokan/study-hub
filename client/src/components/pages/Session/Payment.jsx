import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { id: sessionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const { data: session, isLoading } = useQuery({
    queryKey: ["paymentSession", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${sessionId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    try {
      // Simulate payment success
      const booking = {
        sessionId,
        studentEmail: user.email,
        tutorEmail: session.tutor.tutorEmail,
      };

      const res = await axiosSecure.post("/bookedSession", booking);

      if (res.data.insertedId) {
        Swal.fire(
          "Payment Successful!",
          "Session booked successfully.",
          "success"
        );
        navigate("/dashboard/bookings"); // Or home
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading session info...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-4">
        Payment for: {session.sessionTitle}
      </h2>
      <p className="mb-2">
        <strong>Tutor:</strong> {session.tutor.tutorName}
      </p>
      <p className="mb-2">
        <strong>Registration Fee:</strong> ${session.fee}
      </p>

      <div className="mt-8">
        <button onClick={handlePayment} className="btn btn-success">
          Pay ${session.fee} & Book Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
