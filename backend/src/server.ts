import app from './app';
const rawPort = process.env.PORT || '3000';
const PORT = parseInt(rawPort, 10);

if (isNaN(PORT)) {
    throw new Error(`Invalid PORT value: ${rawPort}`);
}

app.listen(PORT,  '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
