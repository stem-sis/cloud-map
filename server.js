const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware để xử lý JSON requests
app.use(bodyParser.json());

// Đọc dữ liệu từ file locations.json
const getLocations = () => {
    const data = fs.readFileSync('locations.json', 'utf-8');
    return JSON.parse(data);
};

// Lưu dữ liệu vào file locations.json
const saveLocations = (locations) => {
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
};

// API để lấy danh sách locations
app.get('/locations', (req, res) => {
    const locations = getLocations();
    res.json(locations);
});

// API để xóa một location
app.delete('/locations', (req, res) => {
    const { latitude, longitude } = req.body;

    let locations = getLocations();
    locations = locations.filter(location => location.latitude !== latitude || location.longitude !== longitude);

    saveLocations(locations);
    res.json({ message: 'Location deleted successfully', locations });
});

// API để xóa tất cả locations
app.delete('/locations/clear', (req, res) => {
    saveLocations([]);  // Xóa tất cả locations
    res.json({ message: 'All locations cleared' });
});

// Chạy server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
