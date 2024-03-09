export const formatVariableNames = (variableNames: any[]) => {
  // Iterar sobre cada nombre de variable en el array
  const formattedNames = variableNames.map(variableName => {
    // Dividir el nombre de la variable en palabras separadas por "_"
    const words = variableName.split('_');
    
    // Capitalizar la primera letra de cada palabra y unirlas con un espacio
    return words.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });
  return formattedNames;
}