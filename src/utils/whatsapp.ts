import { CartItem, Product, PackSize, MaaliBookingFormData, CheckoutFormData } from '../types';

export const PRIMARY_WHATSAPP_NUMBER = '918826078720';
export const SECONDARY_WHATSAPP_NUMBER = '918556889924';
export const PRIMARY_DISPLAY_PHONE = '+91 8826078720';
export const SECONDARY_DISPLAY_PHONE = '+91 8556889924';

function buildWhatsAppUrl(message: string, number: string = PRIMARY_WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getWhatsAppInquiryUrl(customPrompt?: string): string {
  const text = customPrompt || 
`🪔 *Hello Green Leaves Organics!*
I would like to inquire about your Diwali Green Gifting Hampers, 6-in-1 organic vermicompost, and home gardening Maali services. Could you please assist me?`;
  return buildWhatsAppUrl(text);
}

export function getWhatsAppFlagshipOrderUrl(pack: PackSize, qty: number = 1, promoCode?: string): string {
  const total = pack.price * qty;
  const message = 
`🪔 *DIWALI SPECIAL ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
*Product:* 6-in-1 Enriched Vermicompost Mix (Signature 2kg Pouch)
*Pack Size:* ${pack.size}
*Quantity:* ${qty} unit(s)
*Offer Price:* ₹${pack.price} × ${qty} = *₹${total}*
${promoCode ? `*Diwali Promo:* ${promoCode} Applied\n` : ''}*Festive Perks Included:*
✓ FREE Auspicious Handcrafted Diya 🪔
✓ FREE Living Plant Included 🪴
✓ FREE 30-Min Maali Phone Consultation 👨‍🌾
✓ FREE Express Doorstep Delivery 🚚

*Delivery Details:*
Name: 
Delivery Address: 
City & Pincode: 

Please confirm this Diwali order and dispatch with festive gift packaging!`;

  return buildWhatsAppUrl(message);
}

export function getWhatsAppProductOrderUrl(product: Product, pack: PackSize, qty: number = 1): string {
  const total = pack.price * qty;
  const message = 
`🪔 *FESTIVE ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
*Item:* ${product.name}
*Option:* ${pack.size}
*Quantity:* ${qty}
*Total Amount:* ₹${total} (MRP: ₹${pack.mrp * qty})
*Festive Gift:* Free Handcrafted Earthen Diya 🪔

*Customer Delivery Info:*
Name: 
Phone: 
Address: 
Pincode: 

Please share delivery estimate & payment confirmation link!`;

  return buildWhatsAppUrl(message);
}

export function getWhatsAppCartCheckoutUrl(
  items: CartItem[], 
  subtotal: number, 
  shipping: number, 
  promoDiscount: number = 0,
  promoCode?: string | null,
  notes?: string
): string {
  const total = Math.max(0, subtotal - promoDiscount) + shipping;
  const hasFlagship = items.some(item => item.product.isFlagship);
  const hasDiwali = items.some(item => item.product.category === 'diwali' || item.product.isDiwaliSpecial);
  
  let itemsList = '';
  items.forEach((item, index) => {
    const itemTotal = item.selectedPack.price * item.quantity;
    itemsList += `${index + 1}. *${item.product.name}*\n   Size: ${item.selectedPack.size} | Qty: ${item.quantity} | ₹${itemTotal}\n`;
  });

  const perksSection = 
`\n🪔 *Diwali Festive Perks Unlocked:*
✓ FREE Artisanal Terracotta Diya 🪔
✓ FREE Plant Included with Order 🪴
✓ FREE Agronomist Plant Doctor Advice 👨‍🌾
✓ Safe Eco-Friendly Festive Packaging\n`;

  const promoSection = promoDiscount > 0
    ? `*Diwali Promo (${promoCode || 'DIWALIGREEN'}):* -₹${promoDiscount}\n`
    : '';

  const message = 
`🛒 *NEW DIWALI CART ORDER - GREEN LEAVES ORGANICS*
----------------------------------------
${itemsList}----------------------------------------
*Items Subtotal:* ₹${subtotal}
${promoSection}*Shipping Fee:* ${shipping === 0 ? 'FREE (Special Diwali Offer)' : `₹${shipping}`}
*GRAND TOTAL:* *₹${total}*
${perksSection}
${notes ? `*Customer Notes:* ${notes}\n` : ''}
*Delivery Address:*
Full Name: 
Mobile Number: 
Complete Address: 
Landmark: 
City, State & Pincode: 

Please confirm my Diwali order and share UPI payment QR / COD status!`;

  return buildWhatsAppUrl(message);
}

export function getWhatsAppMaaliBookingUrl(data: MaaliBookingFormData, serviceTitle: string): string {
  const message = 
`👨‍🌾 *MAALI SERVICE APPOINTMENT REQUEST - DIWALI EDITION*
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
Please assign an expert Maali from Green Leaves Organics for our pre-Diwali garden makeover!`;

  return buildWhatsAppUrl(message);
}

export function getWhatsAppOrderReceiptUrl(
  orderId: string,
  customer: CheckoutFormData,
  items: CartItem[],
  total: number
): string {
  const message = 
`🪔 *ORDER CONFIRMATION - GREEN LEAVES ORGANICS*
*Order ID:* ${orderId}
*Customer:* ${customer.fullName} (${customer.phone})
*Address:* ${customer.addressLine}, ${customer.city}, ${customer.state} - ${customer.pincode}
*Payment Method:* ${customer.paymentMethod.toUpperCase()}
*Total Amount Paid/Payable:* ₹${total}
*Items:* ${items.map(i => `${i.product.name} (${i.selectedPack.size} x${i.quantity})`).join(', ')}

Please notify me when my Diwali package is dispatched with live tracking!`;

  return buildWhatsAppUrl(message);
}
