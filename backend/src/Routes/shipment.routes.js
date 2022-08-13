const express = require('express');

const shipmentControllers = require('../Controllers/shipment.controllers');

const router = express.Router();

router.get('/', shipmentControllers.getShipments);

router.get('/districts', shipmentControllers.getListDistrict);

router.post('/add', shipmentControllers.addShipment);

router
  .route('/allocate/:id')
  .get(shipmentControllers.getAllocationId)
  .put(shipmentControllers.allocateShipmentId);

router
  .route('/status/:id')
  .get(shipmentControllers.getStatusId)
  .put(shipmentControllers.updateStatusShipmentId);

router.get('/status', shipmentControllers.getListStatus);

module.exports = router;
