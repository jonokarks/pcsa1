export async function sendBookingConfirmation(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  preferredDate: string;
  notes?: string;
  includeCprSign: boolean;
  total: number;
}) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send booking confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return { success: false };
  }
}
