const getAllPresentations = async (token) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        }
        );
        if (!response.ok) {
        throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        return data.map(capitalizeFirstLetter);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

const updatePresentationOnDrag = async (token,data) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/" + data.Id,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                startTime: data.StartTime,
                endTime: data.EndTime,
            }),
        }
        );
        if (!response.ok) {
        throw new Error("Failed to update event");
        }
    } catch (error) {
        console.error("Error updating event:", error);
    }
}
const deletePresentation = async (token,data,setRender) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/" + data[0].Id,
        {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        }
        );
        console.log(await response.json());
        if (!response.ok) {
        throw new Error("Failed to delete event");
        }
        setRender(perv => !perv);
    } catch (error) {
        console.error("Error deleting event:", error);
    }
}

const createPresentation = async (token,data,setRender) => {
    console.log(data);
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                startTime: data[0].StartTime,
                endTime: data[0].EndTime,
                roomNumber: data[0].Location,
                teamId: parseInt(data[0].TeamId),
                juryMemberIds: data[0].JuryMemberIds.split(",").map((id) => parseInt(id)),
            }),
        }
        );
        console.log(await response.json());
        if (!response.ok) {
        throw new Error("Failed to create event");
        }
        setRender(perv => !perv);
    } catch (error) {
        console.error("Error creating event:", error);
    }
}

const getPresentationsPlan = async (token) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/plan",
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        }
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
        throw new Error("Failed to fetch valid presentation");
        }
        return data;
    } catch (error) {
        console.error("Error fetching valid presentation:", error);
    }
}
const updatePresentation = async (token,data,setRender) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/" + data[0].Id,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                startTime: data[0].StartTime,
                endTime: data[0].EndTime,
                roomNumber: data[0].Location,
                teamId: parseInt(data[0].TeamId),
                juryMemberIds: data[0].JuryMemberIds.split(",").map((id) => parseInt(id)),
            }),
        }
        );
        if (!response.ok) {
        throw new Error("Failed to update event");
        }
        setRender(perv => !perv);
    } catch (error) {
        console.error("Error updating event:", error);
    }
}

const validatePresentationsPlan = async (token) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/plan/validate",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        }
        );
        if (!response.ok) {
        throw new Error("Failed to validate presentations");
        }
    } catch (error) {
        console.error("Error validating presentations:", error);
    }
}

const addPresentationsPlan = async (token,setRender,initialRender) => {
    try {
        const response = await fetch(
        "http://localhost:8080/api/presentations/plan",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            },
        }
        );
        if (!response.ok) {
        throw new Error("Failed to add presentations plan");
        }
        initialRender.current = true;
        setRender(perv => !perv);
    } catch (error) {
        console.error("Error adding presentations plan:", error);
    }
}

  const capitalizeFirstLetter = (event) => {
    const capitalizedEvent = {};
    for (const key in event) {
      if (Object.hasOwnProperty.call(event, key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        capitalizedEvent[capitalizedKey] = event[key];
      }
    }
    return capitalizedEvent;
  };

export const generatePresentations = async (startDate, roomNumber, token) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (roomNumber) params.append('roomNumber', roomNumber);

  try {
    const response = await fetch(
      `http://localhost:8080/api/presentations/generate-presentations?${params}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    const responseText = await response.text(); // D'abord lire comme texte
    
    if (!response.ok) {
      // Essayer de parser comme JSON, sinon utiliser le texte brut
      let errorMessage = responseText;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || responseText;
      } catch (e) {
        console.warn("La réponse d'erreur n'est pas du JSON valide");
      }
      throw new Error(errorMessage);
    }

    // Parser la réponse en JSON seulement si ce n'est pas vide
    return responseText ? JSON.parse(responseText) : null;
    
  } catch (err) {
    console.error("Erreur lors de l'appel API:", err);
    throw new Error(`Erreur réseau: ${err.message}`);
  }
};


export { getAllPresentations, deletePresentation, updatePresentation ,updatePresentationOnDrag, createPresentation , getPresentationsPlan, validatePresentationsPlan,addPresentationsPlan};