
/**
 * ShipmentHeader Component
 * Pure JavaScript implementation for displaying shipment headers with MD Bootstrap
 */

// Function to extract just the status without the date
function getStatusText(status) {
  // Common status patterns to extract
  const statusPatterns = [
    'Delivered',
    'Out For Delivery',
    'In Transit',
    'Arrived at Dest Terminal',
    'Picked Up',
    'Delayed'
  ];
  
  // Find the first status pattern that matches
  for (const pattern of statusPatterns) {
    if (status.includes(pattern)) {
      return pattern;
    }
  }
  
  // If no pattern matches, return the first part of the status (before "on" or "-")
  if (status.includes(' on ')) {
    return status.split(' on ')[0].trim();
  }
  
  if (status.includes(' - ')) {
    return status.split(' - ')[0].trim();
  }
  
  return status;
}

// Initialize a shipment header component
function initShipmentHeader(shipment, containerId = 'shipment-header') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Create the HTML structure
  container.innerHTML = `
    <div class="mb-3">
      <div class="d-flex justify-content-between align-items-start pe-4">
        <div>
          <h3 class="fw-bold">${shipment.shipper}</h3>
          <div>
            <a href="#${shipment.shipmentNumber}" class="shipment-link">${shipment.shipmentNumber}</a>
          </div>
          <div class="text-muted small">BOL/Ref# ${shipment.bolRefs}</div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <span class="fs-5 fw-semibold text-dark">${getStatusText(shipment.status)}</span>
          <div class="mt-1">
            ${shipment.status.includes('Delivered') 
              ? '<i class="fas fa-check-circle fs-4 text-tracking-success"></i>' 
              : '<i class="fas fa-truck fs-4 text-tracking-blue"></i>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Export functions if using modules
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getStatusText,
    initShipmentHeader
  };
}
