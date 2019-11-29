function getUserNameByPk(pk) {
	let allUsers = sessionStorage.getItem('allUser');
	allUsers = JSON.parse(allUsers);
	if (allUsers && allUsers[pk]) {
		return allUsers[pk];
	}
}

export { getUserNameByPk };
