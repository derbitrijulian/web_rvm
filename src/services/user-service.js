export async function fetchUser() {

  try {
    
    const response = await fetch('/api/users');
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || "Error fetching user profile")
    }

    return data
  } catch (error) {
      throw error
  }
  
}
