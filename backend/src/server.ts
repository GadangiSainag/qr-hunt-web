import app from './app';



const PORT = parseInt(process.env.SERVER_PORT as string) ;

app.listen(5000,  '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
