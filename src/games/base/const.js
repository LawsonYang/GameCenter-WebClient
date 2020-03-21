//用户操作
const ORDER = {
	CREATE: 'create ',
	JOIN: 'join ',
	ORDER: 'order',
	PREPARE: 'prepare'
};
//服务器返回的
const RETURNORDER = {
	//创建游戏成功
	CREATEGAMESUCCESS: 'CGS',
	//创建游戏失败
	CREATEGAMEFAILD: 'CGF',
	//加入游戏成功
	JOINGAMESUCCESS: 'JGS',
	//加入游戏失败
	JOINGAMEFAILD: 'JGF',
	//显示用户牌
	SHOWCARDS: 'SC',
	//显示用户的操作按钮
	SHOWUSEROPRS: 'SUO',
	//显示其他用户信息
	SHOWOTHERSINFO: 'SOI',
	//游戏结束
	GAMEOVER: 'GV'
};
//消息分隔符
const SPLITCHAR = {
	orderSplit: '/',
	paramSplit: '#',
	cardSplit: '.',
	playerNameSplit: '*',
	palyerCardSplit: '&'
};

export { ORDER, RETURNORDER, SPLITCHAR };
