export function formatPhoneNumber(phone: string | undefined) {
  if (!phone) return "-"; // Ensure the phone number is exactly 10 digits long
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    return phone;
  }

  // Format the phone number
  let formattedPhone = `(${phone.substring(0, 3)}) ${phone.substring(
    3,
    6
  )}-${phone.substring(6)}`;

  return formattedPhone;
}
