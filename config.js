const config ={
        dev:{
                DB_URL: "mongodb://localhost:27017/estore",
                PORT: '3030',
        },
        prod:{
                DB_URL: process.env.DB_URL,
                PORT: process.env.PORT,
        }
};

module.exports = config;