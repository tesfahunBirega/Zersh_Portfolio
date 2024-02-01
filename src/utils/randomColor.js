export const generateRandomHexColor = () => {
    // Generate a random number between 0 and 16777215 (hexadecimal FFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215);
    // Convert the random number to hexadecimal format and pad with zeros if necessary
    const hexColor = '#' + randomColor.toString(16).padStart(6, '0');
    return hexColor;
  };
  