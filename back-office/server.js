const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Import fs module

const app = express();
const PORT = 3000;
const CLIENT_ID = '450604138943-tahpmsrsrlhgqrtlam4d32utfcp7eq2o.apps.googleusercontent.com'; // Google Client ID
const client = new OAuth2Client(CLIENT_ID);
const accountsFilePath = path.join(__dirname, 'accounts.txt'); // Path for accounts file

app.use(bodyParser.json());

// Configurar arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Endpoint to verify Google token
app.post('/verify-token', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Save user information to a .txt file
    const userData = `User: ${payload.email}, Name: ${payload.name}, Date: ${new Date().toISOString()}\n`;
    fs.appendFileSync(path.join(__dirname, 'users.txt'), userData, 'utf8');

    res.status(200).json({ success: true, user: payload });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid token' });
  }
});

// Endpoint to create a new account
app.post('/create-account', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  // Append the new account to the accounts.txt file
  const newAccount = `${username},${password}\n`;
  fs.appendFile(accountsFilePath, newAccount, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to create account.');
    }
    res.status(200).send('Account created successfully.');
  });
});

// Endpoint to handle login with email and password
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const accounts = fs.readFileSync(accountsFilePath, 'utf-8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const matched = accounts.find(line => {
      const [storedEmail, storedPassword] = line.split(',');
      return storedEmail === email && storedPassword === password;
    });

    if (matched) {
      res.status(200).json({ message: 'Login successful', email });
    } else {
      res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});


// Endpoint to handle Google login
app.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if the user already exists in accounts.txt
    const accounts = fs.readFileSync(accountsFilePath, 'utf-8');
    const accountExists = accounts
      .split('\n')
      .map(line => line.trim()) // Remove extra whitespace
      .some(line => line.startsWith(email));

    if (accountExists) {
      res.status(200).send({ message: 'Login successful', email, name });
    } else {
      res.status(401).send('Account not registered.');
    }
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid Google token');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});