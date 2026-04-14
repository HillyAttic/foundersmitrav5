// Cloudflare Pages Function for Contact Form
// Handles form submissions and sends emails via Resend API

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    console.log('Contact form request received');

    // Check if RESEND_API_KEY exists
    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Server configuration error. Please contact support.'
        }),
        { status: 500, headers }
      );
    }

    // Parse request body
    const data = await request.json();
    console.log('Form data received:', { name: data.name, email: data.email, subject: data.subject });

    // Get client IP
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Validate input
    const validationErrors = validateInput(data);
    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return new Response(
        JSON.stringify({
          success: false,
          message: validationErrors.join(', ')
        }),
        { status: 400, headers }
      );
    }

    // Sanitize input
    const sanitized = sanitizeInput(data);

    // Send email notification via Resend
    console.log('Sending email via Resend...');
    await sendEmailNotification(sanitized, clientIP, env);
    console.log('Email sent successfully');

    // Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! We'll get back to you within 48 hours."
      }),
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', error.message, error.stack);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred. Please try again later.',
        error: error.message
      }),
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS request for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}

// Validate input
function validateInput(data) {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email address');
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 3 || data.subject.trim().length > 200) {
    errors.push('Subject must be between 3 and 200 characters');
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 5000) {
    errors.push('Message must be between 10 and 5000 characters');
  }

  return errors;
}

// Sanitize input
function sanitizeInput(data) {
  return {
    name: escapeHtml(data.name.trim()),
    email: data.email.trim().toLowerCase(),
    subject: escapeHtml(data.subject.trim()),
    message: escapeHtml(data.message.trim())
  };
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Send email notification via Resend
async function sendEmailNotification(data, ip, env) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: #1a1a1a;
          color: #fff;
          padding: 30px 20px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .value {
          font-size: 15px;
          color: #1a1a1a;
          word-wrap: break-word;
        }
        .value a {
          color: #0066cc;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .message-content {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 4px;
          white-space: pre-wrap;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer {
          text-align: center;
          color: #999;
          font-size: 12px;
          padding: 20px;
          background: #f9f9f9;
        }
        .metadata {
          background: #f0f0f0;
          padding: 15px;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📧 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-content">${data.message}</div>
          </div>
          <div class="metadata">
            <strong>Submission Details:</strong><br>
            📅 ${timestamp}<br>
            🌐 IP Address: ${ip}
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the FoundersMitra contact form.</p>
          <p>Reply directly to this email to respond to ${data.name}.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send email via Resend API
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'FoundersMitra <onboarding@resend.dev>',
      to: env.NOTIFICATION_EMAIL || 'foundersmitra@gmail.com',
      reply_to: data.email,
      subject: `New Contact: ${data.subject}`,
      html: htmlContent
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend API error:', error);
    throw new Error('Failed to send email');
  }

  return await response.json();
}
