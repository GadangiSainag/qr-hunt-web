import app from './app';



const PORT = parseInt(process.env.SERVER_PORT as string) ;

app.listen(PORT,  '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
