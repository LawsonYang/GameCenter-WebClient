import ajax from '../../utils/ajax';

function queryLoginUsers() {
	ajax({
		url: '/user/queryLoginUsers',
		params: {},
		success: (response) => {
			let data = response.data;
			this.setState({ loginUsers: data });
		}
	});
}

function queryAllGames() {
	ajax({
		url: '/gameserver/queryAllGames',
		params: {},
		success: (response) => {
			let data = response.data;
			this.setState({ gameList: data });
		}
	});
}

function logout() {
	ajax({
		url: '/user/logout',
		params: {},
		success: (response) => {
			this.props.history.push('/login');
		}
	});
}

function linkToUserInfo() {
	let userpk = sessionStorage.getItem('userpk');
	this.props.history.push('/register', { userpk });
}

export { queryLoginUsers, linkToUserInfo, logout, queryAllGames };
