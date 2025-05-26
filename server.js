// server.js - Node.js Express Server with SQLite Database
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory
app.use(cors());

// Rate limiting for form submissions
const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many quote requests from this IP, please try again later.'
});

// Initialize SQLite Database
const db = new sqlite3.Database('./quotes.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Create tables if they don't exist
function initializeDatabase() {
    const createQuotesTable = `
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quote_number TEXT UNIQUE NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            suburb TEXT NOT NULL,
            postcode TEXT NOT NULL,
            service_type TEXT NOT NULL,
            roof_type TEXT,
            timeframe TEXT,
            message TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createAnalyticsTable = `
        CREATE TABLE IF NOT EXISTS form_analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            field TEXT,
            ip_address TEXT,
            user_agent TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createQuotesTable, (err) => {
        if (err) {
            console.error('Error creating quotes table:', err);
        } else {
            console.log('Quotes table ready');
        }
    });

    db.run(createAnalyticsTable, (err) => {
        if (err) {
            console.error('Error creating analytics table:', err);
        } else {
            console.log('Analytics table ready');
        }
    });
}

// Generate unique quote number
function generateQuoteNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    
    return `PRS-${year}${month}${day}-${hours}${minutes}${seconds}${random}`;
}

// API Routes

// Submit quote request
app.post('/api/quotes', submitLimiter, (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        suburb,
        postcode,
        serviceType,
        roofType,
        timeframe,
        message
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !address || !suburb || !postcode || !serviceType) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be provided'
        });
    }

    const quoteNumber = generateQuoteNumber();

    const insertQuery = `
        INSERT INTO quotes (
            quote_number, first_name, last_name, email, phone, 
            address, suburb, postcode, service_type, roof_type, 
            timeframe, message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        quoteNumber, firstName, lastName, email, phone,
        address, suburb, postcode, serviceType, roofType,
        timeframe, message
    ];

    db.run(insertQuery, values, function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error saving quote request'
            });
        }

        // Log analytics
        logAnalytics('form_submit', null, req.ip, req.get('User-Agent'));

        res.json({
            success: true,
            message: 'Quote request submitted successfully',
            quoteNumber: quoteNumber,
            id: this.lastID
        });
    });
});

// Get all quotes (admin endpoint)
app.get('/api/quotes', (req, res) => {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM quotes';
    let params = [];

    if (status) {
        query += ' WHERE status = ?';
        params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving quotes'
            });
        }

        res.json({
            success: true,
            quotes: rows,
            count: rows.length
        });
    });
});

// Get single quote by ID or quote number
app.get('/api/quotes/:identifier', (req, res) => {
    const { identifier } = req.params;
    
    // Check if identifier is a number (ID) or string (quote number)
    const isId = /^\d+$/.test(identifier);
    const query = isId ? 
        'SELECT * FROM quotes WHERE id = ?' : 
        'SELECT * FROM quotes WHERE quote_number = ?';

    db.get(query, [identifier], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving quote'
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: 'Quote not found'
            });
        }

        res.json({
            success: true,
            quote: row
        });
    });
});

// Update quote status
app.put('/api/quotes/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'quoted', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        });
    }

    const updateQuery = `
        UPDATE quotes 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `;

    db.run(updateQuery, [status, id], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error updating quote status'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'Quote not found'
            });
        }

        res.json({
            success: true,
            message: 'Quote status updated successfully'
        });
    });
});

// Analytics endpoint
app.post('/api/analytics', (req, res) => {
    const { action, field } = req.body;
    
    logAnalytics(action, field, req.ip, req.get('User-Agent'));
    
    res.json({ success: true });
});

// Get analytics data
app.get('/api/analytics', (req, res) => {
    const { days = 7 } = req.query;
    
    const query = `
        SELECT 
            action,
            field,
            COUNT(*) as count,
            DATE(created_at) as date
        FROM form_analytics 
        WHERE created_at >= datetime('now', '-${parseInt(days)} days')
        GROUP BY action, field, DATE(created_at)
        ORDER BY created_at DESC
    `;

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving analytics'
            });
        }

        res.json({
            success: true,
            analytics: rows
        });
    });
});

// Dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
    const queries = {
        totalQuotes: 'SELECT COUNT(*) as count FROM quotes',
        newQuotes: 'SELECT COUNT(*) as count FROM quotes WHERE status = "new"',
        todayQuotes: 'SELECT COUNT(*) as count FROM quotes WHERE DATE(created_at) = DATE("now")',
        recentQuotes: 'SELECT * FROM quotes ORDER BY created_at DESC LIMIT 5'
    };

    const stats = {};
    let completed = 0;
    const total = Object.keys(queries).length;

    Object.entries(queries).forEach(([key, query]) => {
        if (key === 'recentQuotes') {
            db.all(query, (err, rows) => {
                if (!err) stats[key] = rows;
                completed++;
                if (completed === total) {
                    res.json({ success: true, stats });
                }
            });
        } else {
            db.get(query, (err, row) => {
                if (!err) stats[key] = row.count;
                completed++;
                if (completed === total) {
                    res.json({ success: true, stats });
                }
            });
        }
    });
});

// Helper function to log analytics
function logAnalytics(action, field, ipAddress, userAgent) {
    const insertQuery = `
        INSERT INTO form_analytics (action, field, ip_address, user_agent)
        VALUES (?, ?, ?, ?)
    `;

    db.run(insertQuery, [action, field, ipAddress, userAgent], (err) => {
        if (err) {
            console.error('Analytics logging error:', err);
        }
    });
}

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});

module.exports = app;