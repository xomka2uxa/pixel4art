export function getColorIndexInRectList(rectList, color) {
  let index = null;
  for (let i = 0; i < rectList.length; i++) {
    if (rectList[i].color == color) {
      index = i;
    }
  }
  return index;
}

export function isRectHistoryUniqueFn(rectList, color, newRect) {
  let isRectUnique = true;
  for (let i = 0; i < rectList.length; i++) {
    if (rectList[i].color == color) {
      for (let j = 0; j < rectList[i].arr.length; j++) {
        if (JSON.stringify(rectList[i].arr[j]) == JSON.stringify(newRect)) {
          isRectUnique = false;
        }
      }
    }
  }
  return isRectUnique;
}

// export function isRectUniqueFn(rectList, color, newRect) {
//   let isRectUnique = true;
//   for (let i = 0; i < rectList.length; i++) {
//     if (rectList[i].color == color) {
//       for (let j = 0; j < rectList[i].arr.length; j++) {
//         for (let k = 0; k < rectList[i].arr[j].length; k++) {
//           if (JSON.stringify(rectList[i].arr[j][k]) == JSON.stringify(newRect)) {
//             isRectUnique = false;
//           }
//         }
//       }
//     }
//   }
//   return isRectUnique;
// }
