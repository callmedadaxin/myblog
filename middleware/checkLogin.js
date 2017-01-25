module.exports = {
	//编辑等操作，需要登录
	checkLogin (req, res, next) {
		if(!req.session.user) {
			//用户未登录
			req.flash('error', '未登录');
			req.redirect('/login');
		}

		next();
	}
}