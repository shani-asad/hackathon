const axios = require('axios');
const mongoose = require('mongoose');
const Shipment = require('../Models/Shipment');
const Driver = require('../Models/Drivers');
const Truck = require('../Models/Trucks');
const { BadRequest } = require('../Exceptions/Exceptions');

const district = [];

async function getDistricts() {
  for (let i = 31; i <= 36; i++) {
    axios
      .get(`http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${i}`)
      .then((res) => {
      // Get only name
        const data = res.data.kota_kabupaten;
        data.forEach((item) => {
          district.push(item.nama);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

getDistricts();

const getListDistrict = async (req, res) => {
  res.json({
    success: true,
    data: district,
  });
};

const addShipment = async (req, res) => {
  let shipment = new Shipment({
    license: null,
    driver: null,
    origin: req.body.origin,
    destination: req.body.destination,
    loading_date: req.body.loading_date,
    status: 'Created',
  });

  shipment = await shipment.save();

  return res.json({
    success: true,
    data: {
      id: shipment.id,
      origin: shipment.origin,
      destination: shipment.destination,
      loading_date: shipment.loading_date,
    },
  });
};

const getAllocationId = async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  return res.json({
    success: true,
    data: {
      license: shipment.license,
      driver: shipment.driver,
    },
  });
};

const allocateShipmentId = async (req, res) => {
  const { license } = req.body;
  const { driver } = req.body;

  // Check if license in trucks
  const isTruckValid = await Truck.find({ licenceNumber: license })
    .exec()
    .then((data) => {
      if (data.length < 1) {
        BadRequest(res, 'Truck not exist');
        return false;
      }
      return true;
    });

  // Check if driver in drivers
  if (isTruckValid) {
    const isDriverValid = await Driver.find({ name: driver })
      .exec()
      .then((data) => {
        if (data.length < 1) {
          BadRequest(res, 'Driver not exist');
          return false;
        }
        return true;
      });
  }

  // Update controller
  if (isTruckValid && isDriverValid) {
    console.log('UPDATE=================');
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      {
        license,
        driver,
      },
      {
        returnOriginal: false,
      },
    );

    return res.json({
      success: true,
      message: 'Shipment allocated',
      data: shipment,
    });
  }
};

// List of status
const listStatus = [
  'Ongoing to Origin',
  'At Origin',
  'Ongoing to Destination',
  'At Destination',
  'Completed',
];

const getListStatus = (req, res) => res.json({
  success: true,
  data: listStatus,
});

const getStatusId = async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  return res.json({
    success: true,
    data: {
      status: shipment.status,
    },
  });
};

const updateStatusShipmentId = async (req, res) => {
  const shipment = await Shipment.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      returnOriginal: false,
    },
  );

  return res.json({
    success: true,
    message: 'Shipment status updated',
    data: shipment,
  });
};

module.exports = {
  getListDistrict,
  addShipment,
  getAllocationId,
  allocateShipmentId,
  getListStatus,
  getStatusId,
  updateStatusShipmentId,
};
