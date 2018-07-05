const ServiceMock = require('../dist/data-service-mock');
const mockData = require('./mock-data.json');

const columns = {
  id: true,
  common_name: true,
  color: true,
  shirt_size: true
}

const options = {
  id: 'id',
  caseSensitive: false
}

const service = new ServiceMock(columns, mockData, options);

service.find({color: 'blue'}).page(1).then(console.log)
