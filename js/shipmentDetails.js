
/**
 * ShipmentDetails Component
 * Pure JavaScript implementation for displaying shipment details with MD Bootstrap
 */

// Function to format date for display
function formatDate(dateString) {
  if (!dateString) return '-';
  
  // Basic format handling for MM/DD/YY format
  const parts = dateString.split(' ')[0].split('/');
  if (parts.length === 3) {
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  
  return dateString;
}

// Generate HTML for a shipment details component
function generateShipmentDetailsHTML(shipment) {
  return `
    <div class="row g-3">
      <div class="col-6 col-md-3">
        <div class="text-muted small">Ship Date</div>
        <div>${formatDate(shipment.shipDate)}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="text-muted small">Delivery Date</div>
        <div>${formatDate(shipment.deliveryDateTime) || '-'}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="text-muted small">Ship From</div>
        <div>${shipment.shipperCity}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="text-muted small">Ship To</div>
        <div>${shipment.consigneeCity}, ${shipment.province} ${shipment.zip}</div>
      </div>
    </div>
  `;
}

// Generate comprehensive details for a tooltip or modal
function generateFullShipmentDetailsHTML(shipment) {
  return `
    <div class="row g-3">
      <div class="col-md-6">
        <h5>Shipper Information</h5>
        <div><strong>${shipment.shipper}</strong></div>
        <div>${shipment.shipperCity}</div>
      </div>
      <div class="col-md-6">
        <h5>Consignee Information</h5>
        <div><strong>${shipment.shipTo}</strong></div>
        <div>${shipment.consigneeCity}, ${shipment.province} ${shipment.zip}</div>
      </div>
      <div class="col-md-6 mt-3">
        <h5>Shipment Details</h5>
        <div><strong>Ship Date:</strong> ${formatDate(shipment.shipDate)}</div>
        <div><strong>Delivery Date:</strong> ${formatDate(shipment.deliveryDateTime) || 'Not Delivered'}</div>
        <div><strong>ETA:</strong> ${formatDate(shipment.etaDate)}</div>
        <div><strong>Status:</strong> ${shipment.status}</div>
      </div>
      <div class="col-md-6 mt-3">
        <h5>References</h5>
        <div><strong>Shipment Number:</strong> ${shipment.shipmentNumber}</div>
        <div><strong>BOL/Reference:</strong> ${shipment.bolRefs}</div>
        <div><strong>PU Partner Pro:</strong> ${shipment.puPartnerPro || '-'}</div>
        <div><strong>Del Partner Pro:</strong> ${shipment.delPartnerPro || '-'}</div>
      </div>
    </div>
  `;
}

// Initialize a shipment details component in a container
function initShipmentDetails(shipment, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = generateShipmentDetailsHTML(shipment);
  }
}
