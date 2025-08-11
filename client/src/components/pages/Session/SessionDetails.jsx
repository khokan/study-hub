import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import ReviewForm from "./ReviewForm";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();
  const [hasInsertedAfterPayment, setHasInsertedAfterPayment] = useState(false);

  const currentDate = new Date();

  const { data: session, isLoading } = useQuery({
    queryKey: ["sessionDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["sessionReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?sessionId=${id}`);
      console.log('data', res)
      return res.data;
    },
  });

  const { data: paymentInfo = {} } = useQuery({
    queryKey: ["paymentInfo", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/check?email=${user.email}&sessionId=${id}`
      );
      return res.data || {};
    },
  });

  const { data: bookingCheck = {}, refetch } = useQuery({
    queryKey: ["bookingStatus", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookedSession/check?email=${user.email}&sessionId=${id}`
      );
      return res.data || {};
    },
  });

  const hasReviewed = reviews.some((r) => r.reviewer === user?.email);
  const totalReviews = reviews.length;

  const averageRating = totalReviews
    ? (
        reviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0) /
        totalReviews
      ).toFixed(1)
    : 0;

  const isRegistrationClosed =
    session && new Date(session.registrationEndDate) < currentDate;

  const isBookDisabled =
    !user || role === "admin" || role === "tutor" || isRegistrationClosed;

  const alreadyBooked = bookingCheck?.booked;

  // Insert booking automatically after payment
  useEffect(() => {
    const insertBooking = async () => {
      if (
        user?.email &&
        session?.registrationFee > 0 &&
        paymentInfo?.paid &&
        !bookingCheck?.booked &&
        !hasInsertedAfterPayment
      ) {
        try {
          const booking = {
            studentEmail: user.email,
            sessionId: session._id,
            tutorEmail: session.tutor.tutorEmail,
            paid: true,
          };

          const res = await axiosSecure.post("/bookedSession", booking);
          if (res.data.insertedId) {
            Swal.fire("Success", "Booking completed after payment!", "success");
            setHasInsertedAfterPayment(true);
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Booking failed after payment", "error");
        }
      }
    };

    insertBooking();
  }, [
    user,
    session,
    paymentInfo,
    bookingCheck,
    hasInsertedAfterPayment,
    axiosSecure,
  ]);

  const handleBooking = async () => {
    if (!user)
      return Swal.fire(
        "Login required",
        "Please login to book a session.",
        "info"
      );

    if (session.registrationFee > 0) {
      if (!paymentInfo.paid) {
        navigate(`/payment/${id}`);
        return;
      }
    }

    try {
      const booking = {
        studentEmail: user.email,
        sessionId: session._id,
        tutorEmail: session.tutor.tutorEmail,
        paid: session.registrationFee > 0,
      };

      const res = await axiosSecure.post("/bookedSession", booking);
      if (res.data.insertedId) {
        refetch();
        Swal.fire("Success", "Session booked successfully!", "success");
      } else if (res.data.message === "Already booked") {
        Swal.fire(
          "Already Booked",
          "You have already booked this session.",
          "info"
        );
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
 const regEnd = new Date(session.registrationEndDate);
        const isOngoing = currentDate < regEnd;

  return (
   <div className="max-w-5xl mx-auto px-6 py-10">
  {/* Session Detail Card */}
  <div className="bg-white rounded-3xl p-6 border border-secondary-gray6 shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Session Image */}
    <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6">
      <img
        src={
          session.registrationFee === 0
            ? "https://i.ibb.co/xtXLjnJ9/pic3.jpg"
            : "https://i.ibb.co/m5T8FCYN/pic2.jpg"
        }
        alt={session.sessionTitle}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            isOngoing ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isOngoing ? "Ongoing" : "Closed"}
        </span>
        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
          {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
        </span>
      </div>
    </div>

    {/* Content */}
    <h1 className="text-3xl font-bold text-secondary-black1 mb-2">{session.sessionTitle}</h1>
    <p className="text-sm text-secondary-gray4 leading-relaxed mb-4">
      {session.sessionDescription}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-secondary-gray4 mb-6">
      <div>
        <strong className="text-secondary-black1">Tutor:</strong> {session.tutor.tutorName}
      </div>
      <div>
        <strong className="text-secondary-black1">Fee:</strong>{" "}
        {session.registrationFee === 0 ? (
          <span className="text-green-600 font-semibold">Free</span>
        ) : (
          `$${session.registrationFee}`
        )}
      </div>
      <div>
        <strong className="text-secondary-black1">Registration:</strong>{" "}
        {session.registrationStartDate} → {session.registrationEndDate}
      </div>
      <div>
        <strong className="text-secondary-black1">Class Dates:</strong>{" "}
        {session.classStartDate} → {session.classEndDate}
      </div>
      <div>
        <strong className="text-secondary-black1">Duration:</strong>{" "}
        {session.sessionDuration}
      </div>
    </div>

    {/* Booking Button */}
    <div className="mt-4">
      <button
        onClick={handleBooking}
        className={`w-full md:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
          isRegistrationClosed || alreadyBooked || isBookDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary/90"
        }`}
        disabled={isBookDisabled || alreadyBooked}
      >
        {alreadyBooked
          ? "Already Booked"
          : isRegistrationClosed
          ? "Registration Closed"
          : "Book Now"}
      </button>
    </div>
  </div>

  {/* Reviews Section */}
  <div className="mt-12 bg-white p-6 rounded-3xl border border-secondary-gray6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <h3 className="text-2xl font-bold text-secondary-black1 mb-6">Student Reviews</h3>

    {reviews.length === 0 ? (
      <p className="text-secondary-gray4 italic">No reviews yet.</p>
    ) : (
      <ul className="space-y-4">
        {reviews.map((rev) => (
          <li
            key={rev._id}
            className="bg-secondary-gray3 p-4 rounded-md shadow-sm border border-secondary-gray6"
          >
            <p className="text-sm text-secondary-black2">{rev.comment}</p>
          </li>
        ))}
      </ul>
    )}

    {totalReviews > 0 && (
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-secondary-black1">
          Average Rating:{" "}
          <span className="text-yellow-500">{averageRating} / 5</span>
        </p>
        <p className="text-sm text-secondary-gray4">
          {totalReviews} review{totalReviews > 1 && "s"} submitted
        </p>
      </div>
    )}

    {role === "student" && !isRegistrationClosed && !hasReviewed && (
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-secondary-black1 mb-2">
          Leave a Review
        </h4>
        <ReviewForm sessionId={session._id} onSuccess={refetchReviews} />
      </div>
    )}
  </div>
</div>


  );
};

export default SessionDetails;
