const axios = require('axios');
const mongoose = require('mongoose');
const Shipment = require('../Models/Shipment');
const Driver = require('../Models/Drivers');
const Truck = require('../Models/Trucks');
const { BadRequest, NotFoundError } = require('../Exceptions/Exceptions');

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

const getShipments = async (req, res) => {
  const {order, search} = req.query;

  let ord = 1;
  if (order != null || order != ''){
    ord = parseInt(order, 10)
  }

  const shipment = await Shipment
                          .find({ shipment_number: {$regex: search || '', $options: "i"} })
                          .sort({ shipment_number: ord })
                          .exec();

  return res.json({
    success: true,
    data: shipment,
  });
};

const getListDistrict = async (req, res) => {
  res.json({
    success: true,
    data: district,
  });
};

const addShipment = async (req, res) => {
  // Get latest ship number
  const shipmentCount = await Shipment.count();

  // Generate custom id
  const shipNumber = `BO-${shipmentCount}`;

  let shipment = new Shipment({
    shipment_number: shipNumber,
    license: null,
    driver: null,
    origin: req.body.origin,
    destination: req.body.destination,
    loading_date: req.body.loading_date,
    status: 'Created',
  });

  shipment = await shipment.save();

  return res.status(201).json({
    success: true,
    data: {
      id: shipment.id,
      shipment_number: shipment.shipment_number,
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

  let isDriverValid = true;

  let truckId, driverId; 

  // Check if license in trucks
  const isTruckValid = await Truck.find({ licenceNumber: license })
    .exec()
    .then((response) => {
      const data = response[0];
      if (data.length < 1) {
        BadRequest(res, 'Truck not exist');
        return false;
      }
      
      // Check if truck is available
      if (data.status != 'active') {
        return false;
      }

      truckId = data._id;
      return true;
    });

  // Check if driver in drivers
  if (isTruckValid) {
    isDriverValid = await Driver.find({ name: driver })
      .exec()
      .then((response) => {
        const data = response[0];
        if (data.length < 1) {
          BadRequest(res, 'Driver not exist');
          return false;
        }
        else {
          // check if driver is available
          if (data.status != 'active') {
            return false;
          }
        }

        driverId = data._id;
        return true;
      });
  }

  // Update controller
  if (isTruckValid && isDriverValid) {
    // Update shipment status
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

    // Update Truck status
    await Truck.findByIdAndUpdate(
      truckId,
      {
        status: 'inactive',
      },
      {
        returnOriginal: false,
      },
    );

    // Update Driver status
    await Driver.findByIdAndUpdate(
      driverId,
      {
        status: 'inactive',
      },
      {
        returnOriginal: false,
      },
    );

    if (shipment == null) {
      return NotFoundError(res, 'Shipment id not found');
    }

    return res.status(201).json({
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

  if (shipment == null) {
    return NotFoundError(res, 'Shipment id not found');
  }

  return res.status(201).json({
    success: true,
    message: 'Shipment status updated',
    data: shipment,
  });
};

module.exports = {
  getShipments,
  getListDistrict,
  addShipment,
  getAllocationId,
  allocateShipmentId,
  getListStatus,
  getStatusId,
  updateStatusShipmentId,
};
