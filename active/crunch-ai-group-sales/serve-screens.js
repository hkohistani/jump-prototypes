const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3333;

app.use(cors());
app.use('/screens', express.static(path.join(__dirname, 'screens')));

app.listen(PORT, () => {
    console.log(`\n✅ Screen server running at http://localhost:${PORT}/screens`);
    console.log('   Serving screens from:', path.join(__dirname, 'screens'));
    console.log('\n   Now run the Figma plugin to import the screens.');
    console.log('   Press Ctrl+C to stop when done.\n');
});
