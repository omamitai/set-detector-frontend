
/**
 * Utility functions for SET game logic
 */

// SET card properties and values
export const SET_PROPERTIES = {
  Count: [1, 2, 3],
  Color: ['red', 'green', 'purple'],
  Fill: ['empty', 'striped', 'solid'],
  Shape: ['diamond', 'oval', 'squiggle']
};

/**
 * Check if three cards form a valid SET
 * A valid SET requires all properties to be either all the same or all different
 */
export function isValidSet(card1: any, card2: any, card3: any): boolean {
  // Check each property
  for (const prop of Object.keys(SET_PROPERTIES)) {
    const allSame = card1[prop] === card2[prop] && card2[prop] === card3[prop];
    const allDifferent = card1[prop] !== card2[prop] && 
                         card2[prop] !== card3[prop] && 
                         card1[prop] !== card3[prop];
    
    // If not all same or all different, this is not a valid SET
    if (!allSame && !allDifferent) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get a readable description of a SET card
 */
export function getCardDescription(card: any): string {
  return `${card.Count} ${card.Fill} ${card.Color} ${card.Shape}${card.Count > 1 ? 's' : ''}`;
}

/**
 * Determine what makes these three cards a valid SET
 */
export function explainSet(card1: any, card2: any, card3: any): string {
  if (!isValidSet(card1, card2, card3)) {
    return 'These cards do not form a valid SET';
  }
  
  const explanation: string[] = [];
  
  for (const prop of Object.keys(SET_PROPERTIES)) {
    if (card1[prop] === card2[prop] && card2[prop] === card3[prop]) {
      explanation.push(`All cards have the same ${prop.toLowerCase()}: ${card1[prop]}`);
    } else {
      explanation.push(`All cards have different ${prop.toLowerCase()}s`);
    }
  }
  
  return explanation.join('. ');
}
