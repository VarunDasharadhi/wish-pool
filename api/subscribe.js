export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source } = req.body;

  // Basic validation
  if (!email || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/app40Sptn1IA6WmBQ/Table%201`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              Email: email,
              Source: source || 'unknown',
              'Date Signed Up': new Date().toISOString().split('T')[0]
            }
          }]
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error('Airtable error:', err);
      return res.status(500).json({ error: 'Failed to save' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
