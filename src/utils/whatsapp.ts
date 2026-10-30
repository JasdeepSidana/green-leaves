import { CartItem, Product, PackSize, MaaliBookingFormData, CheckoutFormData } from '../types';

export const PRIMARY_WHATSAPP_NUMBER = '918826078720'; // +91 8826078720
export const SECONDARY_WHATSAPP_NUMBER = '918556889924'; // +91 8556889924
export const PRIMARY_DISPLAY_PHONE = '+91 8826078720';
export const SECONDARY_DISPLAY_PHONE = '+91 8556889924';

/**
 * Encodes text properly for WhatsApp URL
 */
function buildWhatsAppUrl(message: string, number: string = PRIMARY_WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * General customer support inquiry message
 */
export function getWhatsAppInquiryUrl(customPrompt?: string): string {
  const text = customPrompt || 
`🌿 *Hello Green Leaves Organics!*
I would like to inquire about your organic fertilizers, plants, and home gardening Maali services. Could you please assist me?`;
  return buildWhatsAppUrl(text);
}

/**
 * Quick order for Flagship 6-in-1 Vermicompost Mix
 */
export function getWhatsAppFlagshipOrderUrl(pack: PackSize, qty: number = 1): string {
  const total = pack.price * qty;
  const message = 
`🌱 *QUICK ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
*Product:* 6-in-1 Enriched Vermicompost Mix (Signature 2kg Pouch)
*Pack Size:* ${pack.size}
*Quantity:* ${qty} unit(s)
*Offer Price:* ₹${pack.price} × ${qty} = *₹${total}*
*Free Perks:* FREE Plant 🪴 + FREE Maali Consultation 👨‍🌾 + FREE Delivery 🚚

*Delivery Details:*
Name: 
Delivery Address: 
City & Pincode: 

Please confirm this order and dispatch to my address!`;

  return buildWhatsAppUrl(message);
}

/**
 * Quick order for any product from catalog
 */
export function getWhatsAppProductOrderUrl(product: Product, pack: PackSize, qty: number = 1): string {
  const total = pack.price * qty;
  const message = 
`🌱 *INSTANT ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
*Product:* ${product.name}
*Option:* ${pack.size}
*Quantity:* ${qty}
*Total Amount:* ₹${total} (MRP: ₹${pack.mrp * qty})

*Customer Delivery Info:*
Name: 
Phone: 
Address: 
Pincode: 

Please share delivery estimate & payment confirmation link!`;

  return buildWhatsAppUrl(message);
}

/**
 * Full Cart Checkout via WhatsApp
 */
export function getWhatsAppCartCheckoutUrl(
  items: CartItem[], 
  subtotal: number, 
  shipping: number, 
  notes?: string
): string {
  const total = subtotal + shipping;
  const hasFlagship = items.some(item => item.product.isFlagship);
  
  let itemsList = '';
  items.forEach((item, index) => {
    const itemTotal = item.selectedPack.price * item.quantity;
    itemsList += `${index + 1}. *${item.product.name}*\n   Size: ${item.selectedPack.size} | Qty: ${item.quantity} | ₹${itemTotal}\n`;
  });

  const perksSection = hasFlagship 
    ? `\n🎁 *Exclusive Perks Unlocked:*\n✓ FREE Bonus Plant Included\n✓ FREE 30-Min Maali Phone Consultation\n✓ Priority Organic Packaging\n`
    : '';

  const message = 
`🛒 *NEW CART ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
${itemsList}----------------------------------------
*Items Subtotal:* ₹${subtotal}
*Shipping Fee:* ${shipping === 0 ? 'FREE (Special Offer)' : `₹${shipping}`}
*GRAND TOTAL:* *₹${total}*
${perksSection}
${notes ? `*Customer Notes:* ${notes}\n` : ''}
*Delivery Address:*
Full Name: 
Mobile Number: 
Complete Address: 
Landmark: 
City, State & Pincode: 

Please confirm my order and share UPI payment QR / COD status!`;

  return buildWhatsAppUrl(message);
}

/**
 * Maali Service Booking dispatch
 */
export function getWhatsAppMaaliBookingUrl(data: MaaliBookingFormData, serviceTitle: string): string {
  const message = 
`👨‍🌾 *MAALI SERVICE APPOINTMENT REQUEST*
----------------------------------------
*Service Requested:* ${serviceTitle}
*Customer Name:* ${data.fullName}
*Phone Number:* ${data.phone}
*Society / Sector / City:* ${data.societyCity}
*Garden Type:* ${data.gardenType}
*Preferred Date:* ${data.preferredDate}
*Preferred Time Slot:* ${data.preferredTimeSlot}
${data.address ? `*Full Street Address:* ${data.address}\n` : ''}${data.notes ? `*Special Request:* ${data.notes}\n` : ''}
----------------------------------------
Please assign an expert Maali from Green Leaves Organics and confirm my slot!`;

  return buildWhatsAppUrl(message);
}

/**
 * Completed Web Checkout Order Summary for WhatsApp copy/sharing
 */
export function getWhatsAppOrderReceiptUrl(
  orderId: string,
  customer: CheckoutFormData,
  items: CartItem[],
  total: number
): string {
  const message = 
`🌿 *ORDER CONFIRMATION - GREEN LEAVES ORGANICS*
*Order ID:* ${orderId}
*Customer:* ${customer.fullName} (${customer.phone})
*Address:* ${customer.addressLine}, ${customer.city}, ${customer.state} - ${customer.pincode}
*Payment Method:* ${customer.paymentMethod.toUpperCase()}
*Total Amount Paid/Payable:* ₹${total}
*Items:* ${items.map(i => `${i.product.name} (${i.selectedPack.size} x${i.quantity})`).join(', ')}

Please notify me when my package is dispatched with tracking details!`;

  return buildWhatsAppUrl(message);
}
