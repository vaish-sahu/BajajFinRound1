import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import atob from 'atob';

const app = express();
app.use(cors());
app.use(bodyParser.json());

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

app.post('/bfhl', (req, res) => {
    const data = req.body.data  ||[];
    const fileB64 = req.body.file_b64  ||null;

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const highestLowercase = alphabets.filter((item) => /^[a-z]$/.test(item))
                                       .sort()
                                       .slice(-1);

    const primeFound = numbers.some((num) => isPrime(parseInt(num)));

    let fileValid = false;
    let mimeType = null;
    let fileSizeKB = null;
    if (fileB64) {
        try {
            const buffer = Buffer.from(fileB64, 'base64');
            fileSizeKB = (buffer.length / 1024).toFixed(2);
            mimeType = 'application/octet-stream'; 
            fileValid = true;
        } catch (error) {
            console.log("error file handling:" ,error);
            
        }
    }

    res.json({
        is_success: true,
        user_id: "vaishnavi 02 09 2003",
        email: "vaishnavi.sahu.209@gmail.com",
        roll_number: "21100BTCSE09594",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase,
        is_prime_found: primeFound,
        file_valid: fileValid,
        file_mime_type: mimeType,
        file_size_kb: fileSizeKB
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});