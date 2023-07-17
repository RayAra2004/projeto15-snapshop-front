export function orderByName(array) {
    if (array) {
      return array.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }else{
        return null;
    }
}