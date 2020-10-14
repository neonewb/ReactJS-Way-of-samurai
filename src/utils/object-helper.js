export const updateObjectInArray = (items, itemID, objPropName, newObjProps) => {
  return items.users.map((user) => {
    if (user[objPropName] === itemID.userID) {
      return { ...user, ...newObjProps }
    }
    return user
  })
}
