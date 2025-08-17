require("dotenv").config(); // if you don't use data can't be access fron .env file
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken')

const stripe = require('stripe')(process.env.PAYMENT_GATEWAY_KEY);

const app = express(); // create express app
const port = process.env.PORT || 5000;

//MiddleWare
const corsOptions = {
  origin: [`${process.env.NODE_CLIENT_URL}`],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // set cookie-parser

// const corsOptions = {
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true,
//   optionSuccessStatus: 200,
// }
// app.use(cors(corsOptions))
 
// ----------------- 
// Generate jwt token
// -------------------
// This endpoint generates a JWT token for the user based on their email address.
app.post('/jwt', async (req, res) => {
  const email = req.body
  const token = jwt.sign(email, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: '365d',
  })
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({ success: true })
  })
   



app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from study hub server ..");
});


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
  // await client.connect();

  const db = client.db('studyHubDB'); // database name
  const usersCollection = db.collection('users');
  const sessionsCollection = db.collection('sessions');
  const materialsCollection = db.collection('materials');
  const bookedSessionCollection = db.collection('bookedSession');
  const reviewsCollection = db.collection('reviews');
  const paymentsCollection = db.collection('payments');
  const notesCollection = db.collection('notes')

// -----------------
// Verify Token Middleware
// -------------------
// This middleware checks if the request has a valid JWT token in the cookies. If not, it returns a 401 status with an error message.
const verifyTokenAndRole = async (req, res, next) => {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
  try {
    // 1. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    // 2. Fetch user from database
    const email = decoded.email
    const user = await usersCollection.findOne({ email });
    // 3. Attach role to request
    req.user = {
      email: decoded.email,
      role: user.role // From database, not JWT
    };
   
    next(); // Call next middleware
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

 // -----------------
 // Verify Admin
  // -------------------
  // This middleware checks if the user is an admin. If not, it returns a 403 status with an error message. 
const verifyAdmin = async (req, res, next) => {
    const email = req?.user?.email
    
    if (!req.user || req.user?.role !== 'admin')
      return res
        .status(403)
        .send({ message: 'Admin only Actions!', role: req.user?.role })

    next()
  }


//-----------------
// Verify Tutor
//-------------------
// This middleware checks if the user is a tutor. If not, it returns a 403 status with an error message.
const verifyTutor = async (req, res, next) => {
  const email = req?.user?.email

 if (!req.user || req.user?.role !== 'tutor')
      return res
        .status(403)
        .send({ message: 'Tutor only Actions!', role: req.user?.role })

  next()
}

//-----------------
// Verify Student
//-------------------
// This middleware checks if the user is a student. If not, it returns a 403 status with an error message.
const verifyStudent = async (req, res, next) => {
  const email = req?.user?.email

 if (!req.user || req.user?.role !== 'student')
      return res
        .status(403)
        .send({ message: 'Student only Actions!', role: req.user?.role })

  next()
}
// -----------------
// GET: Get user role by email
// -------------------
// This endpoint retrieves the role of a user based on their email address. It checks if the requesting user is an admin or the user themselves.
// It also validates the email format and ensures that unauthorized access is prevented.
app.get('/users/:email/role', verifyTokenAndRole, async (req, res) => {
  try {
    const requestedEmail = req.params.email;
    const requestingUser = req.user; // From middleware

    // 1. Input validation
    if (!requestedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 2. Authorization check
    if (requestingUser.role !== 'admin' && requestingUser.email !== requestedEmail) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // 3. Secure database query
    const user = await usersCollection.findOne(
      { email: requestedEmail },
      { projection: { role: 1 } } // Only fetch role field
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 4. Response
    res.json({ 
      role: user.role,
      isSelf: requestingUser.email === requestedEmail 
    });

  } catch (error) {
    console.error('Role lookup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
// -----------------    
// create user
// -------------------
// This endpoint creates a new user in the database. If the user already exists, it updates the last login time.
app.post('/users', async (req, res) => {
  const email = req.body.email;
  const userExists = await usersCollection.findOne({ email })
  if (userExists) {
      // update last log in
      return res.status(200).send({ message: 'User already exists', inserted: false });
  }
  const user = req.body;
  const result = await usersCollection.insertOne(user);
  res.send(result);
})

// -----------------
// Logout User
// -------------------
  app.get('/logout', async (req, res) => {
  try {
    res
      .clearCookie('token', {
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true })
  } catch (err) {
    res.status(500).send(err)
  }
  })
  

// ---------------------------
// GET: Search + List Users
// ---------------------------
// This endpoint searches for users based on a partial email match. It returns a maximum of 10 users that match the search query.
app.get('/users', verifyTokenAndRole, verifyAdmin, async (req, res) => {
  try {
    const query = req.query.search;
    const regex = new RegExp(query, "i"); // case-insensitive partial match
    try {
        const users = await usersCollection
            .find({ email: { $regex: regex } }) // Exclude admin users
            // .project({ email: 1, createdAt: 1, role: 1 })
            .limit(10)
            .toArray();
        res.send(users);
    } catch (error) {
        console.error("Error searching users", error);
        res.status(500).send({ message: "Error searching users" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// GET: update user role
// ---------------------------
// This endpoint updates the user role to 'admin', 'tutor', or 'student' based on the provided ID and role in the request body.
app.patch("/users/:id/role", verifyTokenAndRole, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!["admin", "tutor", "student"].includes(role)) {
        return res.status(400).send({ message: "Invalid role" });
    }

    try {
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { role } }
        );
        res.send({ message: `User role updated to ${role}`, result });
    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({ message: "Failed to update user role" });
    }
});

//---------------------------
// 1. Create Study Session
// ---------------------------
// This endpoint creates a new study session with the provided data. The session is initialized with a status of 'pending' and a fee of 0.
app.post('/sessions', verifyTokenAndRole, verifyTutor, async (req, res) => {
  try {
    const session = {
      ...req.body,
      status: 'pending',
    };
    const result = await sessionsCollection.insertOne(session);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ---------------------------
// PUT: Update Session
// ---------------------------
// This endpoint updates an existing study session with the provided data. It requires the session ID in the URL and the updated data in the request body.
app.put('/sessions/:id', verifyTokenAndRole, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prepare update from request body
    const update = {
      ...req.body
    };

    // Update session
    const result = await sessionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Return success response
    res.json({ 
      success: true,
      message: 'Session updated'
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update session'
    });
  }
});

// ---------------------------
// GET: All Study Sessions or by Tutor or by status
// ---------------------------
// This endpoint retrieves all study sessions. It can also filter sessions by tutor's email or by session status 
// (e.g., 'pending', 'approved', 'rejected').
app.get('/sessions',  async (req, res) => {
  try {
    const { email, status } = req.query;
    const filter = {};

    // 1. Apply role-based filtering
    if (email) {
      filter['tutor.tutorEmail'] = email; // Tutors only see their own sessions
    } 
   
    // 2. Optional status filter (applies to both roles)
    if (status) {
      filter.status = status;
    }

    const sessions = await sessionsCollection.find(filter).toArray();
    res.status(200).send(sessions);

  } catch (err) {
    console.error('Failed to fetch sessions:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});


// ---------------------------
// Get a single session by ID
// ---------------------------
// This endpoint retrieves a single study session by its ID. It requires the user to be authenticated and have the 'tutor' role.
app.get('/sessions/:id',  async (req, res) => {
  const {id} = req.params;
  const session = await sessionsCollection.findOne({ _id: new ObjectId(id) });
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.send(session);
});


// ---------------------------
// PATCH: Update Session Status
// ---------------------------
// This endpoint updates the status of a study session based on the provided action ('approve' or 'reject'). It also updates the fee if approved, 
// or adds a rejection reason and feedback if rejected.
app.patch('/sessions/:id/status', verifyTokenAndRole, verifyAdmin, async (req, res) => {
  try {
    const { action, registrationFee, rejectionReason, feedback } = req.body;
    const { id } = req.params;

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action. Must be "approve" or "reject"' });
    }

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid session ID format' });
    }

    // Find the session
    const session = await sessionsCollection.findOne({ _id: new ObjectId(id) });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Prepare update
    const update = {
      status: action === 'approve' ? 'approved' : 'rejected',
      ...(action === 'approve' && { registrationFee: registrationFee || 0 }),
      ...(action === 'reject' && { 
        rejectionReason,
        feedback
      })
    };

    // Update session
    const result = await sessionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes made to session' });
    }

    // Get updated document
    const updatedSession = await sessionsCollection.findOne({ _id: new ObjectId(id) });

    res.json({ 
      message: `Session ${action}d successfully`,
      session: updatedSession
    });

  } catch (err) {
    console.error('Error updating session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------
// New endpoint to reset rejected session to pending
// ---------------------------
// This endpoint resets the status of a rejected session back to pending and clears the rejection reason and
app.patch('/sessions/:id/reset-status', verifyTokenAndRole, verifyTutor, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid session ID format' });
    }

    // Find and update the session
    const result = await sessionsCollection.updateOne(
      { 
        _id: new ObjectId(id),
        status: 'rejected' // Only update if current status is rejected
      },
      { 
        $set: { 
          status: 'pending' // Change status to pending
        },
        $unset: {
          rejectionReason: "", // Removes the field entirely
          feedback: ""
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        message: 'Session not found or not in rejected status' 
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes made to session' });
    }

    // Get updated document
    const updatedSession = await sessionsCollection.findOne({ _id: new ObjectId(id) });

    res.json({ 
      message: 'Session status reset to pending and rejection data cleared',
      session: updatedSession
    });

  } catch (err) {
    console.error('Error resetting session status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------------
// Delete a session
// -----------------------
// 
app.delete('/sessions/:id', verifyTokenAndRole, verifyAdmin, async (req, res) => {
  try{
  const id = new ObjectId(req.params.id);
  const result = await sessionsCollection.deleteOne({ _id: id });
  res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  res.send(result);
});
// ---------------------------
// Book a session
// ---------------------------
// This endpoint allows a student to book a session. It checks if the session is already booked by the student before allowing the booking.
// It requires the user to be authenticated and have the 'student' role.
app.post('/bookedSession', verifyTokenAndRole, async (req, res) => {
  try {
        // Find the session
    const session = await bookedSessionCollection.findOne({ sessionId: req.body.sessionId, studentEmail: req.user.email });
    if (session) {
      return res.json({ message: 'Already booked' });
    }

    const bookedSession = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await bookedSessionCollection.insertOne(bookedSession);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ---------------------------
// GET: Fetch Booked Sessions
// ---------------------------
// This endpoint retrieves all booked sessions for the authenticated user. It applies role-based filtering so that students only see their own sessions.
app.get('/bookedSession', verifyTokenAndRole, async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }

    // Step 1: Get all booked sessions by student
    const bookedSessions = await bookedSessionCollection.find({ studentEmail: email }).toArray();

    // Step 2: Get corresponding session details for each booked session
    const detailedSessions = await Promise.all(
      bookedSessions.map(async (booking) => {
        const session = await sessionsCollection.findOne({ _id: new ObjectId(booking.sessionId) });
        return {
          _id: booking._id,
          sessionId: booking.sessionId,
          tutorEmail: booking.tutorEmail,
          studentEmail: booking.studentEmail,
          sessionTitle: session?.sessionTitle,
          registrationFee: session?.registrationFee,
          status: session?.status,
        };
      })
    );
    res.send(detailedSessions);
  } catch (error) {
    console.error('Failed to fetch booked sessions:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


//-------------------------
// GET: Booking check by email and sessionid
//-------------------------
app.get('/bookedSession/check', async (req, res) => {
  const { email, sessionId } = req.query;
  const exists = await bookedSessionCollection.findOne({ studentEmail: email, sessionId });
  res.send({ booked: !!exists });
});

// ---------------------------
// POST: Submit Review
// ---------------------------
app.post('/reviews', async (req, res) => {
  const { sessionId, reviewer, rating, comment } = req.body;

  // Check if already reviewed
  const existing = await reviewsCollection.findOne({ sessionId, reviewer });
  if (existing) {

    return res.status(400).send({ message: 'You already submitted a review for this session.' });
  }

  const result = await reviewsCollection.insertOne({ sessionId, reviewer, rating, comment });
  res.send({ insertedId: result.insertedId });
});

// ---------------------------
// GET: Fetch Reviews for a Session
// ---------------------------
// This endpoint retrieves all reviews for a specific session. It requires the session ID to be provided in the query parameters.
app.get('/reviews', verifyTokenAndRole, async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).send({ error: 'sessionId is required' });
    }

    const reviews = await reviewsCollection
      .find({ sessionId: sessionId })
      .sort({ createdAt: -1 }) // Optional: newest first
      .toArray();

    res.status(200).send(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
});


// --
app.post('/materials',  async (req, res) => {
  try {
    const material = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await materialsCollection.insertOne(material);
    // const insertedMaterial = await materialsCollection.findOne({ _id: result.insertedId });

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ---------------------------
// GET: List Materials
// ---------------------------
// This endpoint retrieves all materials. It can filter materials based on the user's role (tutor or admin) and 
// an optional status query parameter.
app.get('/materials', verifyTokenAndRole, async (req, res) => {
  try {
    const { status } = req.query; // Optional status filter
    const filter = {};

    // Role-based filtering
    if (req.user.role === 'tutor') {
      filter.tutorEmail = req.user.email; // Tutors only see their own materials
    }
    if (req.user.role === 'student') {
      const sessionId = req.query.sessionId;
      if (sessionId) {
        filter.sessionId = sessionId;
      }
    }
    // Admins see all materials (no additional filter)

    // Optional status filter (applies to both roles)
    if (status) {
      filter.status = status;
    }

    const materials = await materialsCollection
      .find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    res.json(materials);

  } catch (err) {
    console.error('Failed to fetch materials:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete material
app.delete('/materials/:id', verifyTokenAndRole,  async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await materialsCollection.deleteOne({ 
      _id: new ObjectId(req.params.id),
      // uploadedBy: new ObjectId(req.user.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Material not found or not owned by user" });
    }

    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ---------------------------
// PUT: Update Material
// ---------------------------
// This endpoint updates an existing material. It requires the material ID in the URL and the updated
app.put('/materials/:id',  async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const update = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await materialsCollection.updateOne(
      { 
        _id: new ObjectId(req.params.id),
      },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Material not found or not owned by user" });
    }

    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// ---------------------------
// Create Payment Intent
// ---------------------------
// 
app.post('/create-payment-intent', async (req, res) => {
      const amountInCents = req.body.amountInCents
          try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents, // Amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// ---------------------------
// post: Record Payment
// ---------------------------
// This endpoint records a payment made by a student for a specific session. It requires the session ID, student email, amount, payment method, and transaction ID in the request body.
app.post('/payments', async (req, res) => {
  try {
        const { sessionId, studentEmail, amount, paymentMethod, transactionId } = req.body;
        
        // 2. Insert payment record
        const paymentDoc = {
            sessionId,
            studentEmail,
            amount,
            paymentMethod,
            transactionId,
            paid_at: new Date(),
        };

        const paymentResult = await paymentsCollection.insertOne(paymentDoc);

        res.status(201).send({
            message: 'Payment recorded and session marked as paid',
            insertedId: paymentResult.insertedId,
        });

    } catch (error) {
        console.error('Payment processing failed:', error);
        res.status(500).send({ message: 'Failed to record payment' });
    }
});

// ---------------------------
// Check Payment Status
// ---------------------------
// This endpoint checks if a payment has been made for a specific session by a student. It requires the student's email and session ID as query parameters.      
app.get('/payments/check', verifyTokenAndRole, async (req, res) => {
  try {
    const { email, sessionId } = req.query;

    if (!email || !sessionId) {
      return res.status(400).json({ error: "Missing email or sessionId" });
    }

    const payment = await paymentsCollection.findOne({
      studentEmail: email,
      sessionId: sessionId,
    });
    if (payment) {
      res.send({ paid: true });
    } else {
      res.send({ paid: false }); // Not booked yet
    }
  } catch (err) {
    console.error("Error checking payment status:", err);
    res.status(500).send({ error: err.message });
  }
});

//---------------------------
// POST notes
// ---------------------------
// This endpoint allows users to create a new note. It requires the note data in the request body and saves it to the notes collection.
// It returns the result of the insert operation.   
app.post('/notes', async (req, res) => {
  const note = req.body;
  const result = await notesCollection.insertOne(note);
  res.send(result);
});

//----------------------------
// GET notes
// ---------------------------
// This endpoint retrieves notes from the database. It can filter notes by email if provided in the query parameters.
app.get('/notes', verifyTokenAndRole, async (req, res) => {
  const email = req.query.email;
  const query = {}
  if(email)
    query.email = email;
  const result = await notesCollection.find(query).toArray();
  res.send(result);
});

//---------------------------
// DELETE note
// ---------------------------
// This endpoint deletes a note by its ID. It requires the note ID to be provided in the URL parameters.
app.delete('/notes/:id', verifyTokenAndRole, async (req, res) => {
  try{
  const id = new ObjectId(req.params.id);
  const result = await notesCollection.deleteOne({ _id: id });
  res.status(200).send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//---------------------------
// PUT note
// ---------------------------
// This endpoint updates a note by its ID. It requires the note ID to be provided in
app.put('/notes/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const update = {
    $set: {
      title: req.body.title,
      description: req.body.description,
    },
  };
  const result = await notesCollection.updateOne({ _id: id }, update);
  res.send(result);
});

// ----------------------------
// GET /tutors-info → Returns all tutors with name, email, total sessions, and average rating
// ---------------------------
// This endpoint retrieves information about all tutors, including their name, email, total sessions created, total reviews received, and average rating.
// It aggregates data from the users, sessions, and reviews collections to provide a comprehensive overview of each tutor's performance. 
app.get('/tutors-info',  async (req, res) => {
  try {
    // Step 1: Fetch all users with role === 'tutor'
    const tutors = await usersCollection.find({ role: 'tutor' }).toArray();

    const tutorInfos = await Promise.all(
      tutors.map(async (tutor, index) => {

        // Step 2: Count total sessions created by the tutor
        const sessionCount = await sessionsCollection.countDocuments({
          'tutor.tutorEmail': tutor.email,
        });

        // Step 3: Get all reviews for this tutor's sessions
        const tutorSessions = await sessionsCollection
          .find({ 'tutor.tutorEmail': tutor.email }, { projection: { _id: 1 } })
          .toArray();
        const sessionIds = tutorSessions.map((s) => s._id.toString());

        const reviews = await reviewsCollection
          .find({ sessionId: { $in: sessionIds } })
          .toArray();

        const avgRating =
          reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
                reviews.length
              ).toFixed(1)
            : "0";

        return {
          name: tutor.name,
          email: tutor.email,
          totalSessions: sessionCount,
          totalReviews: reviews.length,
          averageRating: avgRating,
        };
      })
    );

    res.send(tutorInfos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// --
// GET: dashboard-summary for admin
// Server route: /api/dashboard-summary

app.get("/dashboard-summary", verifyTokenAndRole, verifyAdmin, async (req, res) => {
  try {
    // Fetch users
    const users = await usersCollection.find().toArray();

    const totalStudents = users.filter(user => user.role === "student").length;
    const totalTutors = users.filter(user => user.role === "tutor").length;

    // Fetch sessions
    const sessions = await sessionsCollection.find().toArray();

    // Fetch bookings
    const bookings = await bookedSessionCollection.find().toArray();

    // Count enrollments per session
    const enrollmentsPerSession = sessions.map(session => {
      const count = bookings.filter(b => b.sessionId === session._id.toString()).length;

      return {
        sessionId: session._id,
        sessionTitle: session.sessionTitle,
        enrollmentCount: count,
      };
    });

    // Final response object
    const summary = {
      totalStudents,
      totalTutors,
      totalSessions: sessions.length,
      enrollmentsPerSession,
    };

    res.json(summary);
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//--------------------
// GET: dashboard summary for Tutor
// -----------------
app.get("/tutor-dashboard-summary", verifyTokenAndRole, verifyTutor, async (req, res) => {
  try {
    const tutorEmail = req.query.email;

    if (!tutorEmail) {
      return res.status(400).json({ message: "Tutor email is required" });
    }

    // Fetch all sessions created by this tutor
    const tutorSessions = await sessionsCollection
      .find({ "tutor.tutorEmail": tutorEmail })
      .toArray();

    // Separate approved and rejected sessions
    const approvedSessions = tutorSessions.filter(
      (session) => session.status === "approved"
    );

    const rejectedSessions = tutorSessions
      .filter((session) => session.status === "rejected")
      .map((session) => ({
        sessionId: session._id,
        sessionTitle: session.sessionTitle,
        rejectionReason: session.rejectionReason || "No reason provided",
        adminFeedback: session.feedback || "No feedback",
      }));

    // Fetch bookings for those approved sessions
    const bookings = await bookedSessionCollection
      .find({ tutorEmail })
      .toArray();

    // Calculate enrollments per approved session
    const enrollmentsPerSession = approvedSessions.map((session) => {
      const count = bookings.filter(
        (b) => b.sessionId === session._id.toString()
      ).length;

      return {
        sessionId: session._id,
        sessionTitle: session.sessionTitle,
        enrollmentCount: count,
      };
    });

    // Final response
    const summary = {
      totalStudents: new Set(bookings.map((b) => b.studentEmail)).size,
      totalSessions: tutorSessions.length,
      approvedSessionsCount: approvedSessions.length,
      rejectedSessions,
      enrollmentsPerSession,
    };

    res.json(summary);
  } catch (error) {
    console.error("Error fetching tutor dashboard summary:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//-------------------
//-- GET: dashboard-summary for student
//-------------------
app.get("/student-dashboard-summary", verifyTokenAndRole, verifyStudent, async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const bookings = await bookedSessionCollection.find({ studentEmail: email }).toArray();

    const sessionIds = bookings.map((b) => new ObjectId(b.sessionId));
    const sessions = await sessionsCollection
      .find({ _id: { $in: sessionIds } })
      .project({ sessionTitle: 1, tutor: 1 })
      .toArray();

    // Get classmates for each session
    const classmatesBySession = await Promise.all(
      sessionIds.map(async (id) => {
        const classmates = await bookedSessionCollection
          .find({ sessionId: id.toString(), studentEmail: { $ne: email } })
          .toArray();
        return {
          sessionId: id.toString(),
          classmates: classmates.map((c) => c.studentEmail),
        };
      })
    );

    // Merge data
    const enrolledSessions = sessions.map((s) => {
      const classmates = classmatesBySession.find((c) => c.sessionId === s._id.toString());
      return {
        sessionId: s._id,
        sessionTitle: s.sessionTitle,
        tutor: s.tutor?.tutorName || "Unknown",
        classmates: classmates?.classmates || [],
      };
    });

    res.json({
      totalEnrollments: enrolledSessions.length,
      enrolledSessions,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET admin profile by email (from JWT)
app.get("/profile", verifyTokenAndRole, async (req, res) => {
  try {
    const email = req.user.email; // decoded from JWT
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      joinedAt: user.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin profile" });
  }
});

// Send a ping to confirm a successful connection
// await client.db("admin").command({ ping: 1 });
// console.log(
//   "Pinged your deployment. You successfully connected to MongoDB!"
// );
} finally {
// Ensures that the client will close when you finish/error
//await client.close();
}
}
run().catch(console.dir);
