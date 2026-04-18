export async function fetchCountries() {
  const response = await fetch('http://localhost:3000/api/countries');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
