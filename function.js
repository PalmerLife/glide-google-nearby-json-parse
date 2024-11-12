window.function = function(inputString) {
  // Attempt to parse the JSON string
  let inputObject;
  try {
    inputObject = JSON.parse(inputString.value);
  } catch (e) {
    // Return an explicit error message if JSON parsing fails
    return JSON.stringify([{ error: "Invalid JSON format" }]);
  }

  // Check if 'results' exists and is an array
  if (!inputObject.results || !Array.isArray(inputObject.results)) {
    // Return an empty array if 'results' is missing or not an array
    return JSON.stringify([]);
  }

  // Process each entry in 'results' and format as required
  let outputArray = inputObject.results.map((result, index) => {
    let name = result.name || "Name missing";
    // Check for 'formatted_address' or fall back to 'vicinity' if missing
    let address = result.formatted_address || result.vicinity || "Address missing";
    return {
      objectIndex: index,
      candidate: `${name}, ${address}`
    };
  });

  // Return the result as a JSON string
  return JSON.stringify(outputArray);
};