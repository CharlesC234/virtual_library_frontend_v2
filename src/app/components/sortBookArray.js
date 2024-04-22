  "use server";

  //search
  function levenshteinDistance(a, b) {
    const matrix = Array.from(Array(b.length + 1), (_, i) => [i]);

    for (let i = 1; i <= a.length; i++) {
      matrix[0][i] = i;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // Deletion
          matrix[i][j - 1] + 1, // Insertion
          matrix[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    return matrix[b.length][a.length];
  }

 export default async function sortByLevenshteinDistance(arr, strvalue) {
    const containsSubstring = (str, substr) =>
      str.toUpperCase().includes(substr.toUpperCase());

    return arr.sort((a, b) => {
      console.log("a" + JSON.stringify(a));
      const containsA = containsSubstring(
        a.attributes.name.toUpperCase(),
        strvalue.toUpperCase()
      );
      const containsB = containsSubstring(
        b.attributes.name.toUpperCase(),
        strvalue.toUpperCase()
      );

      if (containsA && !containsB) return -1;
      if (!containsA && containsB) return 1;

      const distanceA = levenshteinDistance(
        a.attributes.name.toUpperCase(),
        strvalue.toUpperCase()
      );
      const distanceB = levenshteinDistance(
        b.attributes.name.toUpperCase(),
        strvalue.toUpperCase()
      );

      return distanceA - distanceB;
    });
  }