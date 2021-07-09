
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/picasso', { useNewUrlParser: true })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
