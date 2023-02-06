export default async function getDegrees() {
  const response = await fetch(
    "https://resume.redberryinternship.ge/api/degrees"
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Uh-oh! Something went wrong");
}
