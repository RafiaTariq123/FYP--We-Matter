import express from "express";
import 'dotenv/config';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import psychologistAuthRoutes from "./routes/psychologist.auth.routes.js";
import psychologistRoutes from "./routes/psychologist.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import messageRoutes from "./routes/message.routes.js";
import scoreRoutes from "./routes/score.routes.js";
import groupMessageRoutes from "./routes/groupMessage.routes.js";
import depressionChatbotRoutes from "./routes/depressionChatbot.routes.js";
import symptomCheckerRoutes from "./routes/symptomChecker.routes.js";
import testRoutes from "./routes/test.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import cookieParser from "cookie-parser";
import "./services/reminderNotificationService.js";
import { connectDB } from "./config/db.js";
import { v2 as cloudinary } from 'cloudinary';
import { error } from "./middleware/error.js";
import cors from "cors";
import { app, server, initSocket } from "./config/socket.js";
import dotenv from "dotenv";
dotenv.config();
const corsOption = {
    origin: true,
    credentials: true
};

// Initialize database connection
connectDB();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', psychologistAuthRoutes);
app.use('/', psychologistRoutes);
app.use('/', journalRoutes);
app.use('/', appointmentRoutes);
app.use('/', paymentRoutes);
app.use('/', adminRoutes);
app.use('/messages', messageRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/group-messages', groupMessageRoutes);
app.use('/api/chatbot', depressionChatbotRoutes);
app.use('/api/symptom-checker', symptomCheckerRoutes);
app.use('/api', testRoutes);
app.use('/api/ratings', ratingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "An unexpected error occurred.",
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Initialize Socket.IO
initSocket();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

